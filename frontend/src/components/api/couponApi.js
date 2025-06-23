import { mainApi } from "../../store/mainApi";

export const couponApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    //////////////GET COUPON///////////////
    getCoupon: builder.query({
      query: () => ({
        url: "/coupon",
        method: "GET",
      }),
      providesTags: ["Coupon"],
    }),

    applyCoupon: builder.mutation({
      query: (val) => ({
        url: "/coupon/validate",
        method: "POST",
        body: val,
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const { useGetCouponQuery, useApplyCouponMutation } = couponApi;
