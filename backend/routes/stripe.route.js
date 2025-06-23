import express from "express";
import {
  checkoutSuccess,
  createCheckoutSession,
} from "../controllers/Stripe.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/create-checkout-session", protect, createCheckoutSession);
router.post("/checkout-success", protect, checkoutSuccess);
export default router;
