import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/usersSlice/usersSlice";
import usersApi from "./features/api/usersApi";
import categoriesApi from "./features/api/categoriesApi";
import subCategoriesApi from "./features/api/subCategoriesApi";
import productsApi from "./features/api/productsApi";
import ordersApi from "./features/api/ordersApi";
import paymentApi from "./features/api/paymentApi";
import reviewsApi from "./features/api/reviewsApi";
import cartItemsApi from "./features/api/cartItemsApi";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cookieSlice from "./features/cookieSlice/cookieSlice";
import paymentSlice from "./features/paymentSlice/paymentSlice";
import dashboardApi from "./features/api/dashboardApi";
import wishListApi from "./features/api/wishListApi";
import feedbackApi from "./features/api/feedbacks";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  usersSlice,
  cookieSlice,
  paymentSlice,
  [usersApi.reducerPath]: usersApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [subCategoriesApi.reducerPath]: subCategoriesApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
  [cartItemsApi.reducerPath]: cartItemsApi.reducer,
  [wishListApi.reducerPath]: wishListApi.reducer,
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
      feedbackApi.middleware,
      reviewsApi.middleware,
      cartItemsApi.middleware,
      wishListApi.middleware,
      dashboardApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
