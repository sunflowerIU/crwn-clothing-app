import { createContext, useState } from "react";

// context is something like storage where we can store some value and use that value anywhere in app
// this is userContext where we will keep the info of current user
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//every context consists of provider that will help to provide the context values to children which are
//embedded inside that provider
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = {
        currentUser,
        setCurrentUser
    }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
