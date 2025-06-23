import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;

    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
    });
    // check if user already reviewed this product
    // const existing = await Review.findOne({ user: userId, product: productId });

    // if (existing) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You have already reviewed this product",
    //   });
    // }

    const product = await Product.findById(productId).populate("reviews");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    product.reviews.push(review);

    // Calculate average rating
    const avgRating =
      product.reviews.length > 0
        ? (
            product.reviews.reduce((acc, item) => acc + item.rating, 0) /
            product.reviews.length
          ).toFixed(1)
        : 0; // Set to 0 if no reviews

    // product.avgRating = avgRating;
    await product.save();

    res.status(201).json({ success: true, review });
  } catch (error) {
    console.log("Error in createReview function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// export const createReview = async (req, res) => {
//   try {
//     const { productId, rating, comment } = req.body;
//     const userId = req.user._id;

//     const review = await Review.create({
//       user: userId,
//       product: productId,
//       rating,
//       comment,
//     });

//     const isExist = await Product.findById(productId).populate("reviews");

//     if (!isExist) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     isExist.reviews.push(review);
//     const avgRating =
//       isExist.reviews.length > 0
//         ? (
//             product.reviews.reduce((acc, item) => acc + item.rating, 0) /
//             product.reviews.length
//           ).toFixed(1)
//         : 0;
//     console.log(avgRating);
//     isExist.avgRating = avgRating.toFixed(1);
//     await isExist.save();

//     res.status(201).json({ success: true, review });
//   } catch (error) {
//     console.log("Error in createReview function", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// get all reviews for a product

export const getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.log("Error in getReviewsByProduct function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    await review.deleteOne();
    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    console.log("Error in deleteReview function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name");
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.log("Error in getAllReviews function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { rating, comment, image } = req.body;
    const reviewId = req.params.id;

    const userId = req.user._id;

    // Find the review to update
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check if the user is the owner of the review
    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this review",
      });
    }

    // Update the review fields
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    if (image !== undefined) review.image = image;

    const updatedReview = await review.save();

    // Find the associated product to update its average rating
    const product = await Product.findById(review.product).populate("reviews");

    if (product) {
      // Recalculate average rating
      const avgRating =
        product.reviews.length > 0
          ? Number(
              (
                product.reviews.reduce((acc, item) => acc + item.rating, 0) /
                product.reviews.length
              ).toFixed(1)
            )
          : 0;

      product.avgRating = avgRating;
      await product.save();
    }

    res.status(200).json({
      success: true,
      review: updatedReview,
    });
  } catch (error) {
    console.log("Error in updateReview function", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
