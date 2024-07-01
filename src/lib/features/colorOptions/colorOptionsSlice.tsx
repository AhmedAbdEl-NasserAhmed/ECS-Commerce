import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colorOptions: [{ value: "black", label: "Black", color: "#000000" }],
};

const colorOptions = createSlice({
  name: "colorOptions",
  initialState,
  reducers: {
    addColor(state, action) {
      state.colorOptions.push(action.payload);
    },
  },
});

export const { addColor } = colorOptions.actions;

export default colorOptions.reducer;
