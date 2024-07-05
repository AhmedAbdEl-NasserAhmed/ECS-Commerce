import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colorsOptions: [{ value: "Black", label: "Black", color: "#000000" }],
};

const colorsOptions = createSlice({
  name: "colorsOptions",
  initialState,
  reducers: {
    addColor(state, action) {
      state.colorsOptions = [...state.colorsOptions, action.payload];
    },
  },
});

export const { addColor } = colorsOptions.actions;

export default colorsOptions.reducer;
