import React from "react";
import { Rating } from "@material-tailwind/react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./hooks/useCart";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function ReviewComponent({ product }) {
  const navigation = useNavigate();
  const { handleAddToCart } = useCart();
  const { user } = useSelector((state) => state.authSlice);

  const handleCardClick = () => {
    setTimeout(() => navigation(`/productDetails/${product._id}`), 400);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="shadow-lg hover:shadow-2xl group cursor-pointer border border-gray-300/30 rounded-md px-3 py-2 bg-white w-full h-full flex flex-col justify-between "
    >
      {/* Image Section */}
      <div className="relative flex justify-center items-center px-2 p-4">
        {product.discount > 0 && (
          <span className="absolute top-3 right-3 bg-[#d62839] text-white text-xs font-bold px-2 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
        <img
          src={product.image[0]}
          alt={product.name}
          className="group-hover:scale-105 transition max-w-24 md:max-w-36"
          loading="lazy"
        />
      </div>

      {/* Info Section */}
      <div className="text-gray-500/60 text-sm mt-2 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-center text-gray-700 font-medium text-lg truncate">
            {product.name}
          </p>

          {/* Rating */}
          <div className="flex justify-center items-center gap-1 mt-1">
            <Rating
              value={Math.round(product.rating || 0)}
              readOnly
              className="pointer-events-none text-yellow-400 flex"
            />
            <p className="text-xs ml-1 text-gray-600">
              ({product.reviewCount || 0})
            </p>
          </div>

          {/* Stock */}
          <p className="text-center text-gray-600 mt-2">
            {product.stock} in stock
          </p>
        </div>

        {/* Price + Add */}
        <div className="flex items-end justify-between mt-4">
          <p className="text-base font-medium text-gray-800">
            Rs.{" "}
            {product.discount > 0
              ? (product.price * (1 - product.discount / 100)).toFixed(2)
              : product.price}
            {product.discount > 0 && (
              <span className="text-xs text-gray-500 line-through ml-1">
                Rs. {product.price}
              </span>
            )}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (user?.role !== "admin") handleAddToCart(product._id);
            }}
            disabled={user?.role === "admin"}
            className={`flex items-center gap-1  w-16 h-[34px] rounded text-white font-medium justify-center hover:opacity-90 transition-all ${
              user?.role === "admin"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#d62839] to-[#f77f00]"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
