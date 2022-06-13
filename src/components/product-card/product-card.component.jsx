import {
  ProductCardContainer,
  Footer,
  ProductName,
  ProductPrice,
} from "./product-card.styles";
// import { DropdownContext } from "../../contexts/cart.context";
// import { useContext } from "react";
import Button from "../button/button.component";
import {addItemsTocart} from '../../store/cart/cart.reducer'
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { imageUrl, price, name, id } = product;
  // const { addItemsTocart } = useContext(DropdownContext);

  const addToCartHandler = () => {
    dispatch(addItemsTocart(product));
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
