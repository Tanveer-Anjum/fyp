// import express from "express";
// import Product from "../models/Product.js";

// const router = express.Router();

// // GET /api/products?categoryType=new/old&name=searchTerm
// router.get("/", async (req, res) => {
//   const { categoryType, name } = req.query; // Added name to query parameters

//   try {
//     let filter = {};
//     if (categoryType) {
//       filter.categoryType = categoryType.toLowerCase() === "old" ? "Old" : "New";
//     }

//     // Add search by name functionality
//     if (name) {
//       filter.name = { $regex: name, $options: "i" }; // Case-insensitive search by name
//     }

//     const products = await Product.find(filter).sort({ createdAt: -1 });
//     res.json({ success: true, products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // GET /api/products/:id
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate("owner", "fullName shopName email");
//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }
//     res.json({ success: true, product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;














// import express from "express";
// import Product from "../models/Product.js";

// const router = express.Router();

// /*
// |------------------------------------------|
// | 1️⃣  GET ALL PRODUCTS  ( /api/products/all )
// |------------------------------------------|
// */
// router.get("/all", async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json({ success: true, products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /*
// |--------------------------------------------------------------|
// | 2️⃣  FILTER PRODUCTS ( /api/products?categoryType=...&name=... )
// |--------------------------------------------------------------|
// */
// router.get("/", async (req, res) => {
//   const { categoryType, name } = req.query;

//   try {
//     let filter = {};

//     if (categoryType) {
//       filter.categoryType =
//         categoryType.toLowerCase() === "old" ? "Old" : "New";
//     }

//     if (name) {
//       filter.name = { $regex: name, $options: "i" };
//     }

//     const products = await Product.find(filter).sort({ createdAt: -1 });
//     res.json({ success: true, products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /*
// |------------------------------------------|
// | 3️⃣  GET PRODUCT BY ID  ( /api/products/:id )
// |------------------------------------------|
// */
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate(
//       "owner",
//       "fullName shopName email"
//     );

//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /*
// |------------------------------------------|
// | 4️⃣  ADD PRODUCT  (POST)
// |------------------------------------------|
// */
// router.post("/add", async (req, res) => {
//   try {
//     const product = new Product({
//       ...req.body,
//     });

//     await product.save();
//     res.json({ success: true, product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /*
// |------------------------------------------|
// | 5️⃣  EDIT PRODUCT  (PUT)
// |------------------------------------------|
// */
// router.put("/edit/:id", async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updated) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, updated });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /*
// |------------------------------------------|
// | 6️⃣  DELETE PRODUCT  (DELETE)
// |------------------------------------------|
// */
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, message: "Product deleted" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;








// ///new may delet




// import express from "express";
// import Product from "../models/Product.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// /*
// |------------------------------------------|
// | 1️⃣ GET ALL PRODUCTS (public)
// |------------------------------------------|
// */
// router.get("/all", async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json({ success: true, products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /*
// |--------------------------------------------------------------|
// | 2️⃣ FILTER PRODUCTS (public)
// |--------------------------------------------------------------|
// */
// router.get("/", async (req, res) => {
//   const { categoryType, name } = req.query;

//   try {
//     let filter = {};

//     if (categoryType) {
//       filter.categoryType =
//         categoryType.toLowerCase() === "old" ? "Old" : "New";
//     }

//     if (name) {
//       filter.name = { $regex: name, $options: "i" };
//     }

//     const products = await Product.find(filter).sort({ createdAt: -1 });
//     res.json({ success: true, products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /*
// |------------------------------------------|
// | 3️⃣ GET PRODUCTS OF LOGGED-IN SELLER
// |------------------------------------------|
// */
// router.get("/seller", auth, async (req, res) => {
//   try {
//     const products = await Product.find({ owner: req.user.id }).sort({
//       createdAt: -1,
//     });
//     res.json({ success: true, products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /*
// |------------------------------------------|
// | 4️⃣ GET PRODUCT BY ID (public)
// |------------------------------------------|
// */
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate(
//       "owner",
//       "fullName shopName email"
//     );

//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /*
// |------------------------------------------|
// | 5️⃣ ADD PRODUCT (seller/admin)
// |------------------------------------------|
// */
// // router.post("/add", auth, async (req, res) => {
// //   try {
// //     const product = new Product({
// //       ...req.body,
// //       owner: req.user.id,
// //     });

// //     await product.save();
// //     res.json({ success: true, product });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });



// //new one
// router.post("/add", auth, async (req, res) => {
//   try {
//     const product = new Product({
//       ...req.body,
//       owner: req.user.id, // Save who created it
//     });

//     await product.save();

//     res.json({ success: true, product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });






// /*
// |------------------------------------------|
// | 6️⃣ EDIT PRODUCT (seller/admin)
// |------------------------------------------|
// */
// // router.put("/edit/:id", auth, async (req, res) => {
// //   try {
// //     const updated = await Product.findOneAndUpdate(
// //       { _id: req.params.id, owner: req.user.id },
// //       req.body,
// //       { new: true }
// //     );

// //     if (!updated) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Product not found or you do not own this product",
// //       });
// //     }

// //     res.json({ success: true, updated });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });



// //this new 
// router.put("/edit/:id", auth, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     // Allow admin or owner
//     if (req.user.role !== "admin" && req.user.id !== product.owner.toString()) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     res.json({ success: true, updated });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });




// /*
// |------------------------------------------|
// | 7️⃣ DELETE PRODUCT (seller/admin)
// |------------------------------------------|
// */
// // router.delete("/delete/:id", auth, async (req, res) => {
// //   try {
// //     const deleted = await Product.findOneAndDelete({
// //       _id: req.params.id,
// //       owner: req.user.id,
// //     });

// //     if (!deleted) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Product not found or you do not own this product",
// //       });
// //     }

// //     res.json({ success: true, message: "Product deleted" });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });



// // this is new 

// // DELETE product
// router.delete("/delete/:id", auth, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     // Allow: admin OR product owner
//     if (req.user.role !== "admin" && req.user.id !== product.owner.toString()) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     await Product.findByIdAndDelete(req.params.id);

//     res.json({ success: true, message: "Product deleted" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;







// //for delte  new

// backend/routes/productRoutes.js
import express from "express";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/*
|------------------------------------------|
| 1️⃣  GET ALL PRODUCTS  (Public)
|------------------------------------------|
*/
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/*
|--------------------------------------------------------------|
| 2️⃣  FILTER PRODUCTS (Public)
|--------------------------------------------------------------|
*/
router.get("/", async (req, res) => {
  const { categoryType, name } = req.query;

  try {
    let filter = {};

    if (categoryType) {
      filter.categoryType =
        categoryType.toLowerCase() === "old" ? "Old" : "New";
    }

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/*
|------------------------------------------|
| 3️⃣  GET PRODUCT BY ID (Public)
|------------------------------------------|
*/
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "owner",
      "fullName shopName email"
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/*
|----------------------------------------------|
| 4️⃣  ADD PRODUCT  (Seller only)
|----------------------------------------------|
*/
router.post("/add", auth, async (req, res) => {
  try {
    if (req.user.role !== "seller" && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not allowed" });
    }

    const product = new Product({
      ...req.body,
      owner: req.user.id, // assign product to the currently logged-in seller
    });

    await product.save();
    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ---------------------------
   DELETE PRODUCT (Admin or Owner)
---------------------------- */
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Allow admin OR product owner
    if (req.user.role !== "admin" && product.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ---------------------------
   EDIT PRODUCT (Admin or Owner)
---------------------------- */
router.put("/edit/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Allow admin OR product owner
    if (req.user.role !== "admin" && product.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ success: true, updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;




//new this correct


// /* backend/routes/productRoutes.js */
// import express from "express";
// import Product from "../models/Product.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// /* ------------ GET ALL PRODUCTS (Public) ------------ */
// router.get("/all", async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json({ success: true, products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /* ------------ FILTER PRODUCTS (Public) ------------ */
// router.get("/", async (req, res) => {
//   const { categoryType, name } = req.query;

//   try {
//     let filter = {};

//     if (categoryType)
//       filter.categoryType = categoryType.toLowerCase() === "old" ? "Old" : "New";

//     if (name)
//       filter.name = { $regex: name, $options: "i" };

//     const products = await Product.find(filter).sort({ createdAt: -1 });
//     res.json({ success: true, products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /* ------------ GET PRODUCT BY ID (Public) ------------ */
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate("owner", "fullName shopName email");

//     if (!product)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     res.json({ success: true, product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /* ------------ ADD PRODUCT (Seller/Admin) ------------ */
// router.post("/add", auth, async (req, res) => {
//   try {
//     if (req.user.role !== "seller" && req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Not allowed" });
//     }

//     const product = new Product({
//       ...req.body,
//       owner: req.user.id,
//     });

//     await product.save();
//     res.json({ success: true, product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /* ------------ DELETE PRODUCT (Admin OR Owner) ------------ */
// router.delete("/delete/:id", auth, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     if (req.user.role !== "admin" && product.owner.toString() !== req.user.id)
//       return res.status(403).json({ success: false, message: "Unauthorized" });

//     await Product.findByIdAndDelete(req.params.id);

//     res.json({ success: true, message: "Product deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /* ------------ EDIT PRODUCT (Admin OR Owner) ------------ */
// router.put("/edit/:id", auth, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     if (req.user.role !== "admin" && product.owner.toString() !== req.user.id)
//       return res.status(403).json({ success: false, message: "Unauthorized" });

//     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

//     res.json({ success: true, updated });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;