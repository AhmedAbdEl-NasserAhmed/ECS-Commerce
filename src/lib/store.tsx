import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/usersSlice/usersSlice";
import adminApi from "./features/api/adminApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      usersSlice: usersSlice,
      [adminApi.reducerPath]: adminApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        adminApi.middleware
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
