import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  makePayment: false,
};

const paymentSLice = createSlice({
  name: "paymentSLice",
  initialState,
  reducers: {
    makePayment(state, action) {
      state.makePayment = action.payload;
    },
  },
});

export const { makePayment } = paymentSLice.actions;

export default paymentSLice.reducer;
