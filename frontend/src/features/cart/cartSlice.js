import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  restaurantId: localStorage.getItem('cartRestaurantId') || null,
};

const updateCartInStorage = (state) => {
  localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  localStorage.setItem('cartRestaurantId', state.restaurantId);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      if (state.restaurantId && state.restaurantId !== item.restaurantId && state.cartItems.length > 0) {
        throw new Error("Cannot add items from multiple restaurants. Clear cart first.");
      }

      state.restaurantId = item.restaurantId;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...x, qty: x.qty + item.qty } : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      
      updateCartInStorage(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      if (state.cartItems.length === 0) {
        state.restaurantId = null;
      }
      updateCartInStorage(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.restaurantId = null;
      updateCartInStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
