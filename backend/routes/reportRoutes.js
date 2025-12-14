import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Convert seller ID
const sellerObjectId = (id) => new mongoose.Types.ObjectId(id);


// ================= DAILY SALES =================
router.get("/daily-sales", auth, async (req, res) => {
  try {
    const sales = await Order.aggregate([
      {
        $match: {
          sellerId: sellerObjectId(req.user.id),
          status: "accepted",
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalRevenue: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
      }
    ]);

    res.json({ success: true, sales });
  } catch (error) {
    console.log("daily-sales error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ================= MONTHLY SALES =================
router.get("/monthly-sales", auth, async (req, res) => {
  try {
    const sales = await Order.aggregate([
      {
        $match: {
          sellerId: sellerObjectId(req.user.id),
          status: "accepted",
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalRevenue: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json({ success: true, sales });
  } catch (error) {
    console.log("monthly-sales error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ================= TOP SELLING PRODUCTS =================
router.get("/top-products", auth, async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      {
        $match: {
          sellerId: sellerObjectId(req.user.id),
          status: "accepted",
        },
      },
      {
        $group: {
          _id: "$product.name",
          totalSold: { $sum: "$quantity" },
          revenue: { $sum: "$amount" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    res.json({ success: true, topProducts });
  } catch (error) {
    console.log("top-products error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
