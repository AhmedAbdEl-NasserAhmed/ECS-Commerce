import axiosBaseQuery from "@/api";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  tagTypes: [
    "PAYMENT",
    "CARTITEMS",
    "ORDERS",
    "CATEGORIES",
    "PRODUCTS",
    "USERS",
  ],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAnalyticsData: builder.query({
      query: (q) => ({
        url: `analytics`,
        method: "GET",
      }),
      providesTags: [
        "PAYMENT",
        "CARTITEMS",
        "ORDERS",
        "CATEGORIES",
        "PRODUCTS",
        "USERS",
      ],
    }),
  }),
});

export const { useGetAnalyticsDataQuery } = dashboardApi;

export default dashboardApi;
