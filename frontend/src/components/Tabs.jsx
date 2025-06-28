import React, { useState } from "react";
import { useFeaturedProductsQuery } from "./api/productApi";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Rating } from "@material-tailwind/react";
import { useAddCartMutation } from "./api/cartApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { useSelector } from "react-redux";

export default function Tabs() {
  const navigation = useNavigate();
  const { user } = useSelector((state) => state.authSlice);

  const { handleAddToCart, isLoading } = useCart();
  const { data } = useFeaturedProductsQuery();
  const products = data?.products || [];
  // console.log(products);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Fruits", "Vegetables", "Dairy", "FastFoods"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="pt-10   mb-25">
      {/* Tabs */}
      <div className="mb-12">
        <ul className="flex flex-wrap justify-center gap-6 border-b border-gray-200">
          {categories.map((category) => (
            <li
              key={category}
              className={`pb-4 px-1 text-lg font-medium capitalize cursor-pointer transition-all duration-200 ${
                selectedCategory === category
                  ? "text-[#d62839] border-b-2 border-[#d62839]"
                  : "text-gray-600 hover:text-[#d62839]"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Product Cards */}
      <div className="mt-6 max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-96"
          >
            <p className="text-gray-500 text-lg">
              No products available in this category.
            </p>
            <button
              className="mt-4 px-6 py-2 text-white rounded-lg bg-[#d62838] hover:bg-[#b51e2e] transition-all"
              onClick={() => setSelectedCategory("All")}
            >
              View All Products
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr"
            >
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group cursor-pointer"
                  onClick={() => navigation(`/productDetails/${product._id}`)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-300/30 rounded-md px-3 py-2 bg-white w-full h-full flex flex-col justify-between"
                  >
                    {/* Image */}
                    <div className="group cursor-pointer flex items-center justify-center px-2 relative p-4">
                      {product.discount > 0 && (
                        <span className="absolute top-3 right-3 bg-[#d62839] text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{product.discount}%
                        </span>
                      )}
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="group-hover:scale-105 transition max-w-24 md:max-w-36"
                      />
                    </div>

                    {/* Info */}
                    <div className="text-gray-500/60 text-sm mt-2 flex-1 flex flex-col justify-between">
                      <div>
                        <p>{product.category}</p>
                        <p className="text-gray-700 font-medium text-lg truncate w-full">
                          {product.name}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-0.5 mt-1">
                          <Rating
                            value={Math.round(product.avgRating || 0)}
                            readOnly
                            className="pointer-events-none text-yellow-400 flex"
                          />
                          <p className="text-xs ml-1">
                            ({product.reviews?.length || 0})
                          </p>
                        </div>
                      </div>

                      {/* Price + Add */}
                      <div className="flex items-end justify-between mt-4">
                        <p className="text-base font-medium text-gray-800">
                          Rs.{" "}
                          {product.discount > 0
                            ? (
                                product.price *
                                (1 - product.discount / 100)
                              ).toFixed(2)
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
                            if (user?.role !== "admin")
                              handleAddToCart(product._id);
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
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
