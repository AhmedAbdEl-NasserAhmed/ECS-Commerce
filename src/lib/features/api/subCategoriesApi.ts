import axiosBaseQuery from "@/api";

import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

// RTK Query
const subCategoriesApi = createApi({
  reducerPath: "subCategoriesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
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
  }),
});

export const { useAddSubCategoryMutation, useGetSubCategoryQuery } =
  subCategoriesApi;

export default subCategoriesApi;
