import React from "react";
import carousel1 from "../assets/carousel-1.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MainBanner() {
  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen">
      <img
        src={carousel1}
        alt="Main Banner"
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Overlay Content */}
      <div className="absolute top-1/4 left-4 sm:left-8 md:left-16 text-black max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight text-start mb-6"
        >
          Organic Food Is Good For Health
        </motion.h1>

        <div className="flex space-x-3 sm:space-x-6 mt-5">
          <Link
            to="/products"
            className="bg-emerald-500 text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-12 lg:py-4 rounded-full hover:bg-emerald-600 transition-all text-sm sm:text-md font-semibold sm:text-lg"
          >
            Products
          </Link>
          <Link
            to="/services"
            className="bg-red-500 text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-12 lg:py-4 rounded-full hover:bg-red-600 transition-all text-sm sm:text-md font-semibold sm:text-lg"
          >
            Services
          </Link>
        </div>
      </div>
    </div>
  );
}
