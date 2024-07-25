import { setCookie, getCookie, deleteCookie } from "cookies-next";

import { createSlice } from "@reduxjs/toolkit";

interface CartSlice {
  cartItems: any;
  makePayment: boolean;
}

const initialState: CartSlice = {
  cartItems: [],
  makePayment: false,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    incrementProductItem(state, action) {
      const { id, maxQuantity } = action.payload;

      state.cartItems = state.cartItems.map((product) =>
        product.cartItemId === id
          ? {
              ...product,
              quantity:
                maxQuantity !== product.quantity
                  ? product.quantity + 1
                  : product.quantity,
            }
          : product
      );
    },
    decrementProductItem(state, action) {
      state.cartItems = state.cartItems.map((product) => {
        return product.cartItemId === action.payload
          ? {
              ...product,
              quantity:
                product.quantity === 1
                  ? product.quantity
                  : product.quantity - 1,
            }
          : product;
      });
    },
    assignCartId(state, action) {
      state.cartItems = state.cartItems.map((product) => {
        return !product.cart ? { ...product, cart: action.payload } : product;
      });
    },
    makePayment(state, action) {
      state.makePayment = action.payload;
    },
  },
});

export const {
  incrementProductItem,
  decrementProductItem,
  assignCartId,
  makePayment,
} = cartSlice.actions;

export default cartSlice.reducer;
