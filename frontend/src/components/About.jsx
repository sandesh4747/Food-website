import { ShoppingBasket, Leaf, Wheat, Milk, Cake, Truck } from "lucide-react";

import farm from "../assets/carousel-3.png";
import img from "../assets/carousel-2.png";
import { motion } from "framer-motion";
import { BreadcrumbsWithIcon } from "./BreadCrumbs";

export default function AboutPage() {
  const breadcrumbs = [
    { path: "/", label: "Home" },
    {
      path: "/about",
      label: "About",
    },
  ];
  return (
    <div>
      <div className="h-90 w-full overflow-hidden mb-20 relative">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          src={img}
          alt="logo"
          className="w-full max-h-220 object-cover object-[0_50%]"
          loading="lazy"
        />
        <div className="absolute top-[40%] sm:top-[50%] left-[5%] transform -translate-y-1/2 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
          >
            ABOUT
          </motion.p>

          <div className="w-40 h-0.5 bg-red-600 rounded-full"></div>

          <div>
            <BreadcrumbsWithIcon links={breadcrumbs} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 ">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-orange-800 mb-4">
            Fresh from Farm to Your Doorstep
          </h1>
          <p className="text-lg text-orange-700 max-w-2xl mx-auto">
            Your trusted source for farm-fresh fruits, vegetables, dairy, and
            more
          </p>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <Leaf className="w-10 h-10 text-green-600" />,
              title: "Fruits & Vegetables",
              desc: "100% organic, pesticide-free",
            },
            {
              icon: <Cake className="w-10 h-10 text-orange-600" />,
              title: "Bakery Items",
              desc: "Freshly baked daily",
            },
            {
              icon: <Milk className="w-10 h-10 text-red-600" />,
              title: "Dairy Products",
              desc: "From local trusted farms",
            },
            {
              icon: <ShoppingBasket className="w-10 h-10 text-green-600" />,
              title: "Cold Drinks",
              desc: "Natural & healthy options",
            },
            {
              icon: <Wheat className="w-10 h-10 text-orange-600" />,
              title: "Pantry Staples",
              desc: "Premium quality grains",
            },
            {
              icon: <Truck className="w-10 h-10 text-red-600" />,
              title: "2-Hour Delivery",
              desc: "Always fresh and on time",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-orange-50 p-6 rounded-lg border border-orange-100 hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-orange-900 text-center mb-2">
                {item.title}
              </h3>
              <p className="text-orange-700 text-center">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Farm Story */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-orange-800 mb-6">
            Our Farm Promise
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-orange-800 mb-4">
                At GreenCart, we partner directly with{" "}
                <strong>50+ local farms</strong> to bring you the freshest
                produce harvested at peak ripeness.
              </p>
              <ul className="space-y-3 text-orange-700 mb-4">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Daily morning harvests delivered same day</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>No artificial preservatives or wax coatings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Ethically sourced from sustainable farms</span>
                </li>
              </ul>
            </div>
            <div className="h-64 bg-green-100 rounded-lg overflow-hidden flex items-center justify-center text-green-600">
              <img src={farm} alt="Farm Fresh Produce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
