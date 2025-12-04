import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET /api/products?categoryType=new/old&name=searchTerm
router.get("/", async (req, res) => {
  const { categoryType, name } = req.query; // Added name to query parameters

  try {
    let filter = {};
    if (categoryType) {
      filter.categoryType = categoryType.toLowerCase() === "old" ? "Old" : "New";
    }

    // Add search by name functionality
    if (name) {
      filter.name = { $regex: name, $options: "i" }; // Case-insensitive search by name
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("owner", "fullName shopName email");
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
