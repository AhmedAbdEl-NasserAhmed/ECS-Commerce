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
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        method: "GET",
      }),
      providesTags: ["ORDERS"],
    }),
    updateOrder: builder.mutation({
      query: ({ body, orderId }) => ({
        url: `orders/${orderId}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} = ordersApi;

export default ordersApi;
