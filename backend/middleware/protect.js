import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - user not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protect middleware", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Access denied - Admin only" });
  }
};

// authMiddleware.js
export const optionalAuth = async (req, res, next) => {
  const token = req.cookies.token; // Get token from HTTP-only cookie

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      // At this point, req.user is available if token was valid
    } catch (error) {
      console.log("Invalid token - proceeding as guest");
      // req.user remains undefined
    }
  }
  next(); // Continue to controller
};
