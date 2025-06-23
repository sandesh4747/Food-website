import { mainApi } from "../../store/mainApi";

export const productApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    //////////////GET ALL PRODUCTS///////////////
    getAllProuducts: builder.query({
      query: () => ({
        url: "/product",
      }),

      providesTags: ["Product"],
    }),

    //////////////GET SEARCH RESULTS///////////////
    getSearchResults: builder.query({
      query: (search) => ({
        url: `/product?search=${search}`,
      }),

      providesTags: ["Product"],
    }),

    //////////////GET SINGLE PRODUCT///////////////
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    recommendedProduct: builder.query({
      query: (id) => ({
        url: "/product/recommendations",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    ////////////////ADD PRODUCT////////////////
    addProduct: builder.mutation({
      query: (val) => ({
        url: "/product/create",
        method: "POST",
        body: val,
      }),
      invalidatesTags: ["Product"],
    }),
    ///////////////UPDATE PRODUCT///////////////
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/product/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    /////////////////DELETE PRODUCT/////////////
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    //////////////GET CATEGORY PRODUCTS///////////////
    categoryProducts: builder.query({
      query: (id) => ({
        url: `/product/category/${id}`,
      }),

      providesTags: ["Product"],
    }),

    //////////////TOGGLE FEATURED PRODUCTS///////////////
    toggleProducts: builder.mutation({
      query: (id) => ({
        url: `/product/toggle/${id}`,
        method: "PATCH",
      }),

      providesTags: ["Product"],
    }),

    //////////////GET FEATURED PRODUCTS///////////////
    featuredProducts: builder.query({
      query: () => ({
        url: "/product/featured-products",
      }),

      providesTags: ["Product"],
    }),
    ////////////LATEST-PRODUCTS////////////////////
    latestProducts: builder.query({
      query: () => ({
        url: "/product/latest-products",
      }),

      providesTags: ["Product"],
    }),

    //////////////GET TOP RATED PRODUCTS///////////////
    topRatedProducts: builder.query({
      query: () => ({
        url: "/product/top-rated-products",
      }),

      providesTags: ["Product"],
    }),

    //////////////GET MOST REVIEWED PRODUCTS///////////////
    MostReviewdProducts: builder.query({
      query: () => ({
        url: "/product/most-reviewed-products",
      }),

      providesTags: ["Product"],
    }),
  }),
});

export const {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useToggleProductsMutation,
  useCategoryProductsQuery,
  useAddProductMutation,
  useGetAllProuductsQuery,
  useGetSingleProductQuery,

  useFeaturedProductsQuery,
  useLatestProductsQuery,
  useTopRatedProductsQuery,
  useMostReviewdProductsQuery,
  useRecommendedProductQuery,
  useGetSearchResultsQuery,
} = productApi;
