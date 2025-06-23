import { mainApi } from "../../store/mainApi";

export const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    //////////////LOGIN///////////////
    userLogin: builder.mutation({
      query: (val) => ({
        url: "/auth/login",
        method: "POST",
        body: val,
      }),
      invalidatesTags: ["User"],
    }),

    //////////////SIGNUP///////////////
    userSignup: builder.mutation({
      query: (val) => ({
        url: "/auth/signup",
        method: "POST",
        body: val,
      }),
      invalidatesTags: ["User"],
    }),

    //////////////FORGOT PASSWORD///////////////
    forgotPassword: builder.mutation({
      query: (val) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: val,
      }),
      invalidatesTags: ["User"],
    }),

    //////////////USER CHECK///////////////
    userCheck: builder.query({
      query: () => ({
        url: "/auth/check-auth",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    //////////////VERIFY EMAIL///////////////
    verifyEmail: builder.mutation({
      query: (val) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: val,
      }),
      invalidatesTags: ["User"],
    }),

    //////////////RESET PASSWORD///////////////
    ResetPassword: builder.mutation({
      query: ({ token, ...val }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: val,
      }),
      invalidatesTags: ["User"],
    }),

    //////////////LOGOUT///////////////
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLogoutMutation,
  useUserLoginMutation,
  useUserCheckQuery,
  useUserSignupMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
} = userApi;
