import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  SignOutUser
} from "../utils/firebase/firebase.utils";

// context is something like storage where we can store some value and use that value anywhere in app
// this is userContext where we will keep the info of current user
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//every context consists of provider that will help to provide the context values to children which are
//embedded inside that provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = {
    currentUser,
    setCurrentUser,
  };

  //first always signout the current user if there is any before setting currentuser again
  // because due to getAuth it tracks the authentication that has before, and it keeps always record of previous auithentication
  SignOutUser() 

  //onAuthStateChangedListener will listen all the auth like signin and signout, and it gives a value called unsubscribe which willstop listening auth
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        //if there is user when new signup then save that user into database
        await createUserDocumentFromAuth(user);
      }

      //if user is not available like after signout then set currentuser to null
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
