import axiosBaseQuery from "@/api";
import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

// RTK Query
const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["USERS"],
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
    getAllUsers: builder.query({
      query: () => ({
        url: `users`,
        method: "GET",
      }),
    }),
    signinWithGoogle: builder.mutation({
      query: (body) => ({
        url: `auth/google`,
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
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: "auth/forgetPassword",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ newPassword, token }) => ({
        url: `auth/resetPassword/${token}`,
        method: "PATCH",
        body: { newPassword },
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUserloginMutation,
  useUserSignupMutation,
  useUpdatePasswordMutation,
  useActivateEmailMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useSigninWithGoogleMutation,
} = usersApi;

export default usersApi;
