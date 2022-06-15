import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { Spinner } from "../../components/spinner/spinner.component";
import { selectIsLoading } from "../../store/categories/category.selector";


export const CategoriesPreview = () => {

  const categories = useSelector((state) => state.categories.categories);
  // console.log(categories)
  const isLoading = useSelector(selectIsLoading)
  return (
    <div className="shop-container">

      {isLoading?<Spinner/>: categories.map((product) => {
        const products = product.items;
        return (
          <CategoryPreview key={product.title} title={product.title} products={products} />
        );
      })}
    </div>
  );
};
