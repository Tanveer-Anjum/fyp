import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Import bcryptjs

const userSchema = new mongoose.Schema({
  // Personal Info (common to all users)
  fullName: { type: String, required: true },
  phoneNumber: { type: String }, // Made optional
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Shop Info (seller-specific)
  shopName: { type: String }, // Made optional
  shopCategory: { type: String }, // Made optional
  businessType: { type: String, enum: ["individual", "company"] }, // Made optional
  address: { type: String }, // Made optional, can be shipping address for buyer

  // Business Info (seller-specific)
  companyName: { type: String }, // Made optional
  taxNumber: { type: String }, // Made optional
  bankAccount: { type: String }, // Made optional
  idNumber: { type: String }, // Made optional

  role: { type: String, default: "buyer", enum: ["buyer", "seller", "admin"] }, // Default to buyer, added admin role
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);











// import mongoose from "mongoose";

// const sellerSchema = new mongoose.Schema({
//   // Step 1: Personal Info
//   fullName: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },

//   // Step 2: Shop Info
//   shopName: { type: String, required: true },
//   shopCategory: { type: String, required: true },
//   businessType: { type: String, enum: ["individual", "company"], required: true },
//   address: { type: String, required: true },

//   // Step 3: Business Info
//   companyName: { type: String, required: true },
//   taxNumber: { type: String, required: true },
//   bankAccount: { type: String, required: true },
//   idNumber: { type: String, required: true },

//   role: { type: String, default: "seller" },
// }, { timestamps: true });

// export default mongoose.model("Seller", sellerSchema);
