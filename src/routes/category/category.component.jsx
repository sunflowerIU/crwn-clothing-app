import { CategoryTitle, CategoryContainer } from "./category.styles.jsx";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import {
  selectCategoriesMap,
  selectIsLoading,
} from "../../store/categories/category.selector.js";
import { Spinner } from "../../components/spinner/spinner.component.jsx";

const Category = () => {
  // console.log("category component rendering");
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  // const { categoriesMap } = useContext(CategoriesContext);

  //useSelector is passed because reselect requires state, and useSelector give access to state
  const categories = useSelector(selectCategoriesMap);

  //to know if the fetching is done or not
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    // console.log("use effect triggered");
    setProducts(categories[category]);
  }, [categories, category]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? ( //if loading is true then render spinner
        <Spinner />
      ) : (
        //if loading is not true then render category component
        <CategoryContainer>
          {products &&
            products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;

//very important topic is, when our code runs one by one, it tries to run asynchronously because when we fetch
// categoriesMap from out context, it is fetched asynchronously and then the setProducts will be set undefined.
// so to avoid that we need to use safety operator using &&
