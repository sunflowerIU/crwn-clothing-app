import { store } from "../store";
import { decreaseItem } from "./cart.reducer";



export const decrease_Item_By_One_action = (currentItem) => {
  const { cartItems } = store.getState().cart;
  // console.log(cartItems);
  // console.log(currentItem);
  // if quantity of the current item is 1 then remove the item from cartItems, because we cannot have quantity less than 1
  // const currentItem = action.payload;
  let finalCartItems;
  if (currentItem.quantity === 1) {
    const filteredCartItems = cartItems.filter(
      (item) => item.id !== currentItem.id
    );
    // console.log("filtered cart items", filteredCartItems);
    finalCartItems = filteredCartItems;
  }

  //if quantity is not less than 1 then simply decrease quantity by one
  if (currentItem.quantity !== 1) {
    const updatedCartItems = cartItems.map((item) => {
      return item.id === currentItem.id
        ? { ...item, quantity: item.quantity - 1 }
        : item;
    });
    // console.log("updated cart items", updatedCartItems);
    finalCartItems = updatedCartItems;
  }

  store.dispatch(decreaseItem(finalCartItems));
};
