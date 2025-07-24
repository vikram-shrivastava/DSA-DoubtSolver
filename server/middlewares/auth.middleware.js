import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
export const verifyToken = (req, res, next) => {
  try {
    // Try getting token from cookie or header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token middleware:", token);
    if (!token) {
      return res.status(401).json({ message: "Access token missing" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables.");
      return res.status(500).json({ message: "Internal server error" });
    }
    console.log("JWT Secret",process.env.JWT_SECRET)
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // Attach user ID to req.user
    req.user = { id: decoded.id };
    console.log("Decoded user:", req.user.id);
    console.log("user req:", req.user);
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
