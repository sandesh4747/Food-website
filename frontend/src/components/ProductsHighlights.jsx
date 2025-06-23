import React, { useState, useEffect } from "react";
import {
  useLatestProductsQuery,
  useMostReviewdProductsQuery,
  useTopRatedProductsQuery,
} from "./api/productApi";
import { Rating } from "@material-tailwind/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProductsHighlights() {
  const navigation = useNavigate();
  const {
    data: latestProducts,
    isLoading: isLatestLoading,
    error: latestError,
  } = useLatestProductsQuery();

  const {
    data: topRatedProducts,
    isLoading: isTopRatedLoading,
    error: topRatedError,
  } = useTopRatedProductsQuery();

  const {
    data: mostReviewedProducts,
    isLoading: isMostReviewedLoading,
    error: mostReviewedError,
  } = useMostReviewdProductsQuery();

  const [latestIndex, setLatestIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const [mostReviewedIndex, setMostReviewedIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setLatestIndex(
        (prev) => (prev + 1) % (latestProducts?.products?.length || 1)
      );
      setTopRatedIndex(
        (prev) => (prev + 1) % (topRatedProducts?.products?.length || 1)
      );
      setMostReviewedIndex(
        (prev) => (prev + 1) % (mostReviewedProducts?.products?.length || 1)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [latestProducts, topRatedProducts, mostReviewedProducts]);

  const showNext = (currentIndex, setIndex, products) => {
    setDirection(-1);
    setIndex((currentIndex + 1) % (products?.length || 1));
  };

  const showPrev = (currentIndex, setIndex, products) => {
    setDirection(1);
    setIndex(
      (currentIndex - 1 + (products?.length || 1)) % (products?.length || 1)
    );
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.8 },
    }),
  };

  const renderProducts = (products, currentIndex) => {
    const items = [];
    const length = products?.length || 0;

    // Always show exactly 3 products
    for (let i = 0; i < 3; i++) {
      const productIndex = (currentIndex + i) % length;
      const product = products?.[productIndex];
      if (product) {
        items.push(
          <div
            onClick={() => navigation(`/productDetails/${product._id}`)}
            key={`${product._id}-${i}`}
            className="flex gap-4 items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex-shrink-0">
              <img
                src={product.image[0]}
                alt={product.name}
                className="h-20 w-20 object-cover rounded"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium line-clamp-1">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold">
                  Rs.{" "}
                  {product.discount > 0
                    ? (product.price * (1 - product.discount / 100)).toFixed(2)
                    : product.price}
                </span>
                {product.discount > 0 && (
                  <span className="text-xs text-gray-500 line-through">
                    Rs. {product.price}
                  </span>
                )}
              </div>
              <Rating
                value={Math.round(product.avgRating || 0)}
                readOnly
                className="pointer-events-none text-yellow-400 flex mt-1"
              />
            </div>
          </div>
        );
      }
    }
    return items;
  };

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 flex-wrap">
        {/* Latest Products */}
        <div className="w-full lg:w-[30%]">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() =>
                showPrev(latestIndex, setLatestIndex, latestProducts?.products)
              }
              className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold text-center">Latest Products</h2>
            <button
              onClick={() =>
                showNext(latestIndex, setLatestIndex, latestProducts?.products)
              }
              className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={latestIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute top-0 left-0 right-0 space-y-4"
              >
                {renderProducts(latestProducts?.products, latestIndex)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Top Rated Products */}
        <div className="w-full lg:w-[30%]">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() =>
                showPrev(
                  topRatedIndex,
                  setTopRatedIndex,
                  topRatedProducts?.products
                )
              }
              className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold text-center">Top Rated</h2>
            <button
              onClick={() =>
                showNext(
                  topRatedIndex,
                  setTopRatedIndex,
                  topRatedProducts?.products
                )
              }
              className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={topRatedIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute top-0 left-0 right-0 space-y-4"
              >
                {renderProducts(topRatedProducts?.products, topRatedIndex)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Most Reviewed Products */}
        <div className="w-full lg:w-[30%]">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() =>
                showPrev(
                  mostReviewedIndex,
                  setMostReviewedIndex,
                  mostReviewedProducts?.products
                )
              }
              className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold text-center">Most Reviewed</h2>
            <button
              onClick={() =>
                showNext(
                  mostReviewedIndex,
                  setMostReviewedIndex,
                  mostReviewedProducts?.products
                )
              }
              className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={mostReviewedIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute top-0 left-0 right-0 space-y-4"
              >
                {renderProducts(
                  mostReviewedProducts?.products,
                  mostReviewedIndex
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
