import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

// Create a new order

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("items.product")
      .populate("user", "name");
    res.status(200).json(orders);
  } catch (error) {
    // console.log(error);
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

// export const createOrder = async (req, res) => {
//   try {
//     const { items, shippingAddress, paymentMethod } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items in order" });
//     }

//     let totalItems = 0;
//     let totalAmount = 0;

//     // Calculate totals and validate items
//     for (const item of items) {
//       const product = await Product.findById(item.product);
//       if (!product) {
//         return res.status(404).json({ message: "Product not found" });
//       }

//       totalItems += item.quantity;
//       totalAmount += item.quantity * item.price;
//     }

//     const order = await Order.create({
//       user: req.user._id,
//       items,
//       shippingAddress,
//       payment: {
//         method: paymentMethod || "COD",
//         status: paymentMethod === "COD" ? "Pending" : "Pending", // Initial status
//       },
//       totalItems,
//       totalAmount,
//     });

//     res.status(201).json(order);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to create order", error: error.message });
//   }
// };

// Get orders of the logged-in user

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    let totalItems = 0;
    let totalAmount = 0;
    const orderItems = [];

    // Calculate totals and validate items
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Prepare order item with product details
      orderItems.push({
        product: item.product,
        name: product.name,
        image: product.image,
        quantity: item.quantity,
        price: item.price,
      });

      totalItems += item.quantity;
      totalAmount += item.quantity * item.price;
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      payment: {
        method: paymentMethod || "COD",
        status: paymentMethod === "COD" ? "Pending" : "Pending",
      },
      totalItems,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product shippingAddress"
    );
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

// Update payment status (e.g. after Stripe/PayPal success)
export const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentId, status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.payment.status = status;
    order.payment.paymentId = paymentId;
    if (status === "Paid") {
      order.payment.paidAt = new Date();
    }

    await order.save();
    res.status(200).json({ message: "Payment status updated", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update payment", error: error.message });
  }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = status;

    if (status === "Delivered") {
      order.deliveredAt = new Date();
    }

    if (status === "Cancelled") {
      order.cancelledAt = new Date();
    }

    await order.save();
    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update status", error: error.message });
  }
};
