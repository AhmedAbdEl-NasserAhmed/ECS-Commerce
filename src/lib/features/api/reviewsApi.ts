import axiosBaseQuery from "@/api";
import { queryBuilder } from "@/lib/helpers";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  tagTypes: ["REVIEWS"],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),

  endpoints: (builder) => ({
    sendReview: builder.mutation({
      query: (body) => ({
        url: `reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["REVIEWS"],
    }),

    deleteReview: builder.mutation({
      query: ({ id }) => ({
        url: `reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["REVIEWS"],
    }),

    getAllReviews: builder.query({
      query: ({ page, sort }) => ({
        url: `reviews?sort=${sort}&limit=3&page=${page}`,
        method: "GET",
      }),
      providesTags: ["REVIEWS"],
    }),

    getAllAdminReviews: builder.query({
      query: (query) => {
        const q = queryBuilder(query);
        return {
          url: `reviews/allReviewsAdmin?${q}`,
          method: "GET",
        };
      },
      providesTags: ["REVIEWS"],
    }),

    getProductReviews: builder.query({
      query: ({ id, sort, page }) => ({
        url: `reviews/${id}/product?sort=${sort}&limit=3&page=${page}`,
        method: "GET",
      }),
      providesTags: ["REVIEWS"],
    }),

    editReview: builder.mutation({
      query: ({ data, id }) => ({
        url: `reviews/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["REVIEWS"],
    }),
  }),
});

export const {
  useSendReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useEditReviewMutation,
  useGetProductReviewsQuery,
  useLazyGetAllAdminReviewsQuery,
} = reviewsApi;

export default reviewsApi;
