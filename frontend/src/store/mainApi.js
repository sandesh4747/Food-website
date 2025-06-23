import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000/api/v1/auth"
    : "/api/v1/auth";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1`,
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
