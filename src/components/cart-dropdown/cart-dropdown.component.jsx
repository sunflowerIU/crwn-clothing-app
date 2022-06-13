import {
  CartDropDownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
// import { useContext } from "react";
// import { DropdownContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom"; //this is a hook that helps to navigate to certain route
import { useSelector } from "react-redux";


export const CartDropdown = () => {
  // const { cartItems } = useContext(DropdownContext);
  const cartItems = useSelector(state=>state.cart.cartItems)
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <CartDropDownContainer >
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => {
            return <CartItem key={item.id} cartItem={item} />;
          })
        ) : (
          <EmptyMessage>No items yet!</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>checkout</Button>
    </CartDropDownContainer>
  );
};
