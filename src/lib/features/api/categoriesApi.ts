import axiosBaseQuery from "@/api";
import { queryBuilder } from "@/lib/helpers";

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
      invalidatesTags: ["CATEGORIES"],
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: `categories`,
        method: "GET",
      }),
      providesTags: ["CATEGORIES"],
    }),

    getCategory: builder.query({
      query: ({ letter, lang }) => ({
        url: `categories/filtered?letters=${letter}&lang=${lang}`,
        method: "GET",
      }),
      providesTags: ["CATEGORIES"],
    }),

    getCategoryById: builder.query({
      query: (id) => ({
        url: `categories/id/${id}`,
        method: "GET",
      }),
      providesTags: ["CATEGORIES"],
    }),
    getAdminCategory: builder.query({
      query: (query) => {
        const q = queryBuilder(query);
        return {
          url: `categories/allCategoriesAdmin?${q}`,
          method: "GET",
        };
      },
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
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useGetCategoryQuery,
  useGetCategoryByIdQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useLazyGetAdminCategoryQuery,
} = categoriesApi;

export default categoriesApi;
