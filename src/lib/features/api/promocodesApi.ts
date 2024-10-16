import axiosBaseQuery from "@/api";
import { queryBuilder } from "@/lib/helpers";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const promocodesApi = createApi({
  reducerPath: "promocodesApi",
  tagTypes: ["PROMOCODES"],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),

  endpoints: (builder) => ({
    addPromocode: builder.mutation({
      query: (body) => ({
        url: `promoCodes`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["PROMOCODES"],
    }),
    getAllPromocodes: builder.query({
      query: (query) => {
        const q = queryBuilder(query);
        return {
          url: `promoCodes?${q}`,
          method: "GET",
        };
      },
      providesTags: ["PROMOCODES"],
    }),
    getPromocodeById: builder.query({
      query: (id) => ({
        url: `promoCodes/${id}`,
        method: "GET",
      }),
      providesTags: ["PROMOCODES"],
    }),
    editPromocode: builder.mutation({
      query: ({ id, data }) => ({
        url: `promoCodes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PROMOCODES"],
    }),
    deletePromocode: builder.mutation({
      query: (id) => ({
        url: `promoCodes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PROMOCODES"],
    }),
  }),
});

export const {
  useGetPromocodeByIdQuery,
  useAddPromocodeMutation,
  useGetAllPromocodesQuery,
  useLazyGetAllPromocodesQuery,
  useEditPromocodeMutation,
  useDeletePromocodeMutation,
} = promocodesApi;

export default promocodesApi;
