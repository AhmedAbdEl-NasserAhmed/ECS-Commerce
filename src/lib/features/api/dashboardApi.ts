import axiosBaseQuery from "@/api";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  tagTypes: ["PAYMENT"],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAnalyticsData: builder.query({
      query: (q) => ({
        url: `analytics`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAnalyticsDataQuery } = dashboardApi;

export default dashboardApi;
