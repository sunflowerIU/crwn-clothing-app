import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  dropdownActive: false,
  cartItems: [],
  totalItemsInCart: 0,
  totalAmount: 0,
};

const addCartItem = (cartItems, productToAdd) => {
  //1. find if cartItems already has that product or not
  const findExistingCart = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  //2. if cartItems contains that product that just increment it by 1
  if (findExistingCart) {
    return cartItems.map((item) => {
      //loop through each item and change the quantity of that item whose id is same as productToAdd
      return item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item; //
    });
  }

  //3. then after that return a new cartItems array that contains modified cart with new cartItem number or with new cart item
  // when there is new cart item, we want to return all existing cart with new cart item also
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //to set cart items
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    //to set total items in cart
    setTotalItemsInCart: (state, action) => {
      state.totalItemsInCart = action.payload;
    },
    setDropdownState: (state, action) => {
      state.dropdownActive = !state.dropdownActive;
    },
    //to set total amount in cart
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    //function to add items to cart
    addItemsTocart: (state, action) => {
      const items = addCartItem(state.cartItems, action.payload);
      state.cartItems = items;
    },
    //creating function to remove the item from cart during checkout
    removeItemFromCart: (state, action) => {
      const filteredCartItem = state.cartItems.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.cartItems = filteredCartItem;
    },
    //decreasing the quantity of item by 1
    decreaseItem: (state, action) => {
       state.cartItems = action.payload
     
    },
  },
});

export default cartSlice.reducer;
export const {
  setDropdownState,
  setCartItems,
  setTotalItemsInCart,
  setTotalAmount,
  addItemsTocart,
  removeItemFromCart,
  decreaseItem,
} = cartSlice.actions;
