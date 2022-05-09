import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { DropdownContext } from "../../contexts/dropdown.context";

export const CartIcon = () => {
  const { dropdownActive, setDropdownState } = useContext(DropdownContext);
  const dropdownHandler = () => { //if the dropdownActive is true then set it to false and set it to true if it is false
    setDropdownState(!dropdownActive);
  };
  return (
    <div className="cart-icon-container" onClick={dropdownHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};
