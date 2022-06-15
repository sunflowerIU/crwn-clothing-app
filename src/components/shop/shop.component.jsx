import { Routes, Route } from "react-router-dom";
import { CategoriesPreview } from "../../routes/categories-preview/categories-preview.component";
import Category from "../../routes/category/category.component";
import { fetchCategoryAsync } from "../../store/categories/category.action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    ///dispatch the fetchCategoryAsync, and dispatch will be passed into this function, and mini function inside this function can also use dispatch
    dispatch(fetchCategoryAsync);
  });
  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path="/:category" element={<Category />}></Route>
    </Routes>
  );
};
