import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

let cookieItemCookies = Cookies.get("cookieItems");

let removedItems = [] as string[];

if (localStorage.getItem("removedItems") !== undefined) {
  removedItems = JSON.parse(localStorage.getItem("removedItems"));
}

interface CookieSlice {
  cookieItems: any;
  makePayment: boolean;
  existedItem: string[];
}

const initialState: CookieSlice = {
  cookieItems: cookieItemCookies ? JSON.parse(cookieItemCookies) : [],
  makePayment: false,
  existedItem: removedItems || [],
};

const cookieSlice = createSlice({
  name: "cookieSlice",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cookieItems = [...state.cookieItems, action.payload];
    },

    removeItem(state, action) {
      state.cookieItems = state.cookieItems.filter((product) => {
        return product.cookieItemId !== action.payload;
      });
    },

    incrementProductItem(state, action) {
      const { id, maxQuantity } = action.payload;

      state.cookieItems = state.cookieItems.map((product) =>
        product.cookieItemId === id
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
      state.cookieItems = state.cookieItems.map((product) => {
        return product.cookieItemId === action.payload
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
    assignCookieId(state, action) {
      state.cookieItems = state.cookieItems.map((product) => {
        return !product.cookie
          ? { ...product, cookie: action.payload }
          : product;
      });
    },
    makePayment(state, action) {
      state.makePayment = action.payload;
    },
    emptyCookieItems(state) {
      state.cookieItems = [];
    },
    setCookieItems(state, action) {
      state.cookieItems = action.payload;
    },
    addExistedItem(state, action) {
      state.existedItem = [...state.existedItem, action.payload];
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementProductItem,
  decrementProductItem,
  assignCookieId,
  makePayment,
  emptyCookieItems,
  setCookieItems,
  addExistedItem,
} = cookieSlice.actions;

export default cookieSlice.reducer;
