import "./product-card.styles.scss";
import Button from "../button/button.component";
import { DropdownContext } from "../../contexts/cart.context";
import { useContext } from "react";

const ProductCard = ({ product }) => {
  const { imageUrl, price, name, id } = product;
  const { addItemsTocart } = useContext(DropdownContext);

  const addToCartHandler = () => {
    addItemsTocart(product);
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button buttonType="inverted" onClick={addToCartHandler}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
