import axiosBaseQuery from "@/api";

import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

// RTK Query
const subCategoriesApi = createApi({
  reducerPath: "subCategoriesApi",
  tagTypes: ["SUB-CATEGORY"],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    addSubCategory: builder.mutation({
      query: (body) => ({
        url: "subCategories",
        method: "POST",
        body,
      }),
    }),
    getSubCategory: builder.query({
      query: (letter) => ({
        url: `subCategories/filtered?letters=${letter}`,
        method: "Get",
      }),
    }),
    getSubCategoryById: builder.query({
      query: (id) => ({
        url: `subCategories/${id}`,
        method: "GET",
      }),
      providesTags: ["SUB-CATEGORY"],
    }),
    editSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `subCategories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SUB-CATEGORY"],
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `subCategories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SUB-CATEGORY"],
    }),
  }),
});

export const {
  useAddSubCategoryMutation,
  useGetSubCategoryQuery,
  useDeleteSubCategoryMutation,
  useEditSubCategoryMutation,
  useGetSubCategoryByIdQuery,
} = subCategoriesApi;

export default subCategoriesApi;
