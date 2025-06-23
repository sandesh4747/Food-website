import { mainApi } from "../../store/mainApi";

export const orderApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    //////////////GET ALL ORDERS///////////////
    getAllOrders: builder.query({
      query: () => ({
        url: "/order",
      }),
      providesTags: ["Order"],
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: "/order/my-orders",
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useGetMyOrdersQuery } = orderApi;
