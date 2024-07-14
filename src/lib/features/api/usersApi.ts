import axiosBaseQuery from "@/api";
import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

// RTK Query
const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    userlogin: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    userSignup: builder.mutation({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        body,
      }),
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: "auth/updatePassword",
        method: "PATCH",
        body,
      }),
    }),
    activateEmail: builder.mutation({
      query: (body) => ({
        url: "auth/activate",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useUserloginMutation,
  useUserSignupMutation,
  useUpdatePasswordMutation,
  useActivateEmailMutation,
} = usersApi;

export default usersApi;
