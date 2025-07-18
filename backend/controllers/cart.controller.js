//add to cart

import { User } from "../models/user.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const user = await User.findById(req.user._id);

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log("Error in addToCart function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get user cart

// export const getCart = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).populate("cart.product");
//     res.status(200).json({ success: true, cart: user.cart });
//   } catch (error) {
//     console.log("Error in getCart function", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const getCart = async (req, res) => {
  try {
    // Populate cart items and filter out deleted products
    const user = await User.findById(req.user._id).populate({
      path: "cart.product",
      match: { isDeleted: { $ne: true } }, // Only include non-deleted products
    });

    // Separate available and unavailable items
    const availableItems = user.cart.filter((item) => item.product !== null);
    const unavailableItems = user.cart.filter((item) => item.product === null);

    // Optionally: Clean up cart by removing deleted products
    if (unavailableItems.length > 0) {
      user.cart = availableItems;
      await user.save();
    }

    res.status(200).json({
      success: true,
      cart: availableItems,
      unavailableItems: unavailableItems.map((item) => ({
        _id: item._id,
        quantity: item.quantity,
        message: "This product is no longer available",
      })),
      message:
        unavailableItems.length > 0
          ? `Some items are no longer available`
          : undefined,
    });
  } catch (error) {
    console.error("Error in getCart function", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update cart

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);

    const item = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    item.quantity = quantity;
    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log("Error in updateCartItem function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    const updatedCart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );
    user.cart = updatedCart;
    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.log("Error in removeFromCart function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// clear cart
export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (error) {
    console.log("Error in clearCart function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
