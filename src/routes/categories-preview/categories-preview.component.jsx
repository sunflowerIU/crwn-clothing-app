// import {  useContext } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setCategoriesMap } from "../../store/categories/categories.reducer";
import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";

export const CategoriesPreview = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocument();
      //dispatching for categories items to be obtained into the state of it reducer
      return dispatch(setCategoriesMap(categoriesMap));
    };
    getCategoriesMap();
  }, []);

  const categoriesMap = useSelector((state) => state.categories.categoriesMap);
  return (
    <div className="shop-container">
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </div>
  );
};
