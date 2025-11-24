import express from "express";
import { verifyGoogleToken } from "../utils/googleVerifyToken.js";
import User from "../models/GoogleUser.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    const googleUser = await verifyGoogleToken(token);
    if (!googleUser) {
      return res.status(400).json({ success: false, message: "Invalid Google Token" });
    }

    // Check if user already exists by googleId
    let user = await User.findOne({ googleId: googleUser.sub });

    if (!user) {
      // First time user → create with googleId
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.sub, // ✅ important
        role: "buyer",
      });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      "jwtSecretKey",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token: jwtToken,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Google Login Failed" });
  }
});

export default router;
