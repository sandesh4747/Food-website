import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "./api/productApi";
import { BreadcrumbsWithIcon } from "./BreadCrumbs";
import { motion } from "framer-motion";
import img from "../assets/carousel-2.png";
import { Button, Rating, Textarea, Typography } from "@material-tailwind/react";
import { ShoppingCart, Trash, Loader, Pencil } from "lucide-react";
import { useCart } from "./hooks/useCart";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "./api/reviewApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function ProductDetails() {
  const navigate = useNavigate();

  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const [createReview, { isLoading: isSubmittingReview }] =
    useCreateReviewMutation();
  const { user } = useSelector((state) => state.authSlice);
  const { handleAddToCart } = useCart();
  const { id } = useParams();

  const { data, isLoading, refetch } = useGetSingleProductQuery(id);

  const product = data?.product;
  // console.log(product?.category);

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");

  const [userRating, setUserRating] = useState(0);

  const [reviewComment, setreviewComment] = useState("");

  const [thumbnail, setThumbnail] = useState(product?.image[0]);

  const breadcrumbs = [
    { path: "/", label: "Home" },
    {
      path: `/ProductDetails/${id}`,
      label: `ProductDetails / ${product?.category}`,
    },
  ];

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (userRating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      await createReview({
        productId: id,
        rating: userRating,
        comment: reviewComment,
      }).unwrap();

      toast.success("Review created successfully");
      refetch();
      setUserRating(0);
      setreviewComment("");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId).unwrap();
      toast.success("Review deleted successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleEditReview = async (review) => {
    setEditingReviewId(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditRating(0);
    setEditComment("");
  };

  const handleUpdateReview = async () => {
    if (editRating === 0) {
      toast.error("Please select a rating");
      return;
    }
    try {
      await updateReview({
        id: editingReviewId,
        rating: editRating,
        comment: editComment,
      }).unwrap();

      toast.success("Review updated successfully");
      refetch();
      handleCancelEdit();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  if (isLoading || !product)
    return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="w-full min-h-screen">
      {/* Banner */}
      <div className="h-90 w-full overflow-hidden mb-20 relative">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          src={img}
          alt="Banner"
          className="w-full max-h-220 object-cover object-[0_50%]"
          loading="lazy"
        />
        <div className="absolute top-[40%] sm:top-[50%] left-[5%] -translate-y-1/2 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold"
          >
            PRODUCT DETAILS
          </motion.h1>
          <div className="w-40 h-0.5 bg-red-600 rounded-full" />
          <BreadcrumbsWithIcon links={breadcrumbs} />
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-6xl px-6 md:px-20 pb-20 min-h-screen">
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl font-medium mb-8 border-b-2 border-red-600 inline-flex items-center w-10"
        >
          DETAILS
        </motion.p>
        <div className="flex flex-col md:flex-row gap-12 mt-6">
          {/* Image Gallery */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {product.image.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(img)}
                  className={`border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer ${
                    img === thumbnail && "outline-3 outline-red-500"
                  }`}
                >
                  <img key={index} src={img} alt={`thumb-${index}`} />
                </div>
              ))}
            </div>
            <div className=" border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img src={thumbnail || product.image[0]} alt="Main Product" />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-3xl font-semibold">{product.name}</h1>

            <div className="flex items-center gap-3">
              <Rating
                readonly
                value={Math.round(product.avgRating)}
                className="text-yellow-500"
              />
              <p className="text-sm text-gray-600">({product.avgRating})</p>
            </div>

            <div className="mt-4">
              <p
                className={
                  product.discount === 0
                    ? "hidden"
                    : "line-through text-gray-400 text-sm"
                }
              >
                MRP: ${product.price}
              </p>
              <p className="text-2xl font-bold text-orange-700">
                Now: ${product.price - (product.discount / 100) * product.price}
              </p>
              <p className="text-sm text-gray-500">(Inclusive of all taxes)</p>
            </div>

            <p className="font-semibold mt-6 flex flex-col">
              <span>About the product:</span>
              <span className="text-gray-600 text-sm">
                {product.description}
              </span>
            </p>

            <p className="mt-2 text-gray-500 text-sm">
              Available Stock: {product.stock}
            </p>

            <div className="flex items-center mt-8 gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (user?.role !== "admin") handleAddToCart(product._id);
                }}
                disabled={user?.role === "admin"}
                className={`flex-grow text-white py-2 rounded-lg font-medium flex items-center justify-center transition ${
                  user?.role === "admin"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#d62839] to-[#f77f00] hover:opacity-90"
                }`}
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={() => {
                  handleAddToCart(product._id);
                  navigate("/cart");
                }}
                disabled={user?.role === "admin"}
                className={`flex-grow py-2 rounded-lg font-semibold text-white transition ${
                  user?.role === "admin"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Review Section */}

        {user?.role !== "admin" && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <Typography variant="h5" className="mb-4">
              Write a Review
            </Typography>

            <div className="space-y-4">
              <div>
                <Typography variant="small" className="mb-2">
                  Your Rating
                </Typography>
                <Rating
                  key={userRating}
                  className="text-yellow-500"
                  value={userRating}
                  onChange={(value) => setUserRating(value)}
                />
              </div>

              <Textarea
                className=" outline-2 outline-orange-500/70 border-none rounded-lg p-2 w-full focus:outline-orange-700 focus:outline-2"
                placeholder="your review"
                value={reviewComment}
                onChange={(e) => setreviewComment(e.target.value)}
                rows={5}
              />

              <Button
                onClick={handleRatingSubmit}
                disabled={userRating === 0 || isSubmittingReview}
                className={`mt-2 ${
                  userRating === 0 || isSubmittingReview
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-amber-200 text-red-500 hover:bg-amber-300"
                }`}
              >
                {isSubmittingReview ? "Submitting Review..." : "Submit Review"}
              </Button>
            </div>
          </div>
        )}

        {/*  Reviews List */}
        {product?.reviews?.length > 0 ? (
          <div className="space-y-6">
            <Typography variant="h5" className="mb-4">
              Reviews
            </Typography>
            {product.reviews.map((review) => (
              <div
                key={review._id}
                className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white"
              >
                {" "}
                {editingReviewId === review._id ? (
                  <div className="space-y-4">
                    <div>
                      <Typography className="mb-2" variant="small">
                        Your Rating
                      </Typography>
                      <Rating
                        value={editRating}
                        onChange={(value) => setEditRating(value)}
                        className="text-yellow-500"
                      />
                    </div>

                    <Textarea
                      className=" outline-2  outline-orange-500/70   border-none  rounded-lg   p-2   w-full  focus:outline-orange-700    focus:outline-2 "
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      rows={3}
                    />

                    <div className="flex gap-2">
                      <Button
                        onClick={handleUpdateReview}
                        disabled={isUpdating}
                        className="bg-orange-500 text-white"
                      >
                        {isUpdating ? (
                          <div className="flex items-center gap-2">
                            <Loader className="animate-spin h-4 w-4" />
                            Updating...
                          </div>
                        ) : (
                          "Update Review"
                        )}
                      </Button>
                      <Button
                        className="bg-gray-700"
                        onClick={handleCancelEdit}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex  items-center gap-3">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-gray-500">
                            {" "}
                            {user?.name || "Anonymous"}
                          </span>
                          <Rating
                            value={review.rating}
                            readonly
                            className="text-yellow-500 "
                          />
                        </div>
                        <Typography variant="small" className="text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </Typography>
                      </div>
                      <Typography
                        variant="small"
                        className="text-gray-700 font-medium   flex items-center gap-5"
                      >
                        {user?._id === review.user._id && (
                          <span className="flex gap-2">
                            <Pencil
                              className="w-5 h-5 text-orange-500 cursor-pointer"
                              onClick={() => handleEditReview(review)}
                            />
                            <Trash
                              className="w-5 h-5 text-red-500 cursor-pointer"
                              onClick={() => handleDeleteReview(review._id)}
                            />
                          </span>
                        )}
                      </Typography>
                    </div>
                    {review.comment && (
                      <Typography className="text-gray-800 text-sm leading-relaxed">
                        {review.comment}
                      </Typography>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Typography className="text-gray-500">
            No reviews yet. Be the first to review!
          </Typography>
        )}
      </div>
    </div>
  );
}
