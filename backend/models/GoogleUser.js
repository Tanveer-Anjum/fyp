import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  googleId: { type: String, required: true, unique: true }, // must be unique
  role: { type: String, default: "buyer" },
});

export default mongoose.model("GoogleUser", googleUserSchema);
