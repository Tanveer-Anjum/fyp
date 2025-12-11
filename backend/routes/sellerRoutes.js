import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Updated import from Seller to User
import Order from "../models/Order.js"; // Added import for Order model
import auth from "../middleware/auth.js"; // Changed from { verifyToken } to auth
import mongoose from "mongoose";
import Product from "../models/Product.js"; // Added import for Product model

const router = express.Router(); // Moved router initialization to the top

// ----------------------------
// SELLER SIGNUP
// ----------------------------
router.post("/signup", async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      email,
      password,
      shopName,
      shopCategory,
      businessType,
      address,
      companyName,
      taxNumber,
      bankAccount,
      idNumber,
    } = req.body;

    // Check required fields
    if (
      !fullName ||
      !phoneNumber ||
      !email ||
      !password ||
      !shopName ||
      !shopCategory ||
      !businessType ||
      !address ||
      !companyName ||
      !taxNumber ||
      !bankAccount ||
      !idNumber
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email }); // Changed Seller.findOne to User.findOne
    if (existing) return res.status(400).json({ message: "Seller already exists" });

    // Remove manual password hashing here; the User model's pre-save hook will handle it
    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      phoneNumber,
      email,
      password, // Pass plain password, model will hash it
      shopName,
      shopCategory,
      businessType,
      address,
      companyName,
      taxNumber,
      bankAccount,
      idNumber,
      role: "seller", // Explicitly set role as seller
    });

    await user.save(); // Changed seller.save() to user.save()
    res.status(201).json({ message: "Seller registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------
// SELLER SIGNIN
// ----------------------------
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email }); // Changed Seller.findOne to User.findOne
    if (!user || user.role !== "seller") return res.status(400).json({ message: "Seller not found or not a seller account" }); // Added role check

    const isMatch = await user.matchPassword(password); // Changed to use user.matchPassword
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: "seller" }, // Changed seller._id to user._id
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

// ----------------------------
// GET LOGGED-IN SELLER INFO
// ----------------------------
// router.get("/my-shop", auth, async (req, res) => {
//   try {
//     const seller = await Seller.findById(req.user.id);
//
//     if (!seller) {
//       return res.status(404).json({ success: false, message: "Seller not found" });
//     }
//
//     res.json({
//       success: true,
//       seller,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });
//
// export default router;
//
//
//
//
//
//
//
//
//
//


// -------------------- GET my shop --------------------
router.get("/my-shop", auth, async (req, res) => {
  try {
   const user = await User.findById(req.user.id); // Changed Seller.findById to User.findById and seller to user
if (!user || user.role !== "seller") return res.status(404).json({ success: false, message: "Seller not found or not a seller account" }); // Added role check
res.json({ success: true, seller: user }); // Changed seller to user
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------- DELETE seller --------------------
// -------------------- DELETE seller --------------------
router.delete("/:id", auth, async (req, res) => { // Changed verifyToken to auth
  try {
    const { id } = req.params;
    const user = await User.findById(id); // Changed Seller.findById to User.findById and seller to user
    if (!user || user.role !== "seller") return res.status(404).json({ success: false, message: "Seller not found or not a seller account" }); // Added role check

    // Only the owner can delete (if you added user reference)
    // if (seller.user.toString() !== req.user.id) {
    //   return res.status(403).json({ success: false, message: "Unauthorized" });
    // }

    // Use deleteOne instead of remove
    await user.deleteOne(); // Changed seller.deleteOne() to user.deleteOne()

    res.json({ success: true, message: "Seller deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});













//new route for test

// -------------------- EDIT seller --------------------
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const user = await User.findById(id);
    if (!user || user.role !== "seller")
      return res
        .status(404)
        .json({ success: false, message: "Seller not found or not a seller account" });

    // Only the owner can edit
    if (user._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Update fields
    const { fullName, phoneNumber, shopName, shopCategory, businessType, companyName } = req.body;
    user.fullName = fullName || user.fullName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.shopName = shopName || user.shopName;
    user.shopCategory = shopCategory || user.shopCategory;
    user.businessType = businessType || user.businessType;
    user.companyName = companyName || user.companyName;

    await user.save();

    // ✅ Return updated seller as 'seller' key for frontend consistency
    res.json({ success: true, seller: user, message: "Seller updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});









// @route   GET /api/seller/orders
// @desc    Get all orders for the authenticated seller
// @access  Private (requires authentication, seller role)
router.get("/orders", auth, async (req, res) => { // Changed verifyToken to auth
  try {
    // Assuming req.user.id is set by verifyToken middleware after authentication
    const sellerId = req.user.id;

    const orders = await Order.find({ seller: sellerId })
      .populate("buyer", "fullName username") // Populate buyer info
      .sort({ orderDate: -1 });

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @route   PUT /api/seller/orders/:id/status
// @desc    Update the status of an order (Accept/Cancel)
// @access  Private (requires authentication, seller role)
router.put("/orders/:id/status", auth, async (req, res) => { // Changed verifyToken to auth
  try {
    const { id } = req.params;
    const { status } = req.body;
    const sellerId = req.user.id;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Ensure the seller trying to update the order is the actual seller of the product
    if (order.seller.toString() !== sellerId) {
      return res.status(403).json({ success: false, message: "Unauthorized: You are not the seller of this product." });
    }

    // Validate status transition
    const validStatuses = ["accepted", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status provided." });
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json({ success: true, message: `Order status updated to ${status}`, orderStatus: order.orderStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @route   DELETE /api/seller/orders/:id
// @desc    Delete an order for the authenticated seller
// @access  Private (requires authentication, seller role)
router.delete("/orders/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.user.id;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Ensure the seller trying to delete the order is the actual seller of the product
    if (order.seller.toString() !== sellerId) {
      return res.status(403).json({ success: false, message: "Unauthorized: You are not the seller of this product." });
    }

    await order.deleteOne();
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});










// report routee

// ----------------------------
// SELLER REPORTS (Daily, Monthly, Top Products)
const sellerObjectId = (id) => new mongoose.Types.ObjectId(id);
// SELLER REPORTS (Daily, Monthly, Top Products)
router.get("/orders-report", auth, async (req, res) => {
  try {
    const sellerId = req.user.id; 
    
    // Get all orders for the seller
    const orders = await Order.find({ seller: sellerId })
      .populate("product.id", "stock") // Populate product stock
      .populate("buyer", "fullName username"); // Populate buyer info
    
    if (!orders.length) {
      // Even if no orders, we still want to show all products' stock
      const products = await Product.find({ owner: sellerId });
      const currentStock = products.map(product => ({
        name: product.name,
        stock: product.stock,
      }));
      
      return res.json({
        dailySales: [],
        monthlySales: [],
        topProducts: [],
        currentStock: currentStock, 
      });
    }

    // --- Daily Sales ---
    const dailySalesMap = {};
    orders.forEach((order) => {
      const date = new Date(order.orderDate);
      if (isNaN(date)) return;
      const key = date.toISOString().split("T")[0];
      const value = (order.product.price || 0) * (order.quantity || 0);
      dailySalesMap[key] = (dailySalesMap[key] || 0) + value;
    });

    const dailySales = Object.entries(dailySalesMap).map(([date, total]) => ({
      date,
      total,
    }));

    // --- Monthly Sales ---
    const monthlySalesMap = {};
    orders.forEach((order) => {
      const date = new Date(order.orderDate);
      if (isNaN(date)) return;
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const value = (order.product.price || 0) * (order.quantity || 0);
      monthlySalesMap[key] = (monthlySalesMap[key] || 0) + value;
    });

    const monthlySales = Object.entries(monthlySalesMap).map(([month, total]) => ({
      month,
      total,
    }));

    // --- Top Products ---
    const productMap = {};
    orders.forEach((order) => {
      const productName = order.product?.name || "Unknown Product";
      productMap[productName] = (productMap[productName] || 0) + (order.quantity || 0);
    });

    const topProducts = Object.entries(productMap)
      .map(([name, sold]) => ({ name, sold }))
      .sort((a, b) => b.sold - a.sold);

    // --- Current Stock ---
    // Fetch all products by the current seller
    const products = await Product.find({ owner: sellerId });
    const currentStock = products.map(product => ({
      name: product.name,
      stock: product.stock,
    }));
    
    res.json({ dailySales, monthlySales, topProducts, currentStock });

  } catch (error) {
    console.error("orders-report error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;




























// // new one


// import express from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import Order from "../models/Order.js";
// import auth from "../middleware/auth.js";
// import mongoose from "mongoose";

// const router = express.Router();

// /* ============================================================
//    SELLER SIGNUP
// ============================================================ */
// router.post("/signup", async (req, res) => {
//   try {
//     const {
//       fullName,
//       phoneNumber,
//       email,
//       password,
//       shopName,
//       shopCategory,
//       businessType,
//       address,
//       companyName,
//       taxNumber,
//       bankAccount,
//       idNumber,
//     } = req.body;

//     if (
//       !fullName ||
//       !phoneNumber ||
//       !email ||
//       !password ||
//       !shopName ||
//       !shopCategory ||
//       !businessType ||
//       !address ||
//       !companyName ||
//       !taxNumber ||
//       !bankAccount ||
//       !idNumber
//     ) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existing = await User.findOne({ email });
//     if (existing)
//       return res.status(400).json({ message: "Seller already exists" });

//     const user = new User({
//       fullName,
//       phoneNumber,
//       email,
//       password,
//       shopName,
//       shopCategory,
//       businessType,
//       address,
//       companyName,
//       taxNumber,
//       bankAccount,
//       idNumber,
//       role: "seller",
//     });

//     await user.save();
//     res.status(201).json({ message: "Seller registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ============================================================
//    SELLER LOGIN
// ============================================================ */
// router.post("/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user || user.role !== "seller") {
//       return res
//         .status(400)
//         .json({ message: "Seller not found or not a seller account" });
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid password" });

//     const token = jwt.sign(
//       { id: user._id, role: "seller" },
//       process.env.JWT_SECRET || "secret123",
//       { expiresIn: "1h" }
//     );

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ============================================================
//    GET LOGGED IN SELLER
// ============================================================ */
// router.get("/my-shop", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (!user || user.role !== "seller") {
//       return res
//         .status(404)
//         .json({ success: false, message: "Seller not found" });
//     }

//     res.json({ success: true, seller: user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /* ============================================================
//    EDIT SELLER PROFILE
// ============================================================ */
// router.put("/:id", auth, async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findById(id);
//     if (!user || user.role !== "seller")
//       return res.status(404).json({ message: "Seller not found" });

//     if (user._id.toString() !== req.user.id)
//       return res.status(403).json({ message: "Unauthorized" });

//     const fields = [
//       "fullName",
//       "phoneNumber",
//       "shopName",
//       "shopCategory",
//       "businessType",
//       "companyName",
//       "address",
//     ];

//     fields.forEach((field) => {
//       if (req.body[field]) user[field] = req.body[field];
//     });

//     await user.save();

//     res.json({
//       success: true,
//       seller: user,
//       message: "Seller updated successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ============================================================
//    DELETE SELLER
// ============================================================ */
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findById(id);
//     if (!user || user.role !== "seller")
//       return res.status(404).json({ message: "Seller not found" });

//     await user.deleteOne();
//     res.json({ message: "Seller deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ============================================================
//    GET SELLER ORDERS
//    POPULATES:
//    ✔ buyer fullName + email + phoneNumber
//    ✔ product name, price, imageUrl
// ============================================================ */
// router.get("/orders", auth, async (req, res) => {
//   try {
//     const sellerId = req.user.id;

//     const orders = await Order.find({ seller: sellerId })
//       .populate("buyer", "fullName email phoneNumber")
//       .populate("product.id", "name price imageUrl")
//       .sort({ orderDate: -1 });

//     res.json({ success: true, orders });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ============================================================
//    UPDATE ORDER STATUS
// ============================================================ */
// router.put("/orders/:id/status", auth, async (req, res) => {
//   try {
//     const { status } = req.body;

//     const validStatuses = ["accepted", "delivered", "cancelled"];
//     if (!validStatuses.includes(status))
//       return res.status(400).json({ message: "Invalid status" });

//     const order = await Order.findById(req.params.id);

//     if (!order)
//       return res.status(404).json({ message: "Order not found" });

//     if (order.seller.toString() !== req.user.id)
//       return res.status(403).json({ message: "Unauthorized" });

//     order.orderStatus = status;
//     await order.save();

//     res.json({
//       success: true,
//       message: `Order updated to ${status}`,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* ============================================================
//    SELLER REPORTS
// ============================================================ */
// router.get("/orders-report", auth, async (req, res) => {
//   try {
//     const sellerId = req.user.id;
//     const orders = await Order.find({ seller: sellerId });

//     if (!orders.length)
//       return res.json({
//         dailySales: [],
//         monthlySales: [],
//         topProducts: [],
//       });

//     // DAILY
//     const dailySalesMap = {};
//     orders.forEach((order) => {
//       const date = new Date(order.orderDate)
//         .toISOString()
//         .split("T")[0];
//       const total = order.price * order.quantity;
//       dailySalesMap[date] = (dailySalesMap[date] || 0) + total;
//     });

//     const dailySales = Object.entries(dailySalesMap).map(
//       ([date, total]) => ({ date, total })
//     );

//     // MONTHLY
//     const monthlySalesMap = {};
//     orders.forEach((order) => {
//       const d = new Date(order.orderDate);
//       const key = `${d.getFullYear()}-${String(
//         d.getMonth() + 1
//       ).padStart(2, "0")}`;
//       const total = order.price * order.quantity;
//       monthlySalesMap[key] = (monthlySalesMap[key] || 0) + total;
//     });

//     const monthlySales = Object.entries(monthlySalesMap).map(
//       ([month, total]) => ({ month, total })
//     );

//     // TOP PRODUCTS
//     const productMap = {};
//     orders.forEach((order) => {
//       const name = order.product?.name || "Unknown Product";
//       productMap[name] = (productMap[name] || 0) + order.quantity;
//     });

//     const topProducts = Object.entries(productMap)
//       .map(([name, sold]) => ({ name, sold }))
//       .sort((a, b) => b.sold - a.sold);

//     res.json({
//       dailySales,
//       monthlySales,
//       topProducts,
//     });
//   } catch (error) {
//     console.error("orders-report error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
