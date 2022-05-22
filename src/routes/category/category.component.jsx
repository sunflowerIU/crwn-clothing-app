import { CategoryTitle, CategoryContainer } from "./category.styles.jsx";
import { useParams } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { categoriesMap } = useContext(CategoriesContext);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);
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
