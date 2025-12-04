
// import express from "express";
// import User from "../models/User.js"; // Updated import path for the User model
// import Order from "../models/Order.js"; // Import the Order model
// import adminAuth from "../middleware/adminAuth.js"; // Import admin authentication middleware

// const router = express.Router();

// // Apply adminAuth middleware to all admin routes if not done globally
// router.use(adminAuth);

// // GET all sellers
// router.get("/sellers", async (req, res) => {
//   try {
//     const sellers = await User.find({ role: "seller" });
//     res.json({ success: true, sellers });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // DELETE a seller by ID
// router.delete("/sellers/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const seller = await User.findById(id);

//     if (!seller) {
//       return res.status(404).json({ success: false, message: "Seller not found" });
//     }

//     await User.findByIdAndDelete(id);
//     res.json({ success: true, message: "Seller deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error while deleting seller" });
//   }
// });

// // UPDATE a seller by ID
// router.put("/sellers/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     const seller = await User.findByIdAndUpdate(id, updateData, { new: true });

//     if (!seller) {
//       return res.status(404).json({ success: false, message: "Seller not found" });
//     }

//     res.json({ success: true, seller, message: "Seller updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error while updating seller" });
//   }
// });


// // GET all users
// router.get("/all-users", async (req, res) => {
//   try {
//     const users = await User.find(); // Fetch all users
//     res.json({ success: true, users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch users" });
//   }
// });

// // DELETE a user by ID
// router.delete("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     await User.findByIdAndDelete(id);
//     res.json({ success: true, message: "User deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error while deleting user" });
//   }
// });

// // @route   GET /api/admin/orders
// // @desc    Get all orders for the admin dashboard
// // @access  Private (requires admin authentication)
// router.get("/orders", async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("buyer", "fullName email") // Populate buyer info
//       .populate("seller", "shopName fullName email") // Populate seller info
//       .sort({ orderDate: -1 });

//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });


// //new for fatchig the date 
// // Admin Dashboard Stats Route (REAL DATA)
// router.get("/dashboard-stats", async (req, res) => {
//   try {
//     const totalSellers = await Seller.countDocuments();
//     const totalBuyers = await Buyer.countDocuments();
//     const totalProducts = await Product.countDocuments();

//     const orders = await Order.find();
//     const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

//     res.json({
//       success: true,
//       totalSellers,
//       totalBuyers,
//       totalProducts,
//       totalOrders: orders.length,
//       totalRevenue,
//     });

//   } catch (error) {
//     console.error("Dashboard Stats Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to load dashboard stats",
//     });
//   }
// });


// export default router;




















import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Protect all routes
router.use(adminAuth);

// GET all sellers
router.get("/sellers", async (req, res) => {
  try {
    const sellers = await User.find({ role: "seller" });
    res.json({ success: true, sellers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE a seller
router.delete("/sellers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await User.findById(id);
    if (!seller) return res.status(404).json({ success: false, message: "Seller not found" });
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: "Seller deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error while deleting seller" });
  }
});

// GET all users
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

// DELETE a user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error while deleting user" });
  }
});

// GET all orders
// router.get("/orders", async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("buyer", "fullName email")
//       .populate("seller", "fullName email")
//       .sort({ orderDate: -1 });

//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });








// GET all orders for admin
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyer", "fullName email")
      .populate("seller", "fullName email")
      .sort({ orderDate: -1 });

    // Ensure product.image exists
    const transformedOrders = await Promise.all(
      orders.map(async (o) => {
        let productImage = o.product.image;

        // If product.image is missing, fetch from Product collection
        if (!productImage && o.product.id) {
          const prod = await Product.findById(o.product.id);
          productImage = prod?.imageUrl || "/uploads/default-product.jpg";
        }

        return {
          ...o._doc,
          product: {
            ...o.product,
            image: productImage,
          },
        };
      })
    );

    res.status(200).json({ success: true, orders: transformedOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});








// GET Dashboard Stats (Fixed revenue calculation)
router.get("/dashboard-stats", async (req, res) => {
  try {
    const totalSellers = await User.countDocuments({ role: "seller" });
    const totalBuyers = await User.countDocuments({ role: "buyer" });
    const totalProducts = await Product.countDocuments();

    const orders = await Order.find();

    // Calculate total revenue: price * quantity
    const totalRevenue = orders.reduce((sum, order) => sum + (order.product.price * order.quantity), 0);

    res.json({
      success: true,
      totalSellers,
      totalBuyers,
      totalProducts,
      totalOrders: orders.length,
      totalRevenue,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats",
    });
  }
});

export default router;
