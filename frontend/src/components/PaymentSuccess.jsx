import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { setCoupon } from "../store/cartSlice";

import { usePaymentSuccessMutation } from "./api/paymentApi";
import { useClearCartMutation } from "./api/cartApi";

export default function PaymentSuccess() {
  const { user } = useSelector((state) => state.authSlice);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orderId, setOrderId] = useState("");
  const [couponCode, setCouponCode] = useState("");

  // RTK Query mutation to confirm payment success
  const [paymentSuccess, { isLoading, error }] = usePaymentSuccessMutation();

  const [clearCart] = useClearCartMutation();

  // Get session_id from URL
  const sessionId = searchParams.get("session_id");
  // console.log(sessionId);

  useEffect(() => {
    if (!sessionId) return;

    const fetchOrderDetails = async () => {
      try {
        const res = await paymentSuccess({ sessionId }).unwrap();
        console.log("Payment success response:", res);

        if (res.success) {
          setOrderId(res.orderId);
          if (res.couponCode) {
            setCouponCode(res.couponCode);
            dispatch(setCoupon(res.couponCode));
          }

          if (user?._id) {
            console.log("Attempting to clear cart for user:", user._id);
            const clearResponse = await clearCart({
              userId: user._id,
            }).unwrap();
            console.log("Cart clear response:", clearResponse);
          }
        }
      } catch (err) {
        console.error("Error in fetchOrderDetails:", err);
      }
    };

    fetchOrderDetails();
  }, [sessionId, paymentSuccess, dispatch, clearCart, user?._id]);

  const handleRedirect = async () => {
    try {
      // await clearCart({ userId: user?._id }).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 space-y-4">
      <h1 className="text-2xl font-bold text-green-600">
        🎉 Payment Successful!
      </h1>

      {isLoading && <p>Loading order details...</p>}
      {error && <p className="text-red-600">Error loading order info.</p>}

      {orderId && (
        <p className="text-gray-700 text-lg">
          Your Order ID: <strong>{orderId}</strong>
        </p>
      )}

      <button
        onClick={handleRedirect}
        className="mt-4 rounded-lg bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700"
      >
        Return To Home
      </button>
    </div>
  );
}
