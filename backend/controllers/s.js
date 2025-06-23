import Stripe from "stripe";
import { Coupon } from "../models/coupon.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Helper function to generate random coupon code
function generateCouponCode() {
  return "DISC" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

// ✅ CREATE CHECKOUT SESSION + STORE COUPON IN URL
export const createCheckoutSession = async (req, res) => {
  try {
    const { amount, userId, generateCoupon = false } = req.body;

    let couponCode;
    if (generateCoupon) {
      couponCode = generateCouponCode();
      await Coupon.create({
        code: couponCode,
        discountType: "percentage",
        discountAmount: 10,
        minOrderAmount: amount / 2,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdBy: userId,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "npr",
            product_data: {
              name: "Your Order",
            },
            unit_amount: Math.round(amount * 10), // Amount in piasa
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/payment-success?coupon=${
        couponCode || ""
      }`,
      cancel_url: "http://localhost:5173/cart",
    });

    res.status(200).json({ success: true, url: session.url });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Checkout failed",
      error: err.message,
    });
  }
};
