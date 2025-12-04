

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Use the unified User model

const router = express.Router();

// ------------------------
// Buyer Signup
// ------------------------
router.post("/buyer/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email }); // Use User model
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName: name, email, phone, password: hashedPassword, role: "buyer" }); // Use User model, set role to buyer
    await user.save();

    res.status(201).json({ message: "Buyer registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------
// Seller Signup (Full Schema)
// ------------------------
router.post("/seller/signup", async (req, res) => {
  try {
    const {
      fullName, phoneNumber, email, password,
      shopName, shopCategory, businessType, address,
      companyName, taxNumber, bankAccount, idNumber
    } = req.body;

    if (!fullName || !phoneNumber || !email || !password ||
        !shopName || !shopCategory || !businessType || !address ||
        !companyName || !taxNumber || !bankAccount || !idNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email }); // Use User model
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName, phoneNumber, email, password: hashedPassword,
      shopName, shopCategory, businessType, address,
      companyName, taxNumber, bankAccount, idNumber,
      role: "seller"
    }); // Use User model, set role to seller

    await user.save();
    res.status(201).json({ message: "Seller registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------
// Common Signin (Buyer + Seller + Admin)
// ------------------------
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password are required" });

    let user = await User.findOne({ email }); // Use User model

    if (!user)
      return res.status(400).json({ success: false, message: "User not found with this email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid password" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Use user.role
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token, // raw string
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role // Return the role from the user object
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;