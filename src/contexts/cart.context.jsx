import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // console.log(cartItems)

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
export const DropdownContext = createContext({
  dropdownActive: false,
  setDropdownState: () => {},
  cartItems: [],
  addItemsTocart: () => {},
  totalItemsInCart: 0,
});

export const DropdownContextProvider = ({ children }) => {
  const [dropdownActive, setDropdownState] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItemsInCart, increaseTotalItemsInCart] = useState(0)

  //function to add items to cart
  const addItemsTocart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
    increaseTotalItemsInCart(totalItemsInCart+1)
  };

  const value = {
    dropdownActive,
    setDropdownState,
    addItemsTocart,
    cartItems,
    totalItemsInCart
  };
  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
};
