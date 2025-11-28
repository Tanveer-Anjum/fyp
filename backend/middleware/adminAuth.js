import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

export const verifyAdminToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ success: false, message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    req.admin = admin;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};
