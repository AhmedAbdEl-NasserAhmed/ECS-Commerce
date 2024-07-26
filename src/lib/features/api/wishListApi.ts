import axiosBaseQuery from "@/api";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const wishListApi = createApi({
  reducerPath: "wishListApi",
  tagTypes: ["WISHLIST"],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    addPorductToWishList: builder.mutation({
      query: (body) => ({
        url: `wishListApi`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["WISHLIST"],
    }),
  }),
});

export const { useAddPorductToWishListMutation } = wishListApi;

export default wishListApi;
