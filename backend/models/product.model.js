import mongoose from "mongoose";
import { Review } from "./review.model.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    discount: {
      type: Number,
      min: 0,
      default: 0,
    },
    image: {
      type: Array,
      required: [true, "Image is required"],
    },
    imagePublicIds: {
      type: [String], // To store Cloudinary public_ids
      default: [],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
    },

    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },

  { timestamps: true }
);

// productModel.js
productSchema.pre("save", async function (next) {
  if (this.isModified("reviews")) {
    const existingReviews = await Review.find({
      _id: { $in: this.reviews },
    });

    // Remove references to deleted reviews
    this.reviews = existingReviews.map((r) => r._id);

    // Recalculate avgRating
    this.avgRating =
      existingReviews.length > 0
        ? parseFloat(
            (
              existingReviews.reduce((acc, r) => acc + r.rating, 0) /
              existingReviews.length
            ).toFixed(1)
          )
        : 0;
  }
  next();
});
export const Product = mongoose.model("Product", productSchema);
