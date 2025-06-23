import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000/api/v1"
    : "/api/v1";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
