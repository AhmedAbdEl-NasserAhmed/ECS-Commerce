import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCategory: [],
  images: [],
};

const adminProductSlice = createSlice({
  name: "adminProductSlice",
  initialState,
  reducers: {
    setSubCategory(state, action) {
      state.subCategory = action.payload.data;
    },
    setImages(state, action) {
      state.images = action.payload.data;
    },
  },
});

export const { setSubCategory, setImages } = adminProductSlice.actions;

export default adminProductSlice.reducer;
