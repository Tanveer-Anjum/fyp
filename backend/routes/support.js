import express from "express";
import SupportTicket from "../models/SupportTicket.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// ---------------- Submit new support ticket ----------------
 // create this model


router.post("/submit", async (req, res) => {
  try {
    const { name, email, issueType, description } = req.body;
    if (!name || !email || !issueType || !description)
      return res.status(400).json({ success: false, message: "All fields required" });

    const ticket = await SupportTicket.create({ name, email, issueType, description, status: "pending" });
    res.json({ success: true, ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------- Get all tickets (Admin) ----------------
router.get("/all", adminAuth, async (req, res) => {
  try {
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    res.json({ success: true, tickets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------- Mark ticket as read ----------------
router.put("/read/:id", adminAuth, async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ success: false, message: "Ticket not found" });

    ticket.read = true;
    await ticket.save();

    res.json({ success: true, ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
