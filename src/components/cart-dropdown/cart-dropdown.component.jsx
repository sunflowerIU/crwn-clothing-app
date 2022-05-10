import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { DropdownContext } from "../../contexts/cart.context";

export const CartDropdown = () => {
  const { cartItems } = useContext(DropdownContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems && cartItems.map((item) => {
          return <CartItem key={item.id} cartItem={item} />;
        })}
      </div>
      <Button>checkout</Button>
    </div>
  );
};
