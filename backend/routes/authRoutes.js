// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Buyer from "../models/Buyer.js";
// import Seller from "../models/Seller.js";

// const router = express.Router();

// // ✅ Buyer Signup
// router.post("/buyer/signup", async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existing = await Buyer.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Buyer already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const buyer = new Buyer({ name, email, phone, password: hashedPassword });
//     await buyer.save();

//     res.status(201).json({ message: "Buyer registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ✅ Seller Signup
// router.post("/seller/signup", async (req, res) => {
//   try {
//     const { fullName, email, password, phoneNumber } = req.body;

//     if (!fullName || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existing = await Seller.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Seller already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const seller = new Seller({ fullName, email, phoneNumber, password: hashedPassword });
//     await seller.save();

//     res.status(201).json({ message: "Seller registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// //  Common Signin (Buyer + Seller)
// router.post("/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1. Validate input
//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Email and password are required" });
//     }

//     // 2. Try finding user in Buyers first
//     let user = await Buyer.findOne({ email });
//     let role = "buyer";

//     // 3. If not a Buyer, check Sellers
//     if (!user) {
//       user = await Seller.findOne({ email });
//       role = "seller";
//     }

//     if (!user) {
//       return res.status(400).json({ success: false, message: "User not found with this email" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid password" });
//     }

   
//     const token = jwt.sign(
//       { id: user._id, role },
//       process.env.JWT_SECRET || "secret123",
//       { expiresIn: "1h" }
//     );

   
//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       role,
//       user: {
//         id: user._id,
//         name: user.name || user.fullName,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;






import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Buyer from "../models/Buyer.js";
import Seller from "../models/Seller.js";

const router = express.Router();

// ------------------------
// Buyer Signup
// ------------------------
router.post("/buyer/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Buyer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Buyer already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const buyer = new Buyer({ name, email, phone, password: hashedPassword });
    await buyer.save();

    res.status(201).json({ message: "Buyer registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------
// Seller Signup (Full Schema)
// ------------------------
router.post("/seller/signup", async (req, res) => {
  try {
    const {
      fullName, phoneNumber, email, password,
      shopName, shopCategory, businessType, address,
      companyName, taxNumber, bankAccount, idNumber
    } = req.body;

    if (!fullName || !phoneNumber || !email || !password ||
        !shopName || !shopCategory || !businessType || !address ||
        !companyName || !taxNumber || !bankAccount || !idNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Seller.findOne({ email });
    if (existing) return res.status(400).json({ message: "Seller already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = new Seller({
      fullName, phoneNumber, email, password: hashedPassword,
      shopName, shopCategory, businessType, address,
      companyName, taxNumber, bankAccount, idNumber
    });

    await seller.save();
    res.status(201).json({ message: "Seller registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------
// Common Signin (Buyer + Seller)
// ------------------------
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

    // Try Buyer first
    let user = await Buyer.findOne({ email });
    let role = "buyer";

    // Then Seller
    if (!user) {
      user = await Seller.findOne({ email });
      role = "seller";
    }

    if (!user) return res.status(400).json({ success: false, message: "User not found with this email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET || "secret123", { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role,
      user: {
        id: user._id,
        name: user.name || user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
