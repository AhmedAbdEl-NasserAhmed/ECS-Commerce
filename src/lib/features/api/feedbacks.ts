import axiosBaseQuery from "@/api";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  tagTypes: ["FEEDBACKS"],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),

  endpoints: (builder) => ({
    sendFeedBack: builder.mutation({
      query: (body) => ({
        url: `feedBacks`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["FEEDBACKS"],
    }),
    getAllFeedBacks: builder.query({
      query: () => ({
        url: `feedBacks`,
        method: "GET",
      }),
      providesTags: ["FEEDBACKS"],
    }),
  }),
});

export const {
  useSendFeedBackMutation,
  useGetAllFeedBacksQuery,
  useLazyGetAllFeedBacksQuery,
} = feedbackApi;

export default feedbackApi;
