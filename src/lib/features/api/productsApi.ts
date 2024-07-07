import axiosBaseQuery from "@/api";
import { getUniqueValues } from "@/lib/helpers";

import { createApi } from "@reduxjs/toolkit/query/react";

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

    getProductByName: builder.query({
      query: (letter) => ({
        url: `products/filtered?letters=${letter}`,
        method: "GET",
      }),
      providesTags: ["PRODUCTS", "CATEGORIES", "SUB-CATEGORIES"],
      transformResponse: (response) => {
        const data = getUniqueValues(response.data, "name");

        return data;
      },
    }),

    getSingleProductBySlug: builder.query({
      query: (slug) => ({
        url: `products/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["PRODUCTS", "CATEGORIES", "SUB-CATEGORIES"],
    }),

    getSingleProductByID: builder.query({
      query: (id) => ({
        url: `products/id/${id}`,
        method: "GET",
      }),
      providesTags: ["PRODUCTS", "CATEGORIES", "SUB-CATEGORIES"],
    }),

    deleteSingleProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCTS", "CATEGORIES", "SUB-CATEGORIES"],
    }),
  }),
});

export const {
  useGetProductByNameQuery,
  useGetAllProductsQuery,
  useAddProductMutation,
  useDeleteSingleProductMutation,
  useGetSingleProductBySlugQuery,
  useGetSingleProductByIDQuery,
} = productsApi;

export default productsApi;
