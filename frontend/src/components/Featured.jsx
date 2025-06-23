import React from "react";
import Tabs from "./Tabs";
import ProductsHighlights from "./ProductsHighlights";
import banner1 from "../assets/banner-1.jpg";
import banner2 from "../assets/banner-2.jpg";

export default function Featured() {
  return (
    <div className="mt-16 px-4 md:px-8 lg:px-20">
      {" "}
      {/* Responsive padding */}
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-3xl md:text-4xl font-bold">Featured Products</h1>
        <div className="w-40 h-0.5 bg-[#d62839] text-center" />
      </div>
      <div>
        <Tabs />
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 mt-6">
          {" "}
          {/* Responsive flex direction */}
          <div className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-sm">
            <img
              src={banner1}
              alt="banner"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "484/229" }} // Maintain original aspect ratio
            />
          </div>
          <div className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-sm">
            <img
              src={banner2}
              alt="banner"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: "484/229" }} // Maintain original aspect ratio
            />
          </div>
        </div>
        <div className="mt-20">
          <ProductsHighlights />
        </div>
      </div>
    </div>
  );
}
