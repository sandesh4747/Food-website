import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  updatePaymentStatus,
} from "../controllers/order.controller.js";
import { adminRoute, protect } from "../middleware/protect.js";

const router = express.Router();

router.get("/", protect, adminRoute, getOrders);
router.post("/create", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.patch("/:orderId/payment", protect, updatePaymentStatus);
router.patch("/:orderId/status", protect, updateOrderStatus);

export default router;
