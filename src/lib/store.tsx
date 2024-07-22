import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/usersSlice/usersSlice";
import usersApi from "./features/api/usersApi";
import categoriesApi from "./features/api/categoriesApi";
import subCategoriesApi from "./features/api/subCategoriesApi";
import productsApi from "./features/api/productsApi";
import cartSlice from "./features/cartSlice/cartSlice";
import ordersApi from "./features/api/ordersApi";
import paymentApi from "./features/api/paymentApi";
import contactUsApi from "./features/api/contactUsApi";
import reviewsApi from "./features/api/reviewsApi";
import cartItemsApi from "./features/api/cartItemsApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      usersSlice: usersSlice,
      cartSlice: cartSlice,
      [usersApi.reducerPath]: usersApi.reducer,
      [categoriesApi.reducerPath]: categoriesApi.reducer,
      [subCategoriesApi.reducerPath]: subCategoriesApi.reducer,
      [productsApi.reducerPath]: productsApi.reducer,
      [ordersApi.reducerPath]: ordersApi.reducer,
      [paymentApi.reducerPath]: paymentApi.reducer,
      [contactUsApi.reducerPath]: contactUsApi.reducer,
      [reviewsApi.reducerPath]: reviewsApi.reducer,
      [cartItemsApi.reducerPath]: cartItemsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        usersApi.middleware,
        categoriesApi.middleware,
        subCategoriesApi.middleware,
        productsApi.middleware,
        ordersApi.middleware,
        paymentApi.middleware,
        contactUsApi.middleware,
        reviewsApi.middleware,
        cartItemsApi.middleware
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
