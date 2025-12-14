import mongoose from "mongoose";

const supportTicketSchema = new mongoose.Schema({
  name: String,
  email: String,
  issueType: String,
  description: String,
  status: { type: String, default: "pending" }, // pending / resolved
}, { timestamps: true });

export default mongoose.model("SupportTicket", supportTicketSchema);
