import { mainApi } from "../../store/mainApi";

export const paymentApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    payment: builder.mutation({
      query: (paymentData) => ({
        url: "/stripe/create-checkout-session",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Payment"],
    }),
    paymentSuccess: builder.mutation({
      query: (paymentData) => ({
        url: "/stripe/checkout-success",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const { usePaymentMutation, usePaymentSuccessMutation } = paymentApi;
