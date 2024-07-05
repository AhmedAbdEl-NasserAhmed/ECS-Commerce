import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/usersSlice/usersSlice";
import usersApi from "./features/api/usersApi";
import categoriesApi from "./features/api/categoriesApi";
import subCategoriesApi from "./features/api/subCategoriesApi";
import productsApi from "./features/api/productsApi";
import colorsOptionsSlice from "./features/colorsOptionsSlice/colorsOptionsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      usersSlice: usersSlice,
      colorsOptionsSlice: colorsOptionsSlice,

      [usersApi.reducerPath]: usersApi.reducer,
      [categoriesApi.reducerPath]: categoriesApi.reducer,
      [subCategoriesApi.reducerPath]: subCategoriesApi.reducer,
      [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        usersApi.middleware,
        categoriesApi.middleware,
        subCategoriesApi.middleware,
        productsApi.middleware
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
