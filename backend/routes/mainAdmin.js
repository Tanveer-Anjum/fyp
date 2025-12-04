import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Changed from Admin to User

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

    const existing = await User.findOne({ email }); // Changed Admin.findOne to User.findOne
    if (existing) return res.status(400).json({ success: false, message: "User with this email already exists" }); // Changed message

    // The User model's pre-save hook will handle password hashing
    const user = new User({ fullName: name, email, password, role: "admin" }); // Use fullName instead of name
    await user.save();

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

    const user = await User.findOne({ email }); // Changed Admin.findOne to User.findOne
    if (!user || user.role !== "admin") return res.status(400).json({ success: false, message: "Admin not found or not an admin role" }); // Changed admin to user, added role check

    // Use bcrypt.compare directly, as matchPassword was part of the old Admin model
    const isMatch = await user.matchPassword(password); // Changed to use user.matchPassword
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: "admin", fullName: user.fullName }, // Add fullName to JWT payload
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Main Admin login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName, // Ensure fullName is returned
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
