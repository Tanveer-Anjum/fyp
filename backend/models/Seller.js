import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  // Step 1: Personal Info
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Step 2: Shop Info
  shopName: { type: String, required: true },
  shopCategory: { type: String, required: true },
  businessType: { type: String, enum: ["individual", "company"], required: true },
  address: { type: String, required: true },

  // Step 3: Business Info
  companyName: { type: String, required: true },
  taxNumber: { type: String, required: true },
  bankAccount: { type: String, required: true },
  idNumber: { type: String, required: true },

  role: { type: String, default: "seller" }, // 👈 important
}, { timestamps: true });

export default mongoose.model("Seller", sellerSchema);











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
