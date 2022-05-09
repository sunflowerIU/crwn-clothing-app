import { createContext, useState } from "react";

export const DropdownContext = createContext({
  dropdownActive: false,
  setDropdownState:()=>null
});

export const DropdownContextProvider = ({ children }) => {
  const [dropdownActive, setDropdownState] = useState(false);
  const value = {
    dropdownActive,
    setDropdownState,
  };
  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
};
