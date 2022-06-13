
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
import { decrease_Item_By_One_action } from "../../store/cart/cart.action";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../store/cart/cart.reducer";
import { addItemsTocart } from "../../store/cart/cart.reducer";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch()
  const { name, imageUrl, quantity, price } = cartItem;

  //1. remove the item from cart
  const removeThisItem = () => {
    return dispatch(removeItemFromCart(cartItem));
  };

  //2. increase item by 1
  const increaseItem = () => {
    return dispatch(addItemsTocart(cartItem));
  };

  //3. decrease item by 1
  const decreaseItem = () => {
    // return dispatch(decreaseItemByOne(cartItem));
    return decrease_Item_By_One_action(cartItem)

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
