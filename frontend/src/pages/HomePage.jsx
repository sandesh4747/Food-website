import React from "react";
import Navbar from "./Navbar";
import MainBanner from "../components/MainBanner";
import CategoriesList from "../components/CategoriesList";
import Featured from "../components/Featured";
import Blog from "../components/Blog";
import { TestimonialSlider } from "../components/Testimonial";

export default function HomePage() {
  return (
    <div className="mt-10">
      <MainBanner />
      <CategoriesList />
      <Featured />
      <TestimonialSlider />

      <Blog />
    </div>
  );
}
