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
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import dashboardApi from "./features/api/dashboardApi";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  usersSlice,
  cartSlice,
  [usersApi.reducerPath]: usersApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [subCategoriesApi.reducerPath]: subCategoriesApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [contactUsApi.reducerPath]: contactUsApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
  [cartItemsApi.reducerPath]: cartItemsApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
});

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
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
      cartItemsApi.middleware,
      dashboardApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
