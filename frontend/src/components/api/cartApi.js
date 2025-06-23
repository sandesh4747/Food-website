import { getCart } from "../../../../backend/controllers/cart.controller";
import { mainApi } from "../../store/mainApi";

export const cartApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    //////////////GET CART///////////////
    getCart: builder.query({
      query: () => ({
        url: "/cart/get",
      }),
      providesTags: ["Cart"],
    }),

    //////////////ADD TO CART///////////////
    addCart: builder.mutation({
      query: (val) => ({
        url: "/cart/add",
        method: "POST",
        body: val,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: (val) => ({
        url: "/cart/update",
        method: "PATCH",
        body: val,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCart: builder.mutation({
      query: (val) => ({
        url: "/cart/remove",
        method: "DELETE",
        body: val,
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: (val) => ({
        url: "/cart/clear",
        method: "DELETE",
        body: val,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartMutation,
  useUpdateCartMutation,
  useRemoveCartMutation,
  useClearCartMutation,
} = cartApi;
