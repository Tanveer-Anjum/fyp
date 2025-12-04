import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Changed from Admin to User

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ success: false, message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(decoded.id).select("-password"); // Changed from Admin.findById to User.findById and variable to user
    if (!user || user.role !== "admin") return res.status(404).json({ success: false, message: "Admin not found or not an admin role" }); // Added role check

    req.user = user; // Changed req.admin to req.user
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
