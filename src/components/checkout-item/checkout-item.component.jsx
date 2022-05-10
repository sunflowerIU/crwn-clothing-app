import { useContext } from "react";
import { DropdownContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

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
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div onClick={decreaseItem} className="arrow">
          &#x022B2;
        </div>
        <span className="value">{quantity}</span>
        <div onClick={increaseItem} className="arrow">
          &#x022B3;
        </div>
      </span>
      <span className="price">price: ${price}</span>
      <div onClick={removeThisItem} className="remove-button">
        &#10007;
      </div>
      {/* <h3>{name}</h3>
      <button onClick={decreaseItem}>decrease</button>
      <span>quantity: {quantity}</span>
      <button onClick={increaseItem}>increase</button>
      <span>price: ${price}</span>
      <button onClick={removeThisItem}>Remove</button> */}
    </div>
  );
};

export default CheckoutItem;
