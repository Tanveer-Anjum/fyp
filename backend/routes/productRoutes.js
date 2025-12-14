import express from "express";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer setup for product images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in the 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Unique filename
  },
});

const upload = multer({ storage: storage });

/*
|------------------------------------------|
| 1️⃣  GET ALL PRODUCTS  (Public)
|------------------------------------------|
*/
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/*
|--------------------------------------------------------------|
| 2️⃣  FILTER PRODUCTS (Public)
|--------------------------------------------------------------|
*/
router.get("/", async (req, res) => {
  const { categoryType, name } = req.query;

  try {
    let filter = {};

    if (categoryType) {
      filter.categoryType =
        categoryType.toLowerCase() === "old" ? "Old" : "New";
    }

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/*
|------------------------------------------|
| 3️⃣  GET PRODUCTS OF LOGGED-IN SELLER
|------------------------------------------|
*/
router.get("/seller", auth, async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/*
|------------------------------------------|
| 4️⃣  GET PRODUCT BY ID (Public)
|------------------------------------------|
*/
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "owner",
      "fullName shopName email"
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/*
|----------------------------------------------|
| 4️⃣  ADD PRODUCT  (Seller only)
|----------------------------------------------|
*/
router.post("/add", auth, upload.single("imageFile"), async (req, res) => {
  try {
    if (req.user.role !== "seller" && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not allowed" });
    }

    const { name, price, categoryType, categoryName, brand, colors, warranty, delivery, stock, description } = req.body;

    if (!name || !price) {
        return res.status(400).json({ success: false, message: "Product name and price are required." });
    }

    const product = new Product({
      name,
      price,
      categoryType,
      categoryName,
      brand,
      colors: colors ? colors.split(',').map(color => color.trim()) : [],
      warranty,
      delivery,
      stock,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "/uploads/default-product.jpg",
      owner: req.user.id,
    });

    await product.save();
    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ---------------------------
   DELETE PRODUCT (Admin or Owner)
---------------------------- */
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Allow admin OR product owner
    if (req.user.role !== "admin" && product.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ---------------------------
   EDIT PRODUCT (Admin or Owner)
---------------------------- */
router.put("/edit/:id", auth, upload.single("imageFile"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Allow admin OR product owner
    if (req.user.role !== "admin" && product.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const { name, price, categoryType, categoryName, brand, colors, warranty, delivery, stock, description } = req.body;

    // Update product fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.categoryType = categoryType || product.categoryType;
    product.categoryName = categoryName || product.categoryName;
    product.brand = brand || product.brand;
    product.colors = colors ? colors.split(',').map(color => color.trim()) : product.colors;
    product.warranty = warranty || product.warranty;
    product.delivery = delivery || product.delivery;
    product.stock = stock || product.stock;
    product.description = description || product.description;
    if (req.file) {
      product.imageUrl = `/uploads/${req.file.filename}`;
    }

    await product.save();

    res.json({ success: true, updated: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;