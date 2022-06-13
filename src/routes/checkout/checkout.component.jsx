// import { useContext } from "react";
// import { DropdownContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setTotalAmount } from "../../store/cart/cart.reducer";
import { useDispatch } from "react-redux";

const Checkout = () => {
  const dispatch = useDispatch();
  // const { cartItems, totalAmount } = useContext(DropdownContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  
  //function to calculate total amount
  useEffect(() => {
    const checkoutItems = cartItems.map((item) => {
      return { quantity: item.quantity, price: item.price };
    });
    const totalArray = checkoutItems.map((item) => {
      let sum = 0;
      sum = sum + item.price * item.quantity;
      return sum;
    });
    const grandTotal = totalArray.reduce((x, y) => x + y, 0);
    // console.log(checkoutItems)
    // console.log(grandTotal);
    dispatch(setTotalAmount(grandTotal));
  }, [cartItems, dispatch]);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <Total>Total: ${totalAmount}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
