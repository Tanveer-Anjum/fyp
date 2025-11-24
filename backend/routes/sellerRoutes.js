import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";

const router = express.Router();

// Seller Signup
router.post("/signup", async (req, res) => {
  try {
    const {
      fullName, phoneNumber, email, password,
      shopName, shopCategory, businessType, address,
      companyName, taxNumber, bankAccount, idNumber
    } = req.body;

    // Check required fields
    if (!fullName || !phoneNumber || !email || !password || !shopName || !shopCategory ||
        !businessType || !address || !companyName || !taxNumber || !bankAccount || !idNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Seller.findOne({ email });
    if (existing) return res.status(400).json({ message: "Seller already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = new Seller({
      fullName, phoneNumber, email, password: hashedPassword,
      shopName, shopCategory, businessType, address,
      companyName, taxNumber, bankAccount, idNumber
    });

    await seller.save();
    res.status(201).json({ message: "Seller registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Seller Signin
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ message: "Seller not found" });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: seller._id, role: "seller" },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: "seller",
      user: {
        id: seller._id,
        name: seller.fullName,
        email: seller.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
