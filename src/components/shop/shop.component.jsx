import { Routes, Route } from "react-router-dom";
import { CategoriesPreview } from "../../routes/categories-preview/categories-preview.component";
import Category from "../../routes/category/category.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../store/categories/categories.reducer";

export const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    ///dispatch the fetchCategoryAsync, and dispatch will be passed into this function, and mini function inside this function can also use dispatch
    dispatch(fetchCategoriesStart());
  },[dispatch]);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path="/:category" element={<Category />}></Route>
    </Routes>
  );
};
