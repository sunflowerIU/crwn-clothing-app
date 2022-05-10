import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../product-card/product-card.component";
import './shop.styles.scss'

export const Shop = () => {
  const { products } = useContext(ProductsContext);
  // console.log(products);
  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};
