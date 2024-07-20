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
    getOrderByUserId: builder.query({
      query: (userId) => ({
        url: `orders/${userId}/user`,
        method: "GET",
      }),
      providesTags: ["ORDERS"],
    }),
    updateOrder: builder.mutation({
      query: ({ body, orderId }) => ({
        url: `orders/${orderId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ORDERS"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useGetOrderByUserIdQuery,
} = ordersApi;

export default ordersApi;
