import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCategory: [],
};

const adminProductSlice = createSlice({
  name: "adminProductSlice",
  initialState,
  reducers: {
    setSubCategory(state, action) {
      state.subCategory = action.payload.data;
    },
  },
});

export const { setSubCategory } = adminProductSlice.actions;

export default adminProductSlice.reducer;
