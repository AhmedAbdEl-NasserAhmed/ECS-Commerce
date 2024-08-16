import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  subCategory: [],
  images: {},
  colors: [],
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
    setColors(state, action) {
      state.colors = action.payload.data;
    },
  },
});

export const { setSubCategory, setImages, setCategory, setColors } =
  adminProductSlice.actions;

export default adminProductSlice.reducer;
