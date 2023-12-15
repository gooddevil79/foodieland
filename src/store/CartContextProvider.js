import React, { useReducer } from 'react';
import CartContext from './cart-context';
const cartItemsDefaultValue = {
  items: [],
  totalAmount: 0,
};
const cartReducerFN = function (state, action) {
  if (action.type === 'ADD') {
    let updatedCartItems;
    const newItem = action.payload;
    const updatedCartTotalAmount = state.totalAmount + newItem.price;
    const exsitingItemIndex = state.items.findIndex(
      item => item.id === newItem.id
    );
    const existingItem = state.items[exsitingItemIndex];
    if (existingItem) {
      let updatedItem = {
        ...existingItem,
        amount: existingItem.amount + 1,
      };
      updatedCartItems = [...state.items];
      updatedCartItems[exsitingItemIndex] = updatedItem;
    } else {
      updatedCartItems = state.items.concat(newItem);
    }
    return {
      items: updatedCartItems,
      totalAmount: updatedCartTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const certainItemIndex = state.items.findIndex(
      item => item.id === action.payload
    );

    const certainItem = state.items[certainItemIndex];
    const updatedCartTotalAmount = state.totalAmount - certainItem.price;
    if (certainItem.amount > 1) {
      let updatedCertainItem = {
        ...certainItem,
        amount: certainItem.amount - 1,
      };
      let updatedCartItems = [...state.items];
      updatedCartItems[certainItemIndex] = updatedCertainItem;
      return {
        items: updatedCartItems,
        totalAmount: updatedCartTotalAmount,
      };
    } else if (certainItem.amount === 1) {
      const remainingCartItems = state.items.filter(
        item => item.id !== certainItem.id
      );
      return {
        items: remainingCartItems,
        totalAmount: updatedCartTotalAmount,
      };
    }
  }
  if (action.type === 'CLEAR') {
    return cartItemsDefaultValue;
  }
  return state;
};
const CartContextProvider = function (props) {
  const [cartState, dispatchCartState] = useReducer(
    cartReducerFN,
    cartItemsDefaultValue
  );
  const addToCartHandler = function (item) {
    dispatchCartState({ type: 'ADD', payload: item });
  };
  const removeFromCartHandler = function (id) {
    dispatchCartState({ type: 'REMOVE', payload: id });
  };
  const clearAllHandler = function () {
    dispatchCartState({ type: 'CLEAR' });
  };
  const cartValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    clearAll: clearAllHandler,
  };
  return (
    <CartContext.Provider value={cartValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
