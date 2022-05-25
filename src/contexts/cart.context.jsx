import { createContext, useEffect, useReducer } from "react";

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

//creating context for cart dropdown and also for cart items
const initialState = {
  dropdownActive: false,
  cartItems: [],
  totalItemsInCart: 0,
  totalAmount: 0,
};

//creating a context for that dropdown
export const DropdownContext = createContext({
  dropdownActive: false,
  setDropdownState: () => {},
  cartItems: [],
  addItemsTocart: () => {},
  totalItemsInCart: 0,
  decreaseItemByOne: () => {},
  removeItemFromCart: () => {},
  totalAmount: 0,
});

//this is necessary because we always dont remember the cases of cart
const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_DROPDOWN_STATE: "SET_DROPDOWN_STATE",
  SET_TOTAL_ITEMS_IN_CART: "SET_TOTAL_ITEMS_IN_CART",
  SET_TOTAL_AMOUNT: "SET_TOTAL_AMOUNT",
};

//making a cart reducer
const CartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CART_ITEMS":
      return { ...state, cartItems: payload };
    case "SET_DROPDOWN_STATE":
      return { ...state, dropdownActive: !state.dropdownActive };
    case "SET_TOTAL_ITEMS_IN_CART":
      return {
        ...state,
        totalItemsInCart: payload,
      };
    case "SET_TOTAL_AMOUNT":
      return {
        ...state,
        totalAmount: payload,
      };

    default:
      throw new Error(`unhandled type ${type} in userReducer`);
  }
};

export const DropdownContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  //to set cart items
  const setCartItems = (items) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: items });
  };

  //to set total items in cart
  const setTotalItemsInCart = (total) => {
    dispatch({
      type: CART_ACTION_TYPES.SET_TOTAL_ITEMS_IN_CART,
      payload: total,
    });
  };

  //to set total amount in cart
  const setTotalAmount = (total) => {
    dispatch({ type: CART_ACTION_TYPES.SET_TOTAL_AMOUNT, payload: total });
  };

  //to set dropdown state
  const setDropdownState = () => {
    dispatch({ type: CART_ACTION_TYPES.SET_DROPDOWN_STATE });
  };

  //function to add items to cart
  const addItemsTocart = (productToAdd) => {
    setCartItems(addCartItem(state.cartItems, productToAdd));
  };

  //creating function to remove the item from cart during checkout
  const removeItemFromCart = (itemToBeRemoved) => {
    const filteredCartItem = state.cartItems.filter((item) => {
      return item.id !== itemToBeRemoved.id;
    });
    setCartItems(filteredCartItem);
  };

  //decreasing the quantity of item by 1
  const decreaseItemByOne = (currentItem) => {
    // if quantity of the current item is 1 then remove the item from cartItems, because we cannot have quantity less than 1
    if (currentItem.quantity === 1) {
      const filteredCartItems = state.cartItems.filter(
        (item) => item.id !== currentItem.id
      );
      return setCartItems(filteredCartItems);
    }

    //if quantity is not less than 1 then simply decrease quantity by one
    const updatedCartItems = state.cartItems.map((item) => {
      return item.id === currentItem.id
        ? { ...item, quantity: item.quantity - 1 }
        : item;
    });
    return setCartItems(updatedCartItems);
  };

  //function to calculate total items in cart
  useEffect(() => {
    const totalItems = state.cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setTotalItemsInCart(totalItems);
  }, [state.cartItems]);

  //function to calculate total amount
  useEffect(() => {
    const checkoutItems = state.cartItems.map((item) => {
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
    setTotalAmount(grandTotal);
  }, [state.cartItems]);

  //destructuring all the variables from our state
  const { dropdownActive, cartItems, totalItemsInCart, totalAmount } = state;
  const value = {
    dropdownActive,
    setDropdownState,
    addItemsTocart,
    cartItems,
    totalItemsInCart,
    removeItemFromCart,
    decreaseItemByOne,
    totalAmount,
  };
  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
};