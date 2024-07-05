import axiosBaseQuery from "@/api";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["PRODUCTS", "CATEGORIES", "SUB-CATEGORIES"],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (body) => ({
        url: "products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PRODUCTS"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "products?limit=5",
        method: "GET",
      }),
      providesTags: ["PRODUCTS", "CATEGORIES", "SUB-CATEGORIES"],
    }),
  }),
});

export const { useGetAllProductsQuery, useAddProductMutation } = productsApi;

export default productsApi;
