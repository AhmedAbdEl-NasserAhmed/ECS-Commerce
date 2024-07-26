import { createSlice } from "@reduxjs/toolkit";

let userToken = null;

if (typeof window !== "undefined") {
  // Check if window is available
  if (localStorage.getItem("userToken")) {
    userToken = localStorage.getItem("userToken");
  }
}

let user = null;

if (typeof window !== "undefined") {
  // Check if window is available
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }
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
