import React from "react";
import img from "../assets/carousel-2.png";
import { BreadcrumbsWithIcon } from "./BreadCrumbs";
import { motion } from "framer-motion";
import { useGetAllProuductsQuery } from "./api/productApi";
import ReviewComponent from "./ReviewComponent";
import { Typography } from "@material-tailwind/react";

export default function Products() {
  const { data, isLoading } = useGetAllProuductsQuery();

  const breadcrumbs = [
    { path: "/", label: "Home" },
    {
      path: "/products",
      label: "Products",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen pb-[20%]">
      {/* Banner */}
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
            ALL PRODUCTS
          </motion.p>

          <div className="w-40 h-0.5 bg-red-600 rounded-full"></div>

          <div>
            <BreadcrumbsWithIcon links={breadcrumbs} />
          </div>
        </div>
      </div>

      <div className="px-20">
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl font-medium mb-8 border-b-2 border-red-600 inline-flex items-center w-20"
        >
          PRODUCTS
        </motion.p>

        {/* Products grid with staggered animations */}
        {isLoading ? (
          <Typography className="text-center py-10 text-lg font-medium">
            Loading featured products...
          </Typography>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {data?.products?.map((product) => (
              <motion.div key={product._id} variants={cardVariants}>
                <ReviewComponent product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
