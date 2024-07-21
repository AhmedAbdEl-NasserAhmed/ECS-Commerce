import axiosBaseQuery from "@/api";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const cartItemsApi = createApi({
  reducerPath: "cartItemsApi",
  tagTypes: ["CARTITEMS"],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    setCartItems: builder.mutation({
      query: (body) => ({
        url: `cartItems`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["CARTITEMS"],
    }),
  }),
});

export const { useSetCartItemsMutation } = cartItemsApi;

export default cartItemsApi;
