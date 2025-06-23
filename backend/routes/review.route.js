import express from "express";
import { protect } from "../middleware/protect.js";

import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewsByProduct,
  updateReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", getAllReviews);
router.post("/create", protect, createReview);
router.patch("/update/:id", protect, updateReview);
router.get("/:productId", getReviewsByProduct);
router.delete("/delete/:id", protect, deleteReview);

export default router;
