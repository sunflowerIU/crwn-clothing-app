import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from "../shop-data.js";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import { getCategoriesAndDocument } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setcategoriesMap] = useState({});

  ///--- this code is for uploading document into firestore
  // useEffect( () => {
  //    addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  const value = {
    categoriesMap,
    setcategoriesMap,
  };

  useEffect(()=>{
    const getCategoryMap = async()=>{
      const categoryMap = await getCategoriesAndDocument()
      setcategoriesMap(categoryMap)
    }
    getCategoryMap()
  },[])

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
