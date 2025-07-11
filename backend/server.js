import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import reviewRoutes from "./routes/review.route.js";
import cartRoutes from "./routes/cart.route.js";
import addressRoutes from "./routes/address.route.js";
import orderRoutes from "./routes/order.route.js";
import stripeRoutes from "./routes/stripe.route.js";
import couponRoutes from "./routes/coupon.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();
app.use(
  cors({
    origin: process.env.CLIENT_URL || ["http://localhost:5173"],
    credentials: true,
  })
);

//ROutes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/stripe", stripeRoutes);
app.use("/api/v1/coupon", couponRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port: ${PORT}`);
});
