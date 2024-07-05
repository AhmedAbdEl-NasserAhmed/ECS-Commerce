import axiosBaseQuery from "@/api";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["PRODUCTS"],
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
      providesTags: ["PRODUCTS"],
    }),
    getSingleProduct: builder.query({
      query: (slug) => ({
        url: `products/${slug}`,
        method: "GET",
      }),
      providesTags: ["PRODUCTS"],
    }),
    getProductByName: builder.query({
      query: (letter) => ({
        url: `products/filtered?letters=${letter}`,
        method: "GET",
      }),
      providesTags: ["PRODUCTS"],
    }),
    deleteSingleProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCTS"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useDeleteSingleProductMutation,
  useGetProductByNameQuery,
} = productsApi;

export default productsApi;
