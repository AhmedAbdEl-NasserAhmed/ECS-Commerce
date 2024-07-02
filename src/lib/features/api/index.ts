import axiosBaseQuery from "@/api";
import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

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
    addTodo: builder.mutation({
      query: (body) => ({ url: "todos", method: "POST", body }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation } = testApi;

export default testApi;
