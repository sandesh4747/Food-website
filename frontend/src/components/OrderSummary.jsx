import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CouponInput from "./CouponInput";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { usePaymentMutation } from "./api/paymentApi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useGetCouponQuery } from "./api/couponApi";
import { setCoupon } from "../store/cartSlice";

const stripePromise = loadStripe(
  "pk_test_51RV4FyQDZjUPUu70fLRmW6lqgkgb5CoeajhHojmvTII2S6aayakW68e9SI0XGD1nPDhVxLvfHzUnqPwuFYNHJlBK00TIaRLm4s"
);

export default function OrderSummary({ cart = [] }) {
  const [paymentMutation, { isLoading }] = usePaymentMutation();
  const { data } = useGetCouponQuery();
  const dispatch = useDispatch();
  // console.log(data);

  const subtotal = cart.map((item) => item.product?.price * item.quantity);

  const calcSubtotal = subtotal.reduce((sum, item) => sum + item, 0);

  let total = calcSubtotal;
  const discount = data?.discountPercentage || 0;
  total = calcSubtotal - data?.discountPercentage || calcSubtotal;

  useEffect(() => {
    if (data?.code) {
      dispatch(setCoupon(data.code));
    }
  }, [data, dispatch]);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await paymentMutation({
      products: cart,
      couponCode: data ? data?.code : null,
    }).unwrap();
    // dispatch(setCoupon(null));

    const sessionId = res.id;
    const result = await stripe.redirectToCheckout({
      sessionId,
    });

    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  const savings = calcSubtotal - total;

  const formattedCalcSubtotal = calcSubtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 rounded-lg border border-orange-800 bg-gray-900 p-4 shadow-lg shadow-orange-900/20 sm:p-6"
    >
      <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
        Order Summary
      </p>

      <div className="space-y-4">
        <div className="space-y-3">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-medium text-orange-200">
              Original Price
            </dt>
            <dd className="text-base font-semibold text-white">
              Rs. {formattedCalcSubtotal}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-medium text-orange-200">Savings</dt>
              <dd className="text-base font-semibold text-green-400">
                -Rs. {formattedSavings}
              </dd>
            </dl>
          )}

          {data && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-medium text-orange-200">
                Coupon ({data?.code})
              </dt>
              <dd className="text-base font-semibold text-red-400">
                -Rs. {discount.toFixed(2)}
              </dd>
            </dl>
          )}
        </div>

        <CouponInput calcSubtotal={calcSubtotal} />

        <div className="border-t border-orange-800 pt-4">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-lg font-bold text-orange-300">Total</dt>
            <dd className="text-lg font-extrabold text-white">
              Rs. {formattedTotal}
            </dd>
          </dl>
        </div>

        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          {isLoading ? "Processing..." : "Proceed to Checkout"}
        </motion.button>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
