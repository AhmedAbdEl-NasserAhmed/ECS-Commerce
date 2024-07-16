import { getCookie } from "@/lib/helpers";
import { createSlice } from "@reduxjs/toolkit";

const cartItemCookies = getCookie("cartItems");

interface CartSlice {
  cartItems: any;
}

const initialState: CartSlice = {
  cartItems: JSON.parse(cartItemCookies) || [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter((product) => {
        return product.cartItemId !== action.payload;
      });
    },
    incrementProductItem(state, action) {
      const { id, maxQuantity } = action.payload;

      state.cartItems = state.cartItems.map((product) =>
        product.id === id
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
        return product.id === action.payload
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
  },
});

export const {
  addItem,
  removeItem,
  incrementProductItem,
  decrementProductItem,
  assignCartId,
} = cartSlice.actions;

export default cartSlice.reducer;
