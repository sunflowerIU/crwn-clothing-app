import { CategoryTitle, CategoryContainer } from "./category.styles.jsx";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector.js";

const Category = () => {
  console.log("category component rendering");
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  // const { categoriesMap } = useContext(CategoriesContext);
  console.log("useSelector for categoriesMap");
  const categories = useSelector(selectCategoriesMap);
  useEffect(() => {
    console.log("use effect triggered");
    setProducts(categories[category]);
  }, [categories, category]);
  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;

//very important topic is, when our code runs one by one, it tries to run asynchronously because when we fetch
// categoriesMap from out context, it is fetched asynchronously and then the setProducts will be set undefined.
// so to avoid that we need to use safety operator using &&
