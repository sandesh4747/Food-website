import React from "react";
import organicVegetable from "../assets/organic_vegetable.png";
import freshFruit from "../assets/freshFruit.png";
import grains from "../assets/grains.png";
import instantNoodle from "../assets/instantNoodle.png";
import dairyProduct from "../assets/dairyProduct.png";
import coldDrinks from "../assets/coldDrinks.png";
import bakery from "../assets/bakery.png";

import { useNavigate } from "react-router-dom";

export const categories = [
  {
    text: "Organic veggies",
    path: "vegetables",
    image: organicVegetable,
    bgColor: "#FEF6DA",
  },
  {
    text: "Fresh Fruits",
    path: "fruits",
    image: freshFruit,
    bgColor: "#FEE0E0",
  },
  {
    text: "Cold Drinks",
    path: "drinks",
    image: coldDrinks,
    bgColor: "#F0F5DE",
  },
  {
    text: "Instant Food",
    path: "instant",
    image: instantNoodle,
    bgColor: "#E1F5EC",
  },
  {
    text: "Dairy Products",
    path: "dairy",
    image: dairyProduct,
    bgColor: "#FEE6CD",
  },
  {
    text: "Bakery & Breads",
    path: "bakery",
    image: bakery,
    bgColor: "#E0F6FE",
  },
  {
    text: "Grains & Cereals",
    path: "grains",
    image: grains,
    bgColor: "#F1E3F9",
  },
];

export default function CategoriesList() {
  const navigate = useNavigate();

  return (
    <div className="mt-16 px-20">
      <p className="text-4xl md:text-3xl font-bold">Categories</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 mt-6">
        {categories.map((category, i) => (
          <div
            onClick={() => navigate(`/product/category/${category.path}`)}
            key={i}
            className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
            style={{
              backgroundColor: category.bgColor,
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="w-32 h-32 object-cover group-hover:scale-108 transition-all max-w-28"
              loading="lazy"
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
