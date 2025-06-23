import React from "react";
import {
  useCategoryProductsQuery,
  useFeaturedProductsQuery,
} from "./api/productApi";
import { useParams } from "react-router-dom";
import { categories } from "./CategoriesList";
import ReviewComponent from "./ReviewComponent";
import { Typography } from "@material-tailwind/react";
import img from "../assets/carousel-2.png";
import { BreadcrumbsWithIcon } from "./BreadCrumbs";
import { motion } from "framer-motion";

// Variants for scroll-based animation
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

export default function FeaturedProducts() {
  // const { data, isLoading, error } = useFeaturedProductsQuery();
  const { productId } = useParams();

  const { data, isLoading, error } = useCategoryProductsQuery(productId);

  const products = data?.products;

  const filteredProducts = products?.filter(
    (product) => product.category.toLowerCase() === productId
  );

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === productId
  );

  const breadcrumbs = [
    { path: "/", label: "Home" },
    {
      path: `/product/category/${productId}`,
      label: searchCategory?.text || `${productId}`,
    },
  ];

  return (
    <div className="min-h-screen pb-[20%]">
      {/* Banner */}
      <div className="h-120 w-full overflow-hidden mb-20 relative">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          src={img}
          alt="logo"
          className="w-full max-h-220 object-cover object-[0_20%]"
          loading="lazy"
        />
        <div className="absolute top-[40%] sm:top-[50%] left-[5%] transform -translate-y-1/2 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
          >
            <div className="uppercase">
              {searchCategory?.text || `${productId}`} Section
            </div>
          </motion.p>

          <div className="w-[40%] h-0.5 bg-red-600 rounded-full"></div>

          <div>
            <BreadcrumbsWithIcon links={breadcrumbs} />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-10">
        {searchCategory && (
          <div className="mb-8">
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl font-medium"
            >
              {searchCategory.text.toUpperCase()}
            </motion.p>
            <div className="w-16 h-0.5 bg-red-600 rounded-full" />
          </div>
        )}

        {isLoading ? (
          <Typography className="text-center py-10 text-lg font-medium">
            Loading featured products...
          </Typography>
        ) : filteredProducts?.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {filteredProducts.map((product) => (
              <motion.div key={product._id} variants={cardVariants}>
                <ReviewComponent product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Typography className="text-center py-10">
            No products found this category.
          </Typography>
        )}
      </div>
    </div>
  );
}
