import axiosBaseQuery from "@/api";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const contactUsApi = createApi({
  reducerPath: "contactUsApi",
  tagTypes: ["CONTACTUS"],
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
      invalidatesTags: ["CONTACTUS"],
    }),
    getAllFeedBack: builder.query({
      query: () => ({
        url: `feedBacks`,
        method: "GET",
      }),
      providesTags: ["CONTACTUS"],
    }),
  }),
});

export const { useSendFeedBackMutation, useGetAllFeedBackQuery } = contactUsApi;

export default contactUsApi;
