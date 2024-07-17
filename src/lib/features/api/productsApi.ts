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
      query: ({ categoryId, max, min, page, colors, size, subCategory }) => {
        return {
          url: `products?category=${categoryId}&limit=2&max=${max}&min=${min}&page=${page}&size=${size}&colors=${colors}&subCategory=${subCategory}`,
          method: "GET",
        };
      },
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
    getAllProductsColors: builder.query({
      query: () => ({
        url: "products/colors",
        method: "GET",
      }),
      providesTags: ["PRODUCTS", "CATEGORIES", "SUB-CATEGORIES"],
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

    updateSingleProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PRODUCTS", "CATEGORIES", "SUB-CATEGORIES"],
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
  useUpdateSingleProductMutation,
  useGetAllProductsColorsQuery,
} = productsApi;

export default productsApi;
