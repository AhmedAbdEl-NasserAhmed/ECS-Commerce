import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
// import axiosBaseQuery from "services/Api";
// import { REACT_APP_CONTRACTOR_BASE_URL } from "utils/Env/Env";

// RTK Query
const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({ url: "todos" }),
    }),
  }),
});

export const { useGetTodosQuery } = testApi;

export default testApi;
