import express from "express";
import { protect } from "../middleware/protect.js";
import {
  createAddress,
  deleteAddress,
  getAddressById,
  getUserAddresses,
  upadateAddress,
} from "../controllers/address.controller.js";

const router = express.Router();

router.post("/create", protect, createAddress);
router.get("/", protect, getUserAddresses);
router.get("/:id", protect, getAddressById);
router.patch("/update/:id", protect, upadateAddress);
router.delete("/delete/:id", protect, deleteAddress);

export default router;
