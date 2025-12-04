import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


import auth from "../middleware/auth.js";

const router = express.Router();




// ----------------------------
// BUYER SIGNUP
// ----------------------------
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User with this email already exists" });

    const user = new User({
      fullName,
      email,
      password,
      role: "buyer", // Explicitly set role as buyer
    });

    await user.save();
    res.status(201).json({ message: "Buyer registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------
// BUYER SIGNIN
// ----------------------------
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user || user.role !== "buyer") return res.status(400).json({ message: "User not found or not a buyer account" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: "buyer" },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role, // Explicitly include role
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});











/// Update profile (name & email only)
router.put("/update-profile", auth, async (req, res) => {
  try {
    const { fullName, email } = req.body;
    if (!fullName || !email) {
      return res.status(400).json({ success: false, message: "Full name and email are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.fullName = fullName;
    user.email = email;

    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
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
