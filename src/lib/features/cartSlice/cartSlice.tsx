import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

let cartItemCookies = Cookies.get("cartItems");

let removedItems = [] as string[];

if (localStorage.getItem("removedItems") !== undefined) {
  removedItems = JSON.parse(localStorage.getItem("removedItems"));
}

interface CartSlice {
  cartItems: any;
  makePayment: boolean;
  existedProduct: string[];
}

const initialState: CartSlice = {
  cartItems: cartItemCookies ? JSON.parse(cartItemCookies) : [],
  makePayment: false,
  existedProduct: removedItems || [],
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
    emptyCartItems(state) {
      state.cartItems = [];
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
    addExistedProduct(state, action) {
      state.existedProduct = [...state.existedProduct, action.payload];
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementProductItem,
  decrementProductItem,
  assignCartId,
  makePayment,
  emptyCartItems,
  setCartItems,
  addExistedProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
