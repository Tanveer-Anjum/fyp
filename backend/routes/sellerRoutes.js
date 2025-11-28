// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Seller from "../models/Seller.js";

// const router = express.Router();

// // Seller Signup
// router.post("/signup", async (req, res) => {
//   try {
//     const {
//       fullName, phoneNumber, email, password,
//       shopName, shopCategory, businessType, address,
//       companyName, taxNumber, bankAccount, idNumber
//     } = req.body;

//     // Check required fields
//     if (!fullName || !phoneNumber || !email || !password || !shopName || !shopCategory ||
//         !businessType || !address || !companyName || !taxNumber || !bankAccount || !idNumber) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existing = await Seller.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Seller already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const seller = new Seller({
//       fullName, phoneNumber, email, password: hashedPassword,
//       shopName, shopCategory, businessType, address,
//       companyName, taxNumber, bankAccount, idNumber
//     });

//     await seller.save();
//     res.status(201).json({ message: "Seller registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Seller Signin
// router.post("/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) return res.status(400).json({ message: "Email and password required" });

//     const seller = await Seller.findOne({ email });
//     if (!seller) return res.status(400).json({ message: "Seller not found" });

//     const isMatch = await bcrypt.compare(password, seller.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     const token = jwt.sign(
//       { id: seller._id, role: "seller" },
//       process.env.JWT_SECRET || "secret123",
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       role: "seller",
//       user: {
//         id: seller._id,
//         name: seller.fullName,
//         email: seller.email,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;












// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Seller from "../models/Seller.js";
//   // <-- ADD THIS

// const router = express.Router();

// // Seller Signup
// router.post("/signup", async (req, res) => {
//   try {
//     const {
//       fullName, phoneNumber, email, password,
//       shopName, shopCategory, businessType, address,
//       companyName, taxNumber, bankAccount, idNumber
//     } = req.body;

//     // Check required fields
//     if (!fullName || !phoneNumber || !email || !password || !shopName || !shopCategory ||
//         !businessType || !address || !companyName || !taxNumber || !bankAccount || !idNumber) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existing = await Seller.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Seller already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const seller = new Seller({
//       fullName, phoneNumber, email, password: hashedPassword,
//       shopName, shopCategory, businessType, address,
//       companyName, taxNumber, bankAccount, idNumber
//     });

//     await seller.save();
//     res.status(201).json({ message: "Seller registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Seller Signin
// router.post("/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ message: "Email and password required" });

//     const seller = await Seller.findOne({ email });
//     if (!seller) return res.status(400).json({ message: "Seller not found" });

//     const isMatch = await bcrypt.compare(password, seller.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     const token = jwt.sign(
//       { id: seller._id, role: "seller" },
//       process.env.JWT_SECRET || "secret123",
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       role: "seller",
//       user: {
//         id: seller._id,
//         name: seller.fullName,
//         email: seller.email,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// import authMiddleware from "../middleware/auth.js";




// import auth from "../middleware/auth.js";
// import Seller from "../models/Seller.js";



// // GET LOGGED-IN SELLER INFO
// router.get("/my-shop", auth, async (req, res) => {
//   try {
//     const seller = await Seller.findById(req.user.id);

//     if (!seller) {
//       return res.status(404).json({ success: false, message: "Seller not found" });
//     }

//     res.json({
//       success: true,
//       seller,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;










// routes/sellerRoute.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";


const router = express.Router();

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

    const existing = await Seller.findOne({ email });
    if (existing) return res.status(400).json({ message: "Seller already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = new Seller({
      fullName,
      phoneNumber,
      email,
      password: hashedPassword,
      shopName,
      shopCategory,
      businessType,
      address,
      companyName,
      taxNumber,
      bankAccount,
      idNumber,
    });

    await seller.save();
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

    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ message: "Seller not found" });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: seller._id, role: "seller" },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: "seller",
      user: {
        id: seller._id,
        name: seller.fullName,
        email: seller.email,
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

//     if (!seller) {
//       return res.status(404).json({ success: false, message: "Seller not found" });
//     }

//     res.json({
//       success: true,
//       seller,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;










import { verifyToken } from "../middleware/auth.js"; // JWT auth middleware

// -------------------- GET my shop --------------------
router.get("/my-shop", verifyToken, async (req, res) => {
  try {
   const seller = await Seller.findById(req.user.id);
if (!seller) return res.status(404).json({ success: false, message: "Seller not found" });
res.json({ success: true, seller });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------- DELETE seller --------------------
// -------------------- DELETE seller --------------------
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ success: false, message: "Seller not found" });

    // Only the owner can delete (if you added user reference)
    // if (seller.user.toString() !== req.user.id) {
    //   return res.status(403).json({ success: false, message: "Unauthorized" });
    // }

    // Use deleteOne instead of remove
    await seller.deleteOne();

    res.json({ success: true, message: "Seller deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// -------------------- EDIT seller --------------------
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ success: false, message: "Seller not found" });

    // Only the owner can edit
   if (seller._id.toString() !== req.user.id) {
  return res.status(403).json({ success: false, message: "Unauthorized" });
}


    // Update fields (add more fields if needed)
    const { fullName, phoneNumber, shopName, shopCategory, businessType, companyName } = req.body;
    seller.fullName = fullName || seller.fullName;
    seller.phoneNumber = phoneNumber || seller.phoneNumber;
    seller.shopName = shopName || seller.shopName;
    seller.shopCategory = shopCategory || seller.shopCategory;
    seller.businessType = businessType || seller.businessType;
    seller.companyName = companyName || seller.companyName;

    await seller.save();
    res.json({ success: true, seller, message: "Seller updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
