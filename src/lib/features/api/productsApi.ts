import axiosBaseQuery from "@/api";
import { getUniqueValues, queryBuilder } from "@/lib/helpers";

import { createApi } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["PRODUCTS", "CATEGORIES", "COLLECTIONS"],
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
      query: ({
        categoryId,
        max,
        min,
        page,
        colors,
        size,
        limit,
        subCategory,
        sort,
        sale,
      }) => {
        return {
          url: `products?category=${categoryId}&limit=${limit}&max=${max}&min=${min}&page=${page}&size=${size}&sort=${sort}&colors=${colors}&subCategory=${subCategory}&sale=${sale}`,
          method: "GET",
        };
      },
      providesTags: ["PRODUCTS", "CATEGORIES", "COLLECTIONS"],
    }),

    getProductByName: builder.query({
      query: (letter) => ({
        url: `products/filtered?letters=${letter}`,
        method: "GET",
      }),
      providesTags: ["PRODUCTS", "CATEGORIES", "COLLECTIONS"],
      transformResponse: (response) => {
        const data = getUniqueValues(response.data, ["name"]);
        return data;
      },
    }),
    getAllProductsColors: builder.query({
      query: () => ({
        url: "products/colors",
        method: "GET",
      }),
      providesTags: ["PRODUCTS", "CATEGORIES", "COLLECTIONS"],
    }),

    getSingleProductBySlug: builder.query({
      query: (slug) => ({
        url: `products/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["PRODUCTS", "CATEGORIES", "COLLECTIONS"],
    }),

    getPaginatedProducts: builder.query({
      query: (query) => {
        const q = queryBuilder(query);
        return {
          url: `products/allProductsAdmin?${q}`,
          method: "GET",
        };
      },
      providesTags: ["PRODUCTS", "CATEGORIES", "COLLECTIONS"],
    }),

    getSingleProductByID: builder.query({
      query: (id) => ({
        url: `products/id/${id}`,
        method: "GET",
      }),
      providesTags: ["PRODUCTS", "CATEGORIES", "COLLECTIONS"],
    }),

    updateSingleProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PRODUCTS", "CATEGORIES", "COLLECTIONS"],
    }),

    deleteSingleProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCTS", "CATEGORIES", "COLLECTIONS"],
    }),
  }),
});

export const {
  useGetProductByNameQuery,
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useAddProductMutation,
  useDeleteSingleProductMutation,
  useGetSingleProductBySlugQuery,
  useGetSingleProductByIDQuery,
  useUpdateSingleProductMutation,
  useGetAllProductsColorsQuery,
  useGetPaginatedProductsQuery,
  useLazyGetPaginatedProductsQuery,
} = productsApi;

export default productsApi;
