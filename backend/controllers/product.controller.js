import { Product } from "../models/product.model.js";
import { cloudinary } from "../utils/cloudinary.js";
import { upload } from "../utils/upload.js";

export const getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search ? { name: { $regex: search, $options: "i" } } : {}; // i for case-insensitive

    const products = await Product.find(query).populate("reviews");
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error in getAllProducts function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, isFeatured } = req.body;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required" });
    }

    const imageUrls = req.files.map((file) => file.path); // ✅ already uploaded
    const imagePublicIds = req.files.map((file) => file.filename); // ✅ Cloudinary public ID

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      isFeatured,
      image: imageUrls,
      imagePublicIds,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.log("Error in createProduct function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "name email avatar",
      },
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const userId = req.user?._id?.toString(); // Ensure string comparison

    if (userId) {
      // Get ALL reviews from this user (not just first one)
      const userReviews = product.reviews.filter(
        (review) => review.user?._id.toString() === userId
      );

      // Get other reviews
      const otherReviews = product.reviews.filter(
        (review) => review.user?._id.toString() !== userId
      );

      // Combine with user reviews first
      product.reviews = [...userReviews, ...otherReviews];
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error in getSingleProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    const updateData = { ...req.body };
    console.log(updateData);

    // If new images are uploaded
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary if public IDs exist
      if (product.imagePublicIds && product.imagePublicIds.length > 0) {
        await Promise.all(
          product.imagePublicIds.map((publicId) =>
            cloudinary.uploader.destroy(publicId)
          )
        );
      }
      // upload new images to cloudinary
      const uploads = await Promise.all(
        req.files.map((file) =>
          cloudinary.uploader.upload(file.path, { folder: "products" })
        )
      );

      updateData.image = uploads.map((img) => img.secure_url);
      updateData.imagePublicIds = uploads.map((img) => img.public_id);
    }
    // update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.log("Error in updateProduct function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Delete images from Cloudinary if public IDs exist
    if (product.imagePublicIds && product.imagePublicIds.length > 0) {
      await Promise.all(
        product.imagePublicIds.map((publicId) =>
          cloudinary.uploader.destroy(publicId)
        )
      );
    }
    // Delete product from DB
    await product.deleteOne();

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error in deleteProduct function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { productId } = req.params; // e.g., ?category=fastfood
    // console.log(productId);
    const products = await Product.find({ category: productId }).populate(
      "reviews"
    );
    res.status(200).json({ success: true, products });
    // console.log(products);
  } catch (error) {
    console.log("Error in getProductsByCategory function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const { productId } = req.query; // e.g., ?category=fastfood
    const filter = { isFeatured: true };
    if (productId) {
      filter.productId = productId;
    }
    const featuredProducts = await Product.find(filter).populate("reviews");
    res.status(200).json({ success: true, products: featuredProducts });
  } catch (error) {
    console.log("Error in getFeaturedProducts function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    product.isFeatured = !product.isFeatured;
    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Error in toggleFeaturedProduct function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLatestProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(9);
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error in getLatestProducts function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTopRatedProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ avgRating: -1 }).limit(9);
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error in getTopRatedProducts function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMostReviewedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $addFields: {
          reviewCount: { $size: "$reviews" }, // Add a field with review count
        },
      },
      { $sort: { reviewCount: -1 } }, // Sort by the new field
      { $limit: 9 },
    ]);

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error in getMostReviewedProducts function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          category: 1,
          stock: 1,
          image: 1,
        },
      },
    ]);
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error in getRecommendedProducts function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
