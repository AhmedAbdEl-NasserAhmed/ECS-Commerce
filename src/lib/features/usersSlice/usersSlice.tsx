import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setCartItems } from "../cartSlice/cartSlice";

let userToken = null;

if (typeof localStorage !== undefined) {
  userToken = localStorage.getItem("userToken");
}

let user = null;

if (typeof localStorage !== undefined) {
  user = JSON.parse(localStorage.getItem("user"));
}

const initialState = {
  user: user || null,
  isAuthenticated: !!userToken,
  token: userToken,
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.token;
      state.token = action.payload.token;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { loginUser, logoutUser } = usersSlice.actions;

export default usersSlice.reducer;
