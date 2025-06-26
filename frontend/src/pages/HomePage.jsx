import React from "react";
import Navbar from "./Navbar";
import MainBanner from "../components/MainBanner";
import CategoriesList from "../components/CategoriesList";
import Featured from "../components/Featured";
import Blog from "../components/Blog";
import { TestimonialSlider } from "../components/Testimonial";

export default function HomePage() {
  return (
    <div className="mt-10 space-y-16">
      <div data-aos="fade-up">
        <MainBanner />
      </div>

      <div data-aos="fade-up" data-aos-delay="200">
        <CategoriesList />
      </div>

      <div data-aos="fade-up" data-aos-delay="400">
        <Featured />
      </div>

      <div data-aos="fade-up" data-aos-delay="600">
        <TestimonialSlider />
      </div>

      <div data-aos="fade-up" data-aos-delay="800">
        <Blog />
      </div>
    </div>
  );
}
