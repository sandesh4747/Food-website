import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getLatestProducts,
  getMostReviewedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  getSingleProduct,
  getTopRatedProducts,
  toggleFeaturedProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { adminRoute, optionalAuth, protect } from "../middleware/protect.js";
import { upload } from "../utils/upload.js";

const router = express.Router();
router.get("/", getAllProducts);

router.post(
  "/create",
  upload.array("images"),
  protect,
  adminRoute,
  createProduct
);

router.get("/category/:productId", getProductsByCategory);
router.get("/featured-products", getFeaturedProducts);
router.get("/latest-products", getLatestProducts);
router.get("/top-rated-products", getTopRatedProducts);
router.get("/most-reviewed-products", getMostReviewedProducts);
router.get("/recommendations", getRecommendedProducts);

router.patch("/toggle/:id", protect, adminRoute, toggleFeaturedProduct);

router.get("/:id", optionalAuth, getSingleProduct);
router.patch(
  "/update/:id",
  upload.array("images"),
  protect,
  adminRoute,
  updateProduct
);
router.delete("/delete/:id", protect, adminRoute, deleteProduct);

export default router;
