import axiosBaseQuery from "@/api";
import { queryBuilder } from "@/lib/helpers";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const subCategoriesApi = createApi({
  reducerPath: "subCategoriesApi",
  tagTypes: ["SUB-CATEGORY", "CATEGORIES"],
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
      invalidatesTags: ["SUB-CATEGORY"],
    }),

    getSubCategory: builder.query({
      query: ({ letter, categoryId, lang }) => ({
        url: `subCategories/filtered?letters=${letter}&category=${categoryId}&lang=${lang}`,
        method: "GET",
      }),
      providesTags: ["SUB-CATEGORY", "CATEGORIES"],
    }),

    getAllSubCategories: builder.query({
      query: () => ({
        url: `subCategories`,
        method: "GET",
      }),
      providesTags: ["SUB-CATEGORY", "CATEGORIES"],
    }),

    getAllAdminSubCategories: builder.query({
      query: (query) => {
        const q = queryBuilder(query);
        return {
          url: `subCategories/allSubCategoriesAdmin?${q}`,
          method: "GET",
        };
      },
      providesTags: ["SUB-CATEGORY", "CATEGORIES"],
    }),

    getAllSubCategoriesByCategory: builder.query({
      query: (categoryId) => ({
        url: `subCategories?category=${categoryId}`,
        method: "GET",
      }),
      providesTags: ["SUB-CATEGORY", "CATEGORIES"],
    }),

    getSubCategoryById: builder.query({
      query: (id) => ({
        url: `subCategories/${id}`,
        method: "GET",
      }),
      providesTags: ["SUB-CATEGORY", "CATEGORIES"],
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
  useLazyGetSubCategoryQuery,
  useDeleteSubCategoryMutation,
  useEditSubCategoryMutation,
  useGetSubCategoryByIdQuery,
  useGetAllSubCategoriesByCategoryQuery,
  useGetAllSubCategoriesQuery,
  useLazyGetAllAdminSubCategoriesQuery,
} = subCategoriesApi;

export default subCategoriesApi;
