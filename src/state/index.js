import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  cart: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      (state.token = action.payload.token), (state.user = action.payload.user);
    },
    setLogout: (state) => {
      (state.token = null), (state.user = null);
    },
    setCart: (state, action) => {
      state.cart = [...state.cart, action.payload.newProduct];
    },
    emptyCart: (state) => {
      state.cart = [];
    },
    removeCartItem: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setLogin, setLogout, setCart, emptyCart, removeCartItem } =
  authSlice.actions;
export default authSlice.reducer;
