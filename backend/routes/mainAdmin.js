import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const router = express.Router();

// ------------------------
// Main Admin Signup
// ------------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirm } = req.body;

    if (!name || !email || !password || !confirm) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirm) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "Admin already exists" });

    // Do NOT hash again, model pre-save will handle it
    const admin = new Admin({ name, email, password });
    await admin.save();

    res.status(201).json({ success: true, message: "Main Admin registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ------------------------
// Main Admin Signin
// ------------------------
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ success: false, message: "Admin not found" });

    // Use the model method to compare password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid password" });

    const token = jwt.sign(
      { id: admin._id, role: "main-admin" },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Main Admin login successful",
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "main-admin",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
