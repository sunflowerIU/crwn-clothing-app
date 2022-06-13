import {
  ShoppingIcon,
  CartIconContainer,
  ItemsCount,
} from "./cart-icon.styles.jsx";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDropdownState } from "../../store/cart/cart.reducer.js";
export const CartIcon = () => {
  const dispatch = useDispatch();
  const cartItemsCount = useSelector((state) => state.cart.totalItemsInCart);

  const dropdownHandler = () => {
    //if the dropdownActive is true then set it to false and set it to true if it is false
    dispatch(setDropdownState());
  };
  return (
    <CartIconContainer onClick={dropdownHandler}>
      <ShoppingIcon />
      <ItemsCount>{cartItemsCount}</ItemsCount>
    </CartIconContainer>
  );
};
