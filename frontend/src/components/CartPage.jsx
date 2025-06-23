import React from "react";
import { useGetCartQuery } from "./api/cartApi";
import { BreadcrumbsWithIcon } from "./BreadCrumbs";
import { motion } from "framer-motion";
import img from "../assets/carousel-2.png";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

export default function CartPage() {
  const { data, isLoading } = useGetCartQuery();
  const cart = data?.cart;
  // console.log(cart);

  const breadcrumbs = [
    { path: "/", label: "Home" },
    {
      path: "/cart",
      label: "Cart",
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen">
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
            CART
          </motion.p>

          <div className="w-20 h-0.5 bg-red-600 rounded-full"></div>

          <div>
            <BreadcrumbsWithIcon links={breadcrumbs} />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl font-medium mb-8 border-b-2 border-red-600 inline-flex items-center w-10"
        >
          CART
        </motion.p>

        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          {cart?.length === 0 ? (
            <EmptyCartUI />
          ) : (
            <div className="mt-6 sm:mt-8 lg:flex md:gap-6 lg:gap-8 xl:gap-10 mb-40">
              <motion.div
                className="lg:w-2/3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="space-y-6">
                  {cart?.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                </div>
              </motion.div>{" "}
              <motion.div
                className="lg:w-1/3 mt-6 lg:mt-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <OrderSummary cart={cart} />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4  pb-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="h-24 w-24 text-gray-300" />
    <h3 className="text-2xl font-semibold ">Your cart is empty</h3>
    <p className="text-gray-400">
      Looks like you {"haven't"} added anything to your cart yet.
    </p>
    <Link
      className="mt-4 rounded-md  px-6 py-2 text-white transition-colors hover:bg-red-600 bg-red-500"
      to="/"
    >
      Start Shopping
    </Link>
  </motion.div>
);
