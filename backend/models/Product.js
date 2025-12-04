// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     categoryType: { type: String, default: "New" }, // New or Old
//     categoryName: { type: String },
//     brand: { type: String },
//     colors: [{ type: String }],
//     warranty: { type: String },
//     delivery: { type: String },
//     rating: { type: Number, default: 0 },
//     reviews: { type: Number, default: 0 },
//     stock: { type: Number, default: 0 },
//     description: { type: String },
//     imageUrl: { type: String },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", productSchema);














///new one
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Changed from sellerId to owner, and ref to User
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categoryType: { type: String, default: "New" }, // New or Old
    categoryName: { type: String }, // e.g., Electronics, Watches
    brand: { type: String },
    colors: [{ type: String }],
    warranty: { type: String },
    delivery: { type: String },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    description: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
