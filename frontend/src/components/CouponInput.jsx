import React, { useEffect, useState } from "react";
import { useApplyCouponMutation } from "./api/couponApi";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCoupon } from "../store/cartSlice";
import toast from "react-hot-toast";

export default function CouponInput({ calcSubtotal }) {
  const { coupon } = useSelector((state) => state.cartSlice);
  // console.log(coupon);
  const [couponCode, setCouponCode] = useState(coupon || "");
  const [applyCoupon, { isLoading }] = useApplyCouponMutation();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (coupon) {
      setCouponCode(coupon);
    }
  }, [coupon]);

  const handleApplyCoupon = async () => {
    try {
      const response = await applyCoupon({
        code: couponCode,
        orderAmount: calcSubtotal,
      }).unwrap();
      dispatch(setCoupon(response?.code));
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to apply coupon");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4 w-full"
    >
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          placeholder="Enter coupon code"
          className="w-full rounded-md border border-orange-300 bg-gray-800 px-3 py-2 text-white placeholder-orange-200 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
        />
        <button
          onClick={handleApplyCoupon}
          disabled={isLoading || !couponCode.trim()}
          className="w-full sm:w-auto rounded-md bg-gradient-to-r from-red-600 to-orange-500 px-4 py-2 font-medium text-white shadow-md hover:from-red-700 hover:to-orange-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed disabled:opacity-70 whitespace-nowrap"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Applying...
            </span>
          ) : (
            "Apply Coupon"
          )}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm font-medium text-red-400 flex items-start">
          <AlertCircle className="mr-1.5 mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </motion.div>
  );
}
