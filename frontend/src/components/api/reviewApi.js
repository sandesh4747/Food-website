import { mainApi } from "../../store/mainApi";

export const reviewApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    //////////////GET ALL REVIEWS///////////////
    getAllReviews: builder.query({
      query: () => ({
        url: "/review",
      }),
      providesTags: ["Review"],
    }),
    ////////////CREATE REVIEW///////////////
    createReview: builder.mutation({
      query: (val) => ({
        url: "/review/create",
        method: "POST",
        body: val,
      }),
      invalidatesTags: ["Review"],
    }),

    updateReview: builder.mutation({
      query: ({ id, comment, rating }) => ({
        url: `/review/update/${id}`,
        method: "PATCH",
        body: { comment, rating },
      }),
      invalidatesTags: ["Review"],
    }),

    deleteReview: builder.mutation({
      query: (val) => ({
        url: `/review/delete/${val}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
