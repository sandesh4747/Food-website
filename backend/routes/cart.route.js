import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cart.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/get", protect, getCart);
router.patch("/update", protect, updateCartItem);
router.delete("/remove", protect, removeFromCart);
router.delete("/clear", protect, clearCart);

export default router;
