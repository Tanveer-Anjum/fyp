
import express from "express";
import User from "../models/Seller.js";

const router = express.Router();

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

// DELETE a seller by ID
router.delete("/sellers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await User.findById(id);

    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    await User.findByIdAndDelete(id);
    res.json({ success: true, message: "Seller deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error while deleting seller" });
  }
});

// UPDATE a seller by ID
router.put("/sellers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const seller = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    res.json({ success: true, seller, message: "Seller updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error while updating seller" });
  }
});


// GET all users
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

// DELETE a user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await User.findByIdAndDelete(id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error while deleting user" });
  }
});


export default router;
