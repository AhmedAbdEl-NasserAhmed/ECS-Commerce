import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  subCategory: [],
  images: {},
};

const adminProductSlice = createSlice({
  name: "adminProductSlice",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload.data;
    },
    setSubCategory(state, action) {
      state.subCategory = action.payload.data;
    },
    setImages(state, action) {
      state.images = action.payload.data;
    },
  },
});

export const { setSubCategory, setImages, setCategory } = adminProductSlice.actions;

export default adminProductSlice.reducer;
