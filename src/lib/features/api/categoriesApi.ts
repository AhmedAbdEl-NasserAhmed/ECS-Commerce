import axiosBaseQuery from "@/api";

import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

// RTK Query
const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  tagTypes: ["CATEGORIES"],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (body) => ({
        url: "categories",
        method: "POST",
        body,
      }),
    }),
    getCategory: builder.query({
      query: (letter) => ({
        url: `categories/filtered?letters=${letter}`,
        method: "GET",
      }),
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `categories/${id}`,
        method: "GET",
      }),
      providesTags: ["CATEGORIES"],
    }),
    editCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CATEGORIES"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CATEGORIES"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoryQuery,
  useGetCategoryByIdQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;

export default categoriesApi;
