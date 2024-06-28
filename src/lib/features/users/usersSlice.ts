import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "ahmed",
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state) {
      state.name = "khaled";
    },
  },
});

export const usersActions = users.actions;

export default users.reducer;
