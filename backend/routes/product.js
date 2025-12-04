import express from "express";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Set up uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// -------------------- Add Product --------------------
router.post("/add", auth, upload.single("imageFile"), async (req, res) => {
  try {
    const newProduct = new Product({
      owner: req.user.id, // Changed from sellerId to owner
      name: req.body.name,
      price: req.body.price,
      categoryType: req.body.categoryType,
      categoryName: req.body.categoryName,
      brand: req.body.brand,
      colors: req.body.colors ? req.body.colors.split(",") : [],
      warranty: req.body.warranty,
      delivery: req.body.delivery,
      rating: req.body.rating,
      reviews: req.body.reviews,
      stock: req.body.stock,
      description: req.body.description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
    });
    await newProduct.save();
    res.json({ success: true, product: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------- Get Seller's Products --------------------
router.get("/seller", auth, async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user.id }); // Changed sellerId to owner
    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------- Edit Product --------------------
router.put("/edit/:id", auth, upload.single("imageFile"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // Make sure seller owns the product
    if (product.owner.toString() !== req.user.id) // Changed sellerId to owner
      return res.status(403).json({ success: false, message: "Unauthorized" });

    // Update fields
    Object.keys(req.body).forEach((key) => {
      if (key === "colors") product[key] = req.body[key].split(",");
      else product[key] = req.body[key];
    });

    if (req.file) product.imageUrl = `/uploads/${req.file.filename}`;

    await product.save();
    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------- Delete Product --------------------
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    if (product.owner.toString() !== req.user.id) // Changed sellerId to owner
      return res.status(403).json({ success: false, message: "Unauthorized" });

    await product.deleteOne();
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
