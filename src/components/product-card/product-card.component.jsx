import {
  ProductCardContainer,
  Footer,
  ProductName,
  ProductPrice,
} from "./product-card.styles";
import { DropdownContext } from "../../contexts/cart.context";
import { useContext } from "react";
import Button from "../button/button.component";

const ProductCard = ({ product }) => {
  const { imageUrl, price, name, id } = product;
  const { addItemsTocart } = useContext(DropdownContext);

  const addToCartHandler = () => {
    addItemsTocart(product);
  };

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <ProductName>{name}</ProductName>
        <ProductPrice>${price}</ProductPrice>
      </Footer>
      <Button buttonType="inverted" onClick={addToCartHandler}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
