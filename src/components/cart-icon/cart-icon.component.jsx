import {
  ShoppingIcon,
  CartIconContainer,
  ItemsCount,
} from "./cart-icon.styles.jsx";
import { useContext } from "react";
import { DropdownContext } from "../../contexts/cart.context";

export const CartIcon = () => {
  const { dropdownActive, setDropdownState, totalItemsInCart } =
    useContext(DropdownContext);
  const dropdownHandler = () => {
    //if the dropdownActive is true then set it to false and set it to true if it is false
    setDropdownState(!dropdownActive);
  };
  return (
    <CartIconContainer  onClick={dropdownHandler}>
      <ShoppingIcon/>
      <ItemsCount>{totalItemsInCart}</ItemsCount>
    </CartIconContainer>
  );
};
