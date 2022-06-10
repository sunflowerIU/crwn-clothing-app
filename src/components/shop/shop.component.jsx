import { Routes, Route } from "react-router-dom";
import { CategoriesPreview } from "../../routes/categories-preview/categories-preview.component";
import Category from "../../routes/category/category.component";
import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/categories.reducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //for getting categories map into the store
    const getCategories = async () => {
      const categories = await getCategoriesAndDocument();
      //dispatching for categories items to be obtained into the state of it reducer
      return dispatch(setCategories(categories));
    };
    getCategories();
  });
  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path="/:category" element={<Category />}></Route>
    </Routes>
  );
};
