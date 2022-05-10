import { createContext, useState, useEffect } from "react";

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
  decreaseItemByOne: () => {},
  removeItemFromCart: () => {},
  totalAmount: 0,
});

export const DropdownContextProvider = ({ children }) => {
  const [dropdownActive, setDropdownState] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItemsInCart, setTotalItemsInCart] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  //function to add items to cart
  const addItemsTocart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  //creating function to remove the item from cart during checkout
  const removeItemFromCart = (itemToBeRemoved) => {
    const filteredCartItem = cartItems.filter(item=>{
      return item.id !== itemToBeRemoved.id
    })
    setCartItems(filteredCartItem);
  };

  //decreasing the quantity of item by 1
  const decreaseItemByOne = (currentItem) => {
    // if quantity of the current item is 1 then remove the item from cartItems, because we cannot have quantity less than 1
    if (currentItem.quantity === 1) {
      const filteredCartItems = cartItems.filter(
        (item) => item.id !== currentItem.id
      );
      return setCartItems(filteredCartItems)
    }

    //if quantity is not less than 1 then simply decrease quantity by one
    const updatedCartItems = cartItems.map((item) => {
      return item.id === currentItem.id
        ? { ...item, quantity: item.quantity - 1 }
        : item;
    });
    return setCartItems(updatedCartItems);
  };

  //function to calculate total items in cart
  useEffect(() => {
    const totalItems = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setTotalItemsInCart(totalItems);
  }, [cartItems]);

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
    setTotalAmount(grandTotal);
  }, [cartItems]);

  //because the quantity of item gets below zero when we decrease them let make a useEffect that runs when
  // there is change in cartItems and replace quantity of item by  0 when the quantity is less than zero

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
