import axiosBaseQuery from "@/api";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const ordersApi = createApi({
  reducerPath: "ordersApi",
  tagTypes: ["ORDERS"],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: `orders`,
        method: "GET",
      }),
      providesTags: ["ORDERS"],
    }),
  }),
});

export const { useGetAllOrdersQuery } = ordersApi;

export default ordersApi;
