import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/users/usersSlice";
import testApi from "./features/api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      users: usersSlice,

      [testApi.reducerPath]: testApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        testApi.middleware
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
