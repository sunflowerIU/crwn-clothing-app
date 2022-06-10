// import {  useContext } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";


export const CategoriesPreview = () => {

  const categories = useSelector((state) => state.categories.categories);
  console.log(categories)
  return (
    <div className="shop-container">
      {categories.map((product) => {
        const products = product.items;
        return (
          <CategoryPreview key={product.title} title={product.title} products={products} />
        );
      })}
    </div>
  );
};
