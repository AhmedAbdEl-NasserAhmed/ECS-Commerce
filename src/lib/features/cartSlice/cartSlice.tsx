import { createSlice } from "@reduxjs/toolkit";

interface CartSlice {
  cartItems: any;
}

const initialState: CartSlice = {
  cartItems: [],
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
        return product.id !== action.payload;
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
  },
});

export const {
  addItem,
  removeItem,
  incrementProductItem,
  decrementProductItem,
} = cartSlice.actions;

export default cartSlice.reducer;
