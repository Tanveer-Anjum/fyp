

import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },  // ❗ optional for Google users
    googleId: { type: String },  // ✔ store Google ID
    avatar: { type: String },    // ✔ Google profile picture
    phone: { type: String },

    role: { type: String, default: "buyer" }, // buyer, admin, seller
  },
  { timestamps: true }
);

export default mongoose.model("User", buyerSchema);






