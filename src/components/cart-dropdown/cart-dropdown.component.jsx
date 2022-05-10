import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { DropdownContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";  //this is a hook that helps to navigate to certain route

export const CartDropdown = () => {
  const { cartItems } = useContext(DropdownContext);
  const navigate = useNavigate()
  const goToCheckoutHandler=()=>{
  navigate('/checkout')
  }
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems && cartItems.map((item) => {
          return <CartItem key={item.id} cartItem={item} />;
        })}
      </div>
      <Button onClick={goToCheckoutHandler}>checkout</Button>
      
    </div>
  );
};
