import axiosBaseQuery from "@/api";

import { createApi } from "@reduxjs/toolkit/query/react";

// RTK Query
const paymentApi = createApi({
  reducerPath: "paymentApi",
  tagTypes: ["PAYMENT"],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    paymentCheckout: builder.mutation({
      query: (body) => ({
        url: `payment/checkout`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["PAYMENT"],
    }),
    unAuthenticatedPaymentCheckout: builder.mutation({
      query: (body) => ({
        url: `payment/unAuthenticatedUserPay`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["PAYMENT"],
    }),
    cashPaymentCheckout: builder.mutation({
      query: (body) => ({
        url: `payment/cashPayment`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["PAYMENT"],
    }),
  }),
});

export const {
  usePaymentCheckoutMutation,
  useCashPaymentCheckoutMutation,
  useUnAuthenticatedPaymentCheckoutMutation,
} = paymentApi;

export default paymentApi;
