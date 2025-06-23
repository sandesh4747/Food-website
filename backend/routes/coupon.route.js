import express from "express";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";
import { protect } from "../middleware/protect.js";
const router = express.Router();

router.get("/", protect, getCoupon);
router.post("/validate", protect, validateCoupon);

export default router;
