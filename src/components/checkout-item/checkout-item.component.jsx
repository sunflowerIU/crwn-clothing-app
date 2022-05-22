import { useContext } from "react";
import { DropdownContext } from "../../contexts/cart.context";
import {
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  Arrow,
  Name,
  Price,
  QuantityValue,
  RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const { removeItemFromCart, addItemsTocart, decreaseItemByOne } =
    useContext(DropdownContext);

  //1. remove the item from cart
  const removeThisItem = () => {
    return removeItemFromCart(cartItem);
  };

  //2. increase item by 1
  const increaseItem = () => {
    return addItemsTocart(cartItem);
  };

  //3. decrease item by 1
  const decreaseItem = () => {
    return decreaseItemByOne(cartItem);
  };
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <Name className="name">{name}</Name>
      <Quantity>
        <Arrow onClick={decreaseItem}>&#x022B2;</Arrow>
        <QuantityValue>{quantity}</QuantityValue>
        <Arrow onClick={increaseItem}>&#x022B3;</Arrow>
      </Quantity>
      <Price>price: ${price}</Price>
      <RemoveButton onClick={removeThisItem}>&#10007;</RemoveButton>
      {/* <h3>{name}</h3>
      <button onClick={decreaseItem}>decrease</button>
      <span>quantity: {quantity}</span>
      <button onClick={increaseItem}>increase</button>
      <span>price: ${price}</span>
      <button onClick={removeThisItem}>Remove</button> */}
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
