import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    coupon: localStorage.getItem("coupon") || null,
    items: [], // [{ product: {...}, quantity: number }]
    status: "idle", // optional for loading/error state
  },
  reducers: {
    setCoupon(state, action) {
      state.coupon = action.payload;
      localStorage.setItem("coupon", action.payload);
    },
    clearCoupon(state) {
      state.coupon = null;
      localStorage.removeItem("coupon"); // Remove from localStorage
    },
    setCart(state, action) {
      state.items = action.payload;
    },
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find(
        (item) => item.product._id === product._id
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },
    updateCartItem(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product._id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.items = state.items.filter(
        (item) => item.product._id !== productId
      );
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  setCoupon,
} = cartSlice.actions;
