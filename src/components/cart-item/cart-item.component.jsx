import {
  CartItemContainer,
  CartItemImage,
  ItemDetails,
  ItemName,
  ItemPrice,
} from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;
  return (
    <CartItemContainer>
      <CartItemImage imageUrl={imageUrl} alt={name} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <ItemPrice>
          {quantity} x ${price}
        </ItemPrice>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
