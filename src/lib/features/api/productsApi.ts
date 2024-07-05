import axiosBaseQuery from "@/api";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (body) => ({
        url: "products/test",
        method: "POST",
        body,
      }),
    }),
    // getCategory: builder.query({
    //   query: (letter) => ({
    //     url: `categories/filtered?letters=${letter}`,
    //     method: "Get",
    //   }),
    // }),
  }),
});

export const { useAddProductMutation } = productsApi;

export default productsApi;
