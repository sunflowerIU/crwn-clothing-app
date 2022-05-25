import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// context is something like storage where we can store some value and use that value anywhere in app
// this is userContext where we will keep the info of current user
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//user action types
const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

//creating a useReducer
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CURRENT_USER":
      return {
        currentUser: payload,
      };

    default:
      throw new Error(`unhandled type ${type} in userReducer`);
  }
};

//define a initial state for user
const initialState = {
  currentUser: null,
};

//every context consists of provider that will help to provide the context values to children which are
//embedded inside that provider
//this code will run at first
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  //from state destructuring the currentUser
  const { currentUser } = state;
  // console.log(currentUser);

  //make a setCurrentUser function to dispatch to set current user
  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };
  const value = {
    currentUser,
    setCurrentUser,
  };

  //onAuthStateChangedListener will listen all the auth like signin and signout, and it gives a value called unsubscribe which willstop listening auth
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        //if there is user when new signup then save that user into database
        await createUserDocumentFromAuth(user);
      }

      //if user is not available like after signout then set currentuser to null, if existing user is available then set current user to that user
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
