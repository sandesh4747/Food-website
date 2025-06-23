import express from "express";
import {
  changePassword,
  checkAuth,
  deleteAccount,
  forgotPassword,
  getAllUsers,
  login,
  logout,
  resetPassword,
  signup,
  updateProfile,
  updateUserRole,
  verifyEmail,
} from "../controllers/auth.controller.js";

import { adminRoute, protect } from "../middleware/protect.js";

import { upload } from "../utils/upload.js";

const router = express.Router();

// Authentication routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// password management routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.patch("/change-password", protect, changePassword);

//user profile routes
router.get("/check-auth", protect, checkAuth);
router.patch("/profile", protect, upload.single("avatar"), updateProfile);
router.delete("/delete-account", protect, deleteAccount);

// email verification routes
router.post("/verify-email", verifyEmail);

//Admin-only routes
router.get("/users", protect, adminRoute, getAllUsers);
router.patch("/users/:userId/role", protect, adminRoute, updateUserRole);

export default router;
