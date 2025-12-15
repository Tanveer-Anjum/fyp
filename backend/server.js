
<<<<<<< HEAD
// //  // this new for support 

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import multer from "multer"; // Import multer
// import path from "path"; // Import path for file paths

// // --- GEMINI TOOL USE (AI Assistant) ---
// const { GoogleGenerativeAI } = await import("@google/generative-ai");
// import Product from "./models/Product.js"; // Import Product model
// import { toolDeclarations } from "./geminiTools.js";

// // ROUTES
// import authRoutes from "./routes/authRoutes.js";
// import googleAuthRoute from "./routes/googleAuthRoute.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import sellerRouter from "./routes/sellerRoutes.js";
// import mainAdmin from "./routes/mainAdmin.js";
// import userRoutes from "./routes/userRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import supportRoutes from "./routes/support.js"; // ✅ ADDED

// dotenv.config();
// connectDB();

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use(express.json());

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Files will be stored in the 'uploads/' directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Unique filename
//   },
// });

// const upload = multer({ storage: storage });

// // --------------------
// // ROUTE MIDDLEWARE
// // --------------------
// app.use("/api/auth", authRoutes);
// app.use("/api/auth", googleAuthRoute);
// app.use("/api/admin", adminRoutes);
// app.use("/api/main-admin", mainAdmin);
// app.use("/api/users", userRoutes);
// app.use("/api/seller", sellerRouter);
// app.use("/uploads", express.static("uploads"));
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);

// // ✅ ADD SUPPORT ROUTE
// app.use("/api/support", supportRoutes);

// // --------------------
// // GEMINI AI CHAT
// // --------------------

// const ai = new GoogleGenerativeAI({ apiKey:"AIzaSyAtHq1OwZ3A1RBg9170R3KWRfuDxnJQD2" });
// const MODEL = "gemini-2.5-flash";

// const BAZARIO_SYSTEM_INSTRUCTION = `
// You are 'Bazario Assistant', an AI designed exclusively for the Bazario e-commerce platform.
// Your tone must be helpful, professional, and friendly.

// STRICT RULES:
// 1. You must only talk about e-commerce, orders, shopping assistance, or Bazario.
// 2. If asked something outside e-commerce, reply:
//    "As the Bazario Assistant, my purpose is limited to assisting you with e-commerce needs."
// 3. Use tools for product recommendation and order tracking when requested.
// `;

// const get_recommendations = async (category, preference, marketplace_model) => {
//   try {
//     const query = { $and: [] };

//     if (category) {
//       query.$and.push({ categoryName: { $regex: category, $options: "i" } });
//     }

//     if (preference) {
//       query.$and.push({
//         $or: [
//           { name: { $regex: preference, $options: "i" } },
//           { description: { $regex: preference, $options: "i" } },
//           { brand: { $regex: preference, $options: "i" } },
//         ],
//       });
//     }

//     if (marketplace_model) {
//       let categoryType = "";
//       if (marketplace_model === "direct-retail") {
//         categoryType = "New";
//       } else if (marketplace_model === "second-hand") {
//         categoryType = "Old";
//       }
//       if (categoryType) {
//         query.$and.push({ categoryType: categoryType });
//       }
//     }
    
//     // If no specific criteria are provided, ensure the query is not empty
//     if (query.$and.length === 0) {
//         // Fetch some general products if no specific criteria
//         delete query.$and; // Remove the empty $and operator
//     }

//     const products = await Product.find(query).limit(5);

//     if (products.length > 0) {
//       const formattedProducts = products.map((product) => ({
//         name: product.name,
//         price: `PKR ${product.price.toLocaleString()}`,
//       }));
//       return JSON.stringify({
//         products: formattedProducts,
//         message: "Found several items matching your criteria in the catalog.",
//       });
//     } else {
//       return JSON.stringify({
//         products: [],
//         message: "No products found matching your criteria.",
//       });
//     }
//   } catch (error) {
//     console.error("Error in get_recommendations tool:", error);
//     return JSON.stringify({
//       products: [],
//       message: "An error occurred while fetching recommendations.",
//     });
//   }
// };

// const track_order = (order_id) => {
//   if (order_id.includes("BAZ")) {
//     return JSON.stringify({
//       status: "Shipped",
//       location: "Lahore Hub",
//       eta: "Dec 7, 2025",
//     });
//   } else {
//     return JSON.stringify({
//       status: "Order ID Not Found",
//       eta: "Please check your ID",
//     });
//   }
// };

// const availableTools = {
//   get_recommendations,
//   track_order,
// };

// app.post("/api/chat", async (req, res) => {
//   const { prompt, history } = req.body;

//   // Bypass Gemini AI for product recommendations if the API key is invalid or for direct testing
//   if (prompt.toLowerCase().includes("recommend") || prompt.toLowerCase().includes("products")) {
//     try {
//       // Simple category extraction (can be made more sophisticated if needed)
//       let category = "";
//       if (prompt.toLowerCase().includes("electronics")) category = "Electronics";
//       else if (prompt.toLowerCase().includes("books")) category = "Books";
//       else if (prompt.toLowerCase().includes("clothing")) category = "Clothing";
//       else if (prompt.toLowerCase().includes("furniture")) category = "Furniture";

//       const recommendations = await get_recommendations(category, null, null);
//       const parsedRecommendations = JSON.parse(recommendations);

//       if (parsedRecommendations.products && parsedRecommendations.products.length > 0) {
//         const responseText = `Here are some recommendations from your database:
// ${parsedRecommendations.products.map(p => `- ${p.name} (PKR ${p.price})`).join("\n")}`;
//         return res.json({ text: responseText, newHistory: [...history, { role: "user", parts: [{ text: prompt }] }, { role: "model", parts: [{ text: responseText }] }] });
//       } else {
//         return res.json({ text: "I couldn't find any specific product recommendations for that. Would you like me to try another category?", newHistory: [...history, { role: "user", parts: [{ text: prompt }] }, { role: "model", parts: [{ text: "I couldn't find any specific product recommendations for that. Would you like me to try another category?" }] }] });
//       }
//     } catch (error) {
//       console.error("Direct Recommendation Error:", error);
//       return res.status(500).json({ text: "An error occurred while fetching recommendations from the database." });
//     }
//   }

//   // Original Gemini AI Chat logic (only if API key is valid or for other chat intents)
//   const contents = [...(history || []), { role: "user", parts: [{ text: prompt }] }];

//   try {
//     // Check if the API key is valid before attempting to use Gemini AI
//     if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "AIzaSyAtHq1OwZ3A1RBg9170R3KWRfuDxnJQD2A") {
//         return res.status(500).json({ text: "Gemini AI is currently unavailable due to an invalid API key. Please contact support or check your server configuration." });
//     }
    
//     const modelInstance = ai.getGenerativeModel({ model: MODEL });
//     let response = await modelInstance.generateContent({
//       contents,
//       config: {
//         systemInstruction: BAZARIO_SYSTEM_INSTRUCTION,
//         tools: [{ functionDeclarations: toolDeclarations }],
//       },
//     });

//     if (response.functionCalls?.length > 0) {
//       const fc = response.functionCalls[0];
//       const functionName = fc.name;
//       const args = fc.args;

//       const toolOutput = availableTools[functionName](...Object.values(args));

//       const secondCall = [
//         ...contents,
//         { role: "model", parts: [{ functionCall: fc }] },
//         {
//           role: "function",
//           parts: [
//             {
//               functionResponse: {
//                 name: functionName,
//                 response: { result: toolOutput },
//               },
//             },
//           ],
//         },
//       ];

//       response = await modelInstance.generateContent({
//         contents: secondCall,
//         config: { systemInstruction: BAZARIO_SYSTEM_INSTRUCTION },
//       });
//     }

//     const newHistory = [...contents, { role: "model", parts: [{ text: response.text }] }];

//     res.json({
//       text: response.text,
//       newHistory,
//     });
//   } catch (error) {
//     console.error("Gemini AI Chat Error:", error);
//     res.status(500).json({
//       text: "I'm sorry, the Bazario Assistant is currently unavailable.",
//     });
//   }
// });

// // --------------------
// // OLD RECOMMEND ROUTE
// // --------------------
// // const oldGenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // app.post("/api/recommend", async (req, res) => {
// //   try {
// //     const { age, gender, event, hobby, relationship, budget } = req.body;

// //     if (!age || !gender || !event || !relationship || !budget)
// //       return res.status(400).json({ error: "Missing required fields" });

// //     const model = oldGenAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// //     const prompt = `
// // Based on the following user details, recommend a personalized gift:
// // Age: ${age}, Gender: ${
// //       gender || "Not specified"
// //     }, Event: ${event}, Hobby: ${hobby || "Not specified"}, Relationship: ${relationship}, Budget: ${budget}.
// // Suggest 3 items available on Bazario.
// // `;

// //     const result = await model.generateContent(prompt);

// //     res.json({ recommendation: result.response.text });
// //   } catch (error) {
// //     console.error("Gemini AI error:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // --------------------
// // START SERVER
// // --------------------
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   // console.log(`Server running on http://localhost:${PORT}`);
// });


=======
 // this new for support 
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219















































//new 






















// // D:\study\fyp\code\fyp\backend\server.js - UPDATED CODE

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// // --- NEW IMPORTS FOR GEMINI TOOL USE ---
// import { GoogleGenAI, Type } from "@google/genai";
// import { toolDeclarations } from './geminiTools.js'; 
// // Note: We use the specific '@google/genai' SDK for tool use
// // If you use 'GoogleGenerativeAI' from another package, adjust as needed

// import authRoutes from "./routes/authRoutes.js";
// import googleAuthRoute from "./routes/googleAuthRoute.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import sellerRouter from "./routes/sellerRoutes.js";
// import mainAdmin from "./routes/mainAdmin.js";
// import userRoutes from "./routes/userRoutes.js"; 
// import Product from "./models/Product.js";
// import productRoutes from "./routes/productRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js"; 

// // --------------------
// // CONFIG
// // --------------------
// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors({ 
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
// app.use(express.json());

// // --------------------
// // ROUTE MIDDLEWARE
// // --------------------
// app.use("/api/auth", authRoutes); 
// app.use("/api/auth", googleAuthRoute);  
// app.use("/api/admin", adminRoutes);
// app.use("/api/seller", sellerRouter);
// app.use("/api/main-admin", mainAdmin);
// app.use("/api/users", userRoutes); 
// app.use("/uploads", express.static("uploads"));
// app.use("/api/products", Product);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes); 

// // ----------------------------------------------------
// // 🧠 GEMINI AI TOOL USE: CONVERSATIONAL ASSISTANT
// // ----------------------------------------------------

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// const MODEL = 'gemini-2.5-flash';

// // 1. SYSTEM INSTRUCTION (Persona & Guardrails)
// const BAZARIO_SYSTEM_INSTRUCTION = `
// You are 'Bazario Assistant', an AI designed exclusively for the Bazario e-commerce platform.
// Your tone must be helpful, professional, and friendly, focusing on sales and support related to e-commerce.

// STRICT RULES:
// 1. Identity: Always refer to yourself as the 'Bazario Assistant'.
// 2. Scope: Only answer questions related to e-commerce, Bazario products, order status, or the unique marketplace models.
// 3. Guardrail: If asked about non-e-commerce topics, respond politely with: "As the Bazario Assistant, my purpose is limited to assisting you with e-commerce needs."
// 4. Tool Priority: If the user asks for product recommendations or order tracking, you MUST use the provided tools (functions) to extract the necessary parameters before replying.
// `;

// // 2. BACKEND FUNCTIONS (MOCK DATA - REPLACE WITH YOUR DB LOGIC)
// const get_recommendations = (category, preference, marketplace_model) => {
//   // *** YOUR ACTUAL LOGIC FOR QUERYING THE Product MODEL GOES HERE ***
//   // console.log([DB Call] Searching for ${preference} ${category}...);
  
//   // Example data (The AI will format this)
//   if (category.toLowerCase().includes("book")) {
//     return JSON.stringify({ 
//         products: [{ name: "Novel: The Bazario Saga", price: "PKR 1,500" }], 
//         message: "Found classic and modern novels matching your query." 
//     });
//   }
//   return JSON.stringify({
//     products: [
//       { name: "Curated Rug", price: "PKR 4,999", model: "Direct Retail" },
//       { name: "Vintage Camera Lens", price: "PKR 12,000", model: "Second-Hand" }
//     ],
//     message: "Found several items matching your criteria in the catalog."
//   });
// };

// const track_order = (order_id) => {
//   // *** YOUR ACTUAL LOGIC FOR QUERYING THE Order MODEL GOES HERE ***
//   // console.log([DB Call] Tracking order ID: ${order_id});

//   if (order_id.includes("BAZ")) {
//     return JSON.stringify({ status: "Shipped", location: "Lahore Hub", eta: "Dec 7, 2025" });
//   } else {
//     return JSON.stringify({ status: "Order ID Not Found", eta: "Please check your ID" });
//   }
// };

// const availableTools = {
//   get_recommendations: get_recommendations,
//   track_order: track_order,
// };

// // 3. NEW UNIFIED CHAT API ENDPOINT
// app.post('/api/chat', async (req, res) => {
//   const { prompt, history } = req.body; 
  
//   const contents = [
//       ...(history || []), // Ensure history is treated as an array
//       { role: "user", parts: [{ text: prompt }] } 
//   ];

//   try {
//     let response = await ai.models.generateContent({
//       model: MODEL,
//       contents: contents,
//       config: {
//         systemInstruction: BAZARIO_SYSTEM_INSTRUCTION,
//         tools: [{ functionDeclarations: toolDeclarations }],
//       },
//     });

//     // --- TOOL USE LOOP: Check if the AI wants to call a function ---
//     if (response.functionCalls && response.functionCalls.length > 0) {
//       const fc = response.functionCalls[0];
//       const functionName = fc.name;
//       const functionArgs = fc.args;

//       // Execute the local Bazario function
//       const toolOutput = availableTools[functionName](...Object.values(functionArgs));
      
//       // Call the AI again with the function result
//       const secondCallContents = [
//         ...contents, 
//         { role: "model", parts: [{ functionCall: fc }] },
//         { role: "function", parts: [{ functionResponse: { name: functionName, response: { result: toolOutput } } }] }
//       ];

//       response = await ai.models.generateContent({
//         model: MODEL,
//         contents: secondCallContents,
//         config: {
//           systemInstruction: BAZARIO_SYSTEM_INSTRUCTION,
//         },
//       });
//     }

//     // Final response history update
//     const newHistory = [...contents, { role: "model", parts: [{ text: response.text }] }];

//     res.json({
//       text: response.text,
//       newHistory: newHistory
//     });

//   } catch (error) {
//     console.error("Gemini AI Chat Error:", error);
//     res.status(500).json({ text: "I'm sorry, the Bazario Assistant is currently unavailable." });
//   }
// });


// // ----------------------------------------------------
// // GEMINI AI GIFT RECOMMENDATION (OLD ROUTE - KEPT FOR REFERENCE)
// // ----------------------------------------------------
// const oldGenAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

// app.post("/api/recommend", async (req, res) => {
//   // This route is separate, non-conversational, and relies on a structured form input.
//   // It is fine to keep it if you need a specific, non-chat-based recommender endpoint.
//   try {
//     const { age, gender, event, hobby, relationship, budget } = req.body;

//     if (!age || !gender || !event || !relationship || !budget) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const model = oldGenAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `
//       Based on the following user details, recommend a personalized gift:
//       Age: ${age}, Gender: ${gender}, Event: ${event}, Hobby: ${hobby || "Not specified"}, Relationship: ${relationship}, Budget: ${budget}.
//       Suggest 3 items available on Bazario.
//     `;

//     const result = await model.generateContent(prompt);
//     const recommendation = result.response.text;
//     res.json({ recommendation });
//   } catch (error) {
//     console.error("Gemini AI error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });


// // --------------------
// // START SERVER
// // --------------------
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//  // console.log(Server running on http://localhost:${PORT});
// });





























// //last one
// // server.js
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// // --------------------
// // ROUTE IMPORTS
// // --------------------
// import authRoutes from "./routes/authRoutes.js";
// import googleAuthRoute from "./routes/googleAuthRoute.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import sellerRouter from "./routes/sellerRoutes.js";
// import mainAdmin from "./routes/mainAdmin.js";
// import userRoutes from "./routes/userRoutes.js"; 
// import Product from "./models/Product.js"; // Your Mongoose model
// import productRoutes from "./routes/productRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js"; 
// import reportRoutes from "./routes/reportRoutes.js";
// import supportRoutes from "./routes/support.js";

// // --------------------
// // GEMINI AI TOOL IMPORTS
// // --------------------
// import { GoogleGenAI } from "@google/genai";
// import { toolDeclarations } from './geminiTools.js'; 

// // --------------------
// // CONFIG
// // --------------------
// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors({ 
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // --------------------
// // ROUTE MIDDLEWARE
// // --------------------
// app.use("/api/auth", authRoutes); 
// app.use("/api/auth", googleAuthRoute);  
// app.use("/api/admin", adminRoutes);
// app.use("/api/seller", sellerRouter);
// app.use("/api/main-admin", mainAdmin);
// app.use("/api/users", userRoutes); 
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes); 
// app.use("/api/support", supportRoutes);
// app.use("/api/reports", reportRoutes);

// // --------------------
// // GEMINI AI CHAT CONFIG
// // --------------------
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// const MODEL = "gemini-2.5-flash";

// const BAZARIO_SYSTEM_INSTRUCTION = `
// You are 'Bazario Assistant', an AI designed exclusively for the Bazario e-commerce platform.
// Your tone must be helpful, professional, and friendly, focusing on sales and support related to e-commerce.

// STRICT RULES:
// 1. Identity: Always refer to yourself as the 'Bazario Assistant'.
// 2. Scope: Only answer questions related to e-commerce, Bazario products, order status, or marketplace models.
// 3. Guardrail: If asked about non-e-commerce topics, respond politely with: "As the Bazario Assistant, my purpose is limited to assisting you with e-commerce needs."
// 4. Tool Priority: If the user asks for product recommendations or order tracking, you MUST use the provided tools to extract the parameters before replying.
// `;

// // --------------------
// // BACKEND FUNCTIONS FOR AI TOOLS
// // --------------------

// // Get product recommendations from MongoDB
// const get_recommendations = async (category, preference, marketplace_model) => {
//     const cat = category.toLowerCase();
//     const pref = preference ? preference.toLowerCase() : "";

//     // MongoDB query using correct field
//     const query = {
//         categoryName: { $regex: cat, $options: 'i' }
//     };

//     // Price filters based on preference
//     if (pref.includes('budget')) query.price = { $lt: 5000 };
//     if (pref.includes('high-end')) query.price = { $gt: 20000 };

//     // Marketplace model filter
//     if (marketplace_model) query.marketplaceModel = marketplace_model;

//     console.log(`[DB Query] Searching products with filter: ${JSON.stringify(query)}`);

//     try {
//         let products = await Product.find(query)
//             .limit(5)
//             .select('name price imageUrl')
//             .lean();

//         // Fallback for electronics if no products found
//         if (products.length === 0 && cat.includes("electronics")) {
//             products = await Product.find({ categoryName: { $in: ["watch", "phone", "earbuds"] } })
//                 .limit(5)
//                 .select('name price imageUrl')
//                 .lean();
//         }

//         if (products.length === 0) {
//             return JSON.stringify({
//                 status: "Fallback",
//                 message: `Could not find exact products for ${category}, showing default recommendations.`,
//                 products: [
//                     { name: "Smart Watch", price: 8500, imageUrl: "/uploads/default-watch.jpg" },
//                     { name: "Wireless Earbuds", price: 5200, imageUrl: "/uploads/default-earbuds.jpg" },
//                     { name: "Power Bank", price: 2000, imageUrl: "/uploads/default-powerbank.jpg" }
//                 ]
//             });
//         }

//         return JSON.stringify({
//             status: "Success",
//             message: `Found ${products.length} recommendations.`,
//             products: products
//         });

//     } catch (error) {
//         console.error("MongoDB Query Error (Recommendations):", error);
//         return JSON.stringify({
//             status: "Error",
//             details: "Database connection failed during product search."
//         });
//     }
// };

// // Track order mock
// const track_order = (order_id) => {
//   console.log(`[DB Call] Tracking order ID: ${order_id}`);
//   if (order_id.includes("BAZ")) {
//     return JSON.stringify({ status: "Shipped", location: "Lahore Hub", eta: "Dec 7, 2025" });
//   } else {
//     return JSON.stringify({ status: "Order ID Not Found", eta: "Please check your ID" });
//   }
// };

// const availableTools = {
//   get_recommendations,
//   track_order,
// };

// // --------------------
// // CHAT ENDPOINT
// // --------------------
// app.post("/api/chat", async (req, res) => {
//   const { prompt, history } = req.body;
//   const contents = [
//     ...(history || []),
//     { role: "user", parts: [{ text: prompt }] }
//   ];

//   try {
//     let response = await ai.models.generateContent({
//       model: MODEL,
//       contents,
//       config: { systemInstruction: BAZARIO_SYSTEM_INSTRUCTION, tools: [{ functionDeclarations: toolDeclarations }] }
//     });

//     // Handle function calls from AI
//     if (response.functionCalls?.length > 0) {
//       const fc = response.functionCalls[0];
//       const toolOutput = await availableTools[fc.name](...Object.values(fc.args));

//       const secondCallContents = [
//         ...contents,
//         { role: "model", parts: [{ functionCall: fc }] },
//         { role: "function", parts: [{ functionResponse: { name: fc.name, response: { result: toolOutput } } }] }
//       ];

//       response = await ai.models.generateContent({
//         model: MODEL,
//         contents: secondCallContents,
//         config: { systemInstruction: BAZARIO_SYSTEM_INSTRUCTION }
//       });
//     }

//     const newHistory = [...contents, { role: "model", parts: [{ text: response.text }] }];
//     res.json({ text: response.text, newHistory });
//   } catch (error) {
//     console.error("Gemini AI Chat Error:", error);
//     res.status(500).json({ text: "I'm sorry, the Bazario Assistant is currently unavailable." });
//   }
// });

// // --------------------
// // OLD GEMINI AI RECOMMENDATION ROUTE (Optional)
// // --------------------
// const oldGenAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

// app.post("/api/recommend", async (req, res) => {
//   try {
//     const { age, gender, event, hobby, relationship, budget } = req.body;
//     if (!age || !gender || !event || !relationship || !budget) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const model = oldGenAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const prompt = `
//       Recommend 3 personalized gifts for Bazario:
//       Age: ${age}, Gender: ${gender}, Event: ${event}, Hobby: ${hobby || "Not specified"}, Relationship: ${relationship}, Budget: ${budget}.
//     `;
//     const result = await model.generateContent(prompt);
//     res.json({ recommendation: result.response.text });
//   } catch (error) {
//     console.error("Gemini AI error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// // --------------------
// // START SERVER
// // --------------------
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });















//for testing  it working for recondation system
// ------------------------------
// ----------------------
// server.js (BAZARIO — FINAL FOR LOCAL MONGODB)
// ----------------------
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import multer from "multer";
// import path from "path";

// import Product from "./models/Product.js";

// // ROUTES
// import authRoutes from "./routes/authRoutes.js";
// import googleAuthRoute from "./routes/googleAuthRoute.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import sellerRouter from "./routes/sellerRoutes.js";
// import mainAdmin from "./routes/mainAdmin.js";
// import userRoutes from "./routes/userRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import supportRoutes from "./routes/support.js";

// dotenv.config();
// connectDB(); // 🔥 This connects to your LOCAL MongoDB Compass

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // -------------------------
// // Multer Uploads
// // -------------------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`),
// });
// const upload = multer({ storage });

// // -------------------------
// // NORMAL ROUTES
// // -------------------------
// app.use("/api/auth", authRoutes);
// app.use("/api/auth", googleAuthRoute);
// app.use("/api/admin", adminRoutes);
// app.use("/api/main-admin", mainAdmin);
// app.use("/api/seller", sellerRouter);
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/support", supportRoutes);

// // -------------------------
// // CATEGORY KEYWORDS
// // -------------------------
// const CATEGORY_LIST = [
//   "watch",
//   "watches",
//   "phone",
//   "mobile",
//   "laptop",
//   "book",
//   "books",
//   "bag",
//   "shoes",
//   "earbuds",
//   "electronics",
//   "car",
// ];

// // -------------------------
// // PRODUCT SEARCH FUNCTION
// // -------------------------
// async function searchProducts(category, pricePref) {
//   const filter = {};

//   if (category) {
//     filter.$or = [
//       { name: { $regex: category, $options: "i" } },
//       { categoryName: { $regex: category, $options: "i" } },
//     ];
//   }

//   // Optional price filters
//   if (pricePref === "budget") filter.price = { $lte: 7000 };
//   if (pricePref === "premium") filter.price = { $gte: 20000 };

//   const products = await Product.find(filter)
//     .limit(8)
//     .select("name price imageUrl description categoryName stock")
//     .lean();

//   return products || [];
// }

// // -------------------------
// // MAIN AI CHAT ENDPOINT (LOCAL LOGIC ONLY)
// // -------------------------
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt missing" });
//     }

//     const lower = prompt.toLowerCase();

//     // OFF-TOPIC DETECTION
//     const offTopics = ["cricket", "football", "politics", "movie", "music"];
//     if (offTopics.some((t) => lower.includes(t))) {
//       return res.json({
//         text: "I can only help with Bazario shopping and product assistance.",
//         structuredProducts: [],
//       });
//     }

//     // CATEGORY DETECT
//     let detectedCategory = null;
//     for (const cat of CATEGORY_LIST) {
//       if (lower.includes(cat)) {
//         detectedCategory = cat;
//         break;
//       }
//     }

//     // PRICE DETECT
//     let pricePref = null;
//     if (lower.includes("budget") || lower.includes("cheap")) pricePref = "budget";
//     if (lower.includes("expensive") || lower.includes("premium"))
//       pricePref = "premium";

//     // Recommendation Intent
//     const recKeywords = ["recommend", "suggest", "gift", "looking for"];
//     const wantsRecommend = recKeywords.some((k) => lower.includes(k));

//     if (wantsRecommend) {
//       if (!detectedCategory) {
//         return res.json({
//           text: "What type of product do you want? (watch, phone, book, etc.)",
//           needInfo: true,
//         });
//       }

//       const results = await searchProducts(detectedCategory, pricePref);

//       if (results.length === 0) {
//         return res.json({
//           text: `Sorry, no products found in Bazario for ${detectedCategory}.`,
//           structuredProducts: [],
//         });
//       }

//       return res.json({
//         text: `I found ${results.length} products for ${detectedCategory}.`,
//         structuredProducts: results,
//       });
//     }

//     // DEFAULT RESPONSE (NO GEMINI)
//     return res.json({
//       text: "I can help with Bazario products, recommendations, and shopping. Ask me anything!",
//       structuredProducts: [],
//     });
//   } catch (err) {
//     console.error("AI ERROR:", err);
//     res.status(500).json({ text: "AI error. Try again later." });
//   }
// });

// // -------------------------
// // START SERVER
// // -------------------------
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () =>
//   console.log(`🚀 Bazario backend running on http://localhost:${PORT}`)
// );






//new one my delte 
// // ----------------------
// // backend/server.js
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import multer from "multer";
// import path from "path";

// import Product from "./models/Product.js";

// // ROUTES (keep your existing route files)
// import authRoutes from "./routes/authRoutes.js";
// import googleAuthRoute from "./routes/googleAuthRoute.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import sellerRouter from "./routes/sellerRoutes.js";
// import mainAdmin from "./routes/mainAdmin.js";
// import userRoutes from "./routes/userRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import supportRoutes from "./routes/support.js";

// dotenv.config();
// connectDB(); // your connectDB should use process.env.MONGO_URI for local Compass

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // Multer (unchanged)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`),
// });
// const upload = multer({ storage });

// // Register routes (unchanged)
// app.use("/api/auth", authRoutes);
// app.use("/api/auth", googleAuthRoute);
// app.use("/api/admin", adminRoutes);
// app.use("/api/main-admin", mainAdmin);
// app.use("/api/seller", sellerRouter);
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/support", supportRoutes);

// // -----------------------------
// // Utilities: local NLP and search
// // -----------------------------

// // Simple stopwords for keyword extraction
// const STOPWORDS = new Set([
//   "i","me","my","we","our","you","your","the","a","an","and","or","for","to","of","in","on","is","are","be","with","please","want","looking","wanting","would","like","help","show","give"
// ]);

// function extractKeywordsLocal(text) {
//   if (!text || typeof text !== "string") return [];
//   const cleaned = text
//     .replace(/[^\w\s]/g, " ") // remove punctuation
//     .toLowerCase();
//   const tokens = cleaned.split(/\s+/).filter(Boolean);
//   const keywords = [];
//   for (const t of tokens) {
//     if (STOPWORDS.has(t)) continue;
//     if (t.length <= 2) continue;
//     // skip numeric tokens like "2025" unless useful
//     if (/^\d+$/.test(t)) continue;
//     keywords.push(t);
//   }
//   // return unique and keep top N
//   return [...new Set(keywords)].slice(0, 8);
// }

// // Gift detection
// function detectGiftIntent(text) {
//   const lower = (text || "").toLowerCase();
//   if (!lower.includes("gift")) return null;
//   // recipient detection
//   const recipients = ["sister","brother","mother","father","mom","dad","wife","husband","friend","son","daughter"];
//   for (const r of recipients) {
//     if (lower.includes(r)) return r;
//   }
//   return "generic";
// }

// // Preferred gift categories fallback (if no direct product matched)
// const GIFT_FALLBACK_CATEGORIES = ["Watches","Bags","Books","Shoes","Electronics","Home & Living","Beauty"];

// // Build MongoDB search filters from keywords
// function buildFiltersFromKeywords(keywords) {
//   if (!keywords || keywords.length === 0) return [];
//   const filters = [];
//   for (const k of keywords) {
//     // regex search in common fields
//     const re = { $regex: k, $options: "i" };
//     filters.push({ name: re });
//     filters.push({ categoryName: re });
//     filters.push({ brand: re });
//     filters.push({ description: re });
//   }
//   return filters;
// }

// // Normalize product objects for frontend (include full image URL)
// function normalizeProducts(products) {
//   return products.map((p) => ({
//     _id: p._id,
//     name: p.name || "Unnamed product",
//     price: p.price ?? 0,
//     categoryName: p.categoryName || "",
//     description: p.description || "",
//     stock: p.stock ?? 0,
//     imageUrl: p.imageUrl ? `http://localhost:${PORT}${p.imageUrl}` : "",
//   }));
// }

// // -----------------------------
// // /api/chat — dynamic recommendations + natural queries
// // -----------------------------
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     if (!prompt || typeof prompt !== "string") {
//       return res.status(400).json({ text: "Please provide a prompt." });
//     }

//     const lower = prompt.toLowerCase();

//     // quick greeting responses (no DB required)
//     if (/\b(hi|hello|hey)\b/.test(lower)) {
//       return res.json({
//         text: "Hi! I'm Bazario Assistant — I can recommend products from our catalog. Try: 'I want a gift for my sister' or 'Recommend a phone under 20000'.",
//         structuredProducts: [],
//       });
//     }

//     // block very off-topic questions politely
//     const offTopics = ["cricket","football","politics","movie","music","history"];
//     if (offTopics.some(t => lower.includes(t))) {
//       return res.json({
//         text: "As the Bazario Assistant, I help with shopping and product recommendations from Bazario only.",
//         structuredProducts: [],
//       });
//     }

//     // 1) detect gift intent
//     const giftRecipient = detectGiftIntent(prompt);
//     if (giftRecipient) {
//       // Extract keywords and try to find products matching recipient or gift terms
//       const keywords = extractKeywordsLocal(prompt); // e.g., ["gift","sister","watch","book"]
//       const filters = buildFiltersFromKeywords(keywords);

//       // Try priority search: include recipient word if present
//       if (giftRecipient && giftRecipient !== "generic") {
//         filters.unshift({ description: { $regex: giftRecipient, $options: "i" } });
//         filters.unshift({ name: { $regex: giftRecipient, $options: "i" } });
//       }

//       // Query DB
//       let products = [];
//       if (filters.length > 0) {
//         products = await Product.find({ $or: filters }).limit(8).lean();
//       }

//       // If nothing found, try fallback by searching popular gift categories that exist in DB
//       if (!products || products.length === 0) {
//         // get distinct categories in DB
//         const dbCats = await Product.distinct("categoryName");
//         const fallbackCats = GIFT_FALLBACK_CATEGORIES.filter(c => dbCats.map(x => String(x).toLowerCase()).includes(String(c).toLowerCase()));

//         if (fallbackCats.length > 0) {
//           products = await Product.find({ categoryName: { $in: fallbackCats } }).limit(8).lean();
//         }
//       }

//       if (!products || products.length === 0) {
//         return res.json({
//           text: `Sorry — I couldn't find specific gift items for "${giftRecipient}" right now. Would you like me to search by price range or category?`,
//           structuredProducts: [],
//         });
//       }

//       return res.json({
//         text: `Here are some gift suggestions for your ${giftRecipient}:`,
//         structuredProducts: normalizeProducts(products),
//       });
//     }

//     // 2) Extract keywords from the prompt and run a broad dynamic search
//     const keywords = extractKeywordsLocal(prompt); // e.g., ["phone","under","20000"] but numbers filtered
//     const filters = buildFiltersFromKeywords(keywords);

//     // If user specified a price like "under 20000", detect it
//     let priceClause = null;
//     const mUnder = prompt.toLowerCase().match(/\bunder\s+([0-9,]+)/);
//     if (mUnder) {
//       const v = Number(mUnder[1].replace(/,/g, ""));
//       if (!Number.isNaN(v)) priceClause = { price: { $lte: v } };
//     }
//     const mBelow = prompt.toLowerCase().match(/\bbelow\s+([0-9,]+)/);
//     if (!priceClause && mBelow) {
//       const v = Number(mBelow[1].replace(/,/g, ""));
//       if (!Number.isNaN(v)) priceClause = { price: { $lte: v } };
//     }

//     // Run DB query if we have some filters
//     let products = [];
//     if (filters.length > 0) {
//       const baseQuery = { $or: filters };
//       const finalQuery = priceClause ? { ...baseQuery, ...priceClause } : baseQuery;
//       products = await Product.find(finalQuery).limit(12).lean();
//     }

//     // If no results, try searching by category words in DB (dynamic category detection)
//     if ((!products || products.length === 0) && keywords.length > 0) {
//       // fetch all categories and try to match keywords to categoryName
//       const dbCats = await Product.distinct("categoryName");
//       const catCandidates = dbCats.filter(cat => {
//         if (!cat) return false;
//         const low = String(cat).toLowerCase();
//         return keywords.some(k => low.includes(k) || k.includes(low));
//       });

//       if (catCandidates.length) {
//         const q = { categoryName: { $in: catCandidates } };
//         if (priceClause) Object.assign(q, priceClause);
//         products = await Product.find(q).limit(12).lean();
//       }
//     }

//     // If still no products, do a broad 'name or description' match for the whole prompt
//     if ((!products || products.length === 0)) {
//       const re = { $regex: prompt.replace(/[^\w\s]/g, " ").trim(), $options: "i" };
//       products = await Product.find({ $or: [{ name: re }, { description: re }] }).limit(12).lean();
//     }

//     // Final fallback — no products found
//     if (!products || products.length === 0) {
//       return res.json({
//         text: "I couldn't find matching items in Bazario for that query. Try specifying a category (e.g., 'phone', 'watch') or a price range like 'under 20000'.",
//         structuredProducts: [],
//       });
//     }

//     // Normalize and return
//     const normalized = normalizeProducts(products);
//     return res.json({
//       text: `I found ${normalized.length} product(s) that match your request.`,
//       structuredProducts: normalized,
//     });
//   } catch (err) {
//     console.error("Chat error:", err);
//     return res.status(500).json({
//       text: "Sorry — the assistant had an error. Try again.",
//       structuredProducts: [],
//     });
//   }
// });

// // Optional separate /api/recommend endpoint (same logic, can be used by frontend)
// app.post("/api/recommend", async (req, res) => {
//   // simply forward to /api/chat logic
//   return app._router.handle(req, res, () => {}, "/api/chat", "POST");
// });

// // START
// app.listen(PORT, () => {
//   console.log(`Bazario backend running on http://localhost:${PORT}`);
// });









//abi wala 

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import multer from "multer";
import path from "path";
import OpenAI from "openai";

<<<<<<< HEAD
import Product from "./models/Product.js";

// ROUTES (your existing routes)
=======
// --- GEMINI TOOL USE (AI Assistant) ---
import { GoogleGenAI } from "@google/genai";
import { toolDeclarations } from "./geminiTools.js";

// ROUTES
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
import authRoutes from "./routes/authRoutes.js";
import googleAuthRoute from "./routes/googleAuthRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import sellerRouter from "./routes/sellerRoutes.js";
import mainAdmin from "./routes/mainAdmin.js";
import userRoutes from "./routes/userRoutes.js";
<<<<<<< HEAD
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import supportRoutes from "./routes/support.js";
=======
import Product from "./routes/product.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import supportRoutes from "./routes/support.js"; // ✅ ADDED
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219

dotenv.config();
connectDB();

const app = express();
<<<<<<< HEAD
const PORT = process.env.PORT || 8080;

// ----------------------
// MIDDLEWARE
// ----------------------
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
=======

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// --------------------
// ROUTE MIDDLEWARE
// --------------------
app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/seller", sellerRouter);
app.use("/api/main-admin", mainAdmin);
app.use("/api/users", userRoutes);
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
app.use("/uploads", express.static("uploads"));

// ----------------------
// MULTER
// ----------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});
multer({ storage });

// ----------------------
// OPENAI SETUP
// ----------------------
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ----------------------
// ROUTES
// ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/main-admin", mainAdmin);
app.use("/api/seller", sellerRouter);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
<<<<<<< HEAD
app.use("/api/support", supportRoutes);

// ----------------------
// AI CHAT + MONGODB GIFT RECOMMENDATION
// ----------------------
=======

// ✅ ADD SUPPORT ROUTE
app.use("/api/support", supportRoutes);

// --------------------
// GEMINI AI CHAT
// --------------------

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-2.5-flash";

const BAZARIO_SYSTEM_INSTRUCTION = `
You are 'Bazario Assistant', an AI designed exclusively for the Bazario e-commerce platform.
Your tone must be helpful, professional, and friendly.

STRICT RULES:
1. You must only talk about e-commerce, orders, shopping assistance, or Bazario.
2. If asked something outside e-commerce, reply:
   "As the Bazario Assistant, my purpose is limited to assisting you with e-commerce needs."
3. Use tools for product recommendation and order tracking when requested.
`;

const get_recommendations = (category, preference, marketplace_model) => {
  if (category?.toLowerCase().includes("book")) {
    return JSON.stringify({
      products: [{ name: "Novel: The Bazario Saga", price: "PKR 1,500" }],
      message: "Found classic and modern novels matching your query.",
    });
  }
  return JSON.stringify({
    products: [
      { name: "Curated Rug", price: "PKR 4,999", model: "Direct Retail" },
      { name: "Vintage Camera Lens", price: "PKR 12,000", model: "Second-Hand" },
    ],
    message: "Found several items matching your criteria in the catalog.",
  });
};

const track_order = (order_id) => {
  if (order_id.includes("BAZ")) {
    return JSON.stringify({
      status: "Shipped",
      location: "Lahore Hub",
      eta: "Dec 7, 2025",
    });
  } else {
    return JSON.stringify({
      status: "Order ID Not Found",
      eta: "Please check your ID",
    });
  }
};

const availableTools = {
  get_recommendations,
  track_order,
};

>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
app.post("/api/chat", async (req, res) => {
  const { prompt, history } = req.body;

  const contents = [...(history || []), { role: "user", parts: [{ text: prompt }] }];

  try {
<<<<<<< HEAD
    const { prompt, conversation = {} } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        text: "Please enter a valid message.",
        structuredProducts: [],
        conversation,
      });
    }

    // Step 1: Ask AI to understand gift intent
    const aiPrompt = `
You are an AI gift assistant. The user may want to buy a gift.

From the message, extract:
- giftRecipient (e.g., brother, sister, wife, father, mother)
- categoryName (e.g., Shoes, Electronics, Bags, Novels) if mentioned
- maxPrice (number in PKR, if mentioned)

Respond ONLY in JSON like this:
{
  "giftRecipient": "",
  "categoryName": "",
  "maxPrice": null
}

User message: "${prompt}"
`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: aiPrompt }],
    });

    const aiData = JSON.parse(aiResponse.choices[0].message.content);

    let responseText = "";
    let products = [];

    // If categoryName not provided, ask user what type of gift
    if (!aiData.categoryName) {
      responseText = `What type of gift would you like for your ${aiData.giftRecipient}? (e.g., Shoes, Bags, Novels, Electronics)`;
      return res.json({ text: responseText, structuredProducts: [], conversation: { ...conversation, giftRecipient: aiData.giftRecipient } });
    }

    // Step 2: Build MongoDB query
    const query = {};
    if (aiData.categoryName) query.categoryName = { $regex: aiData.categoryName, $options: "i" };
    if (aiData.maxPrice) query.price = { $lte: aiData.maxPrice };

    products = await Product.find(query).limit(3).lean();

    if (!products.length) {
      responseText = `Sorry, we don't have any ${aiData.categoryName} for your ${aiData.giftRecipient} right now.`;
      return res.json({ text: responseText, structuredProducts: [], conversation });
    }

    // Normalize product data
    const structuredProducts = products.map(p => ({
      _id: p._id,
      name: p.name,
      price: p.price,
      categoryName: p.categoryName,
      description: p.description,
      imageUrl: p.imageUrl ? `http://localhost:${PORT}${p.imageUrl}` : "",
      stock: p.stock,
    }));

    responseText = `Here are some ${aiData.categoryName} for your ${aiData.giftRecipient} 👇`;

    return res.json({ text: responseText, structuredProducts, conversation });

  } catch (error) {
    console.error("AI Chat Error:", error);
    return res.status(500).json({
      text: "AI recommendation failed. Try again later.",
      structuredProducts: [],
      conversation: {},
    });
  }
});

// ----------------------
// SERVER START
// ----------------------
app.listen(PORT, () => {
  console.log(`✅ Bazario backend running on http://localhost:${PORT}`);
});
=======
    let response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: BAZARIO_SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: toolDeclarations }],
      },
    });

    if (response.functionCalls?.length > 0) {
      const fc = response.functionCalls[0];
      const functionName = fc.name;
      const args = fc.args;

      const toolOutput = availableTools[functionName](...Object.values(args));

      const secondCall = [
        ...contents,
        { role: "model", parts: [{ functionCall: fc }] },
        {
          role: "function",
          parts: [
            {
              functionResponse: {
                name: functionName,
                response: { result: toolOutput },
              },
            },
          ],
        },
      ];

      response = await ai.models.generateContent({
        model: MODEL,
        contents: secondCall,
        config: { systemInstruction: BAZARIO_SYSTEM_INSTRUCTION },
      });
    }

    const newHistory = [...contents, { role: "model", parts: [{ text: response.text }] }];

    res.json({
      text: response.text,
      newHistory,
    });
  } catch (error) {
    console.error("Gemini AI Chat Error:", error);
    res.status(500).json({
      text: "I'm sorry, the Bazario Assistant is currently unavailable.",
    });
  }
});

// --------------------
// OLD RECOMMEND ROUTE
// --------------------
const oldGenAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

app.post("/api/recommend", async (req, res) => {
  try {
    const { age, gender, event, hobby, relationship, budget } = req.body;

    if (!age || !gender || !event || !relationship || !budget)
      return res.status(400).json({ error: "Missing required fields" });

    const model = oldGenAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Based on the following user details, recommend a personalized gift:
Age: ${age}, Gender: ${gender}, Event: ${event}, Hobby: ${
      hobby || "Not specified"
    }, Relationship: ${relationship}, Budget: ${budget}.
Suggest 3 items available on Bazario.
`;

    const result = await model.generateContent(prompt);

    res.json({ recommendation: result.response.text });
  } catch (error) {
    console.error("Gemini AI error:", error);
    res.status(500).json({ error: error.message });
  }
});

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // console.log(`Server running on http://localhost:${PORT}`);
});














// // D:\study\fyp\code\fyp\backend\server.js - UPDATED CODE

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// // --- NEW IMPORTS FOR GEMINI TOOL USE ---
// import { GoogleGenAI, Type } from "@google/genai";
// import { toolDeclarations } from './geminiTools.js'; 
// // Note: We use the specific '@google/genai' SDK for tool use
// // If you use 'GoogleGenerativeAI' from another package, adjust as needed

// import authRoutes from "./routes/authRoutes.js";
// import googleAuthRoute from "./routes/googleAuthRoute.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import sellerRouter from "./routes/sellerRoutes.js";
// import mainAdmin from "./routes/mainAdmin.js";
// import userRoutes from "./routes/userRoutes.js"; 
// import Product from "./routes/product.js";
// import productRoutes from "./routes/productRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js"; 

// // --------------------
// // CONFIG
// // --------------------
// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors({ 
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
// app.use(express.json());

// // --------------------
// // ROUTE MIDDLEWARE
// // --------------------
// app.use("/api/auth", authRoutes); 
// app.use("/api/auth", googleAuthRoute);  
// app.use("/api/admin", adminRoutes);
// app.use("/api/seller", sellerRouter);
// app.use("/api/main-admin", mainAdmin);
// app.use("/api/users", userRoutes); 
// app.use("/uploads", express.static("uploads"));
// app.use("/api/products", Product);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes); 

// // ----------------------------------------------------
// // 🧠 GEMINI AI TOOL USE: CONVERSATIONAL ASSISTANT
// // ----------------------------------------------------

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// const MODEL = 'gemini-2.5-flash';

// // 1. SYSTEM INSTRUCTION (Persona & Guardrails)
// const BAZARIO_SYSTEM_INSTRUCTION = `
// You are 'Bazario Assistant', an AI designed exclusively for the Bazario e-commerce platform.
// Your tone must be helpful, professional, and friendly, focusing on sales and support related to e-commerce.

// STRICT RULES:
// 1. Identity: Always refer to yourself as the 'Bazario Assistant'.
// 2. Scope: Only answer questions related to e-commerce, Bazario products, order status, or the unique marketplace models.
// 3. Guardrail: If asked about non-e-commerce topics, respond politely with: "As the Bazario Assistant, my purpose is limited to assisting you with e-commerce needs."
// 4. Tool Priority: If the user asks for product recommendations or order tracking, you MUST use the provided tools (functions) to extract the necessary parameters before replying.
// `;

// // 2. BACKEND FUNCTIONS (MOCK DATA - REPLACE WITH YOUR DB LOGIC)
// const get_recommendations = (category, preference, marketplace_model) => {
//   // *** YOUR ACTUAL LOGIC FOR QUERYING THE Product MODEL GOES HERE ***
//   // console.log([DB Call] Searching for ${preference} ${category}...);
  
//   // Example data (The AI will format this)
//   if (category.toLowerCase().includes("book")) {
//     return JSON.stringify({ 
//         products: [{ name: "Novel: The Bazario Saga", price: "PKR 1,500" }], 
//         message: "Found classic and modern novels matching your query." 
//     });
//   }
//   return JSON.stringify({
//     products: [
//       { name: "Curated Rug", price: "PKR 4,999", model: "Direct Retail" },
//       { name: "Vintage Camera Lens", price: "PKR 12,000", model: "Second-Hand" }
//     ],
//     message: "Found several items matching your criteria in the catalog."
//   });
// };

// const track_order = (order_id) => {
//   // *** YOUR ACTUAL LOGIC FOR QUERYING THE Order MODEL GOES HERE ***
//   // console.log([DB Call] Tracking order ID: ${order_id});

//   if (order_id.includes("BAZ")) {
//     return JSON.stringify({ status: "Shipped", location: "Lahore Hub", eta: "Dec 7, 2025" });
//   } else {
//     return JSON.stringify({ status: "Order ID Not Found", eta: "Please check your ID" });
//   }
// };

// const availableTools = {
//   get_recommendations: get_recommendations,
//   track_order: track_order,
// };

// // 3. NEW UNIFIED CHAT API ENDPOINT
// app.post('/api/chat', async (req, res) => {
//   const { prompt, history } = req.body; 
  
//   const contents = [
//       ...(history || []), // Ensure history is treated as an array
//       { role: "user", parts: [{ text: prompt }] } 
//   ];

//   try {
//     let response = await ai.models.generateContent({
//       model: MODEL,
//       contents: contents,
//       config: {
//         systemInstruction: BAZARIO_SYSTEM_INSTRUCTION,
//         tools: [{ functionDeclarations: toolDeclarations }],
//       },
//     });

//     // --- TOOL USE LOOP: Check if the AI wants to call a function ---
//     if (response.functionCalls && response.functionCalls.length > 0) {
//       const fc = response.functionCalls[0];
//       const functionName = fc.name;
//       const functionArgs = fc.args;

//       // Execute the local Bazario function
//       const toolOutput = availableTools[functionName](...Object.values(functionArgs));
      
//       // Call the AI again with the function result
//       const secondCallContents = [
//         ...contents, 
//         { role: "model", parts: [{ functionCall: fc }] },
//         { role: "function", parts: [{ functionResponse: { name: functionName, response: { result: toolOutput } } }] }
//       ];

//       response = await ai.models.generateContent({
//         model: MODEL,
//         contents: secondCallContents,
//         config: {
//           systemInstruction: BAZARIO_SYSTEM_INSTRUCTION,
//         },
//       });
//     }

//     // Final response history update
//     const newHistory = [...contents, { role: "model", parts: [{ text: response.text }] }];

//     res.json({
//       text: response.text,
//       newHistory: newHistory
//     });

//   } catch (error) {
//     console.error("Gemini AI Chat Error:", error);
//     res.status(500).json({ text: "I'm sorry, the Bazario Assistant is currently unavailable." });
//   }
// });


// // ----------------------------------------------------
// // GEMINI AI GIFT RECOMMENDATION (OLD ROUTE - KEPT FOR REFERENCE)
// // ----------------------------------------------------
// const oldGenAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

// app.post("/api/recommend", async (req, res) => {
//   // This route is separate, non-conversational, and relies on a structured form input.
//   // It is fine to keep it if you need a specific, non-chat-based recommender endpoint.
//   try {
//     const { age, gender, event, hobby, relationship, budget } = req.body;

//     if (!age || !gender || !event || !relationship || !budget) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const model = oldGenAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `
//       Based on the following user details, recommend a personalized gift:
//       Age: ${age}, Gender: ${gender}, Event: ${event}, Hobby: ${hobby || "Not specified"}, Relationship: ${relationship}, Budget: ${budget}.
//       Suggest 3 items available on Bazario.
//     `;

//     const result = await model.generateContent(prompt);
//     const recommendation = result.response.text;
//     res.json({ recommendation });
//   } catch (error) {
//     console.error("Gemini AI error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });


// // --------------------
// // START SERVER
// // --------------------
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//  // console.log(Server running on http://localhost:${PORT});
// });





























// //last one
// // server.js
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// // --------------------
// // ROUTE IMPORTS
// // --------------------
// import authRoutes from "./routes/authRoutes.js";
// import googleAuthRoute from "./routes/googleAuthRoute.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import sellerRouter from "./routes/sellerRoutes.js";
// import mainAdmin from "./routes/mainAdmin.js";
// import userRoutes from "./routes/userRoutes.js"; 
// import Product from "./models/Product.js"; // Your Mongoose model
// import productRoutes from "./routes/productRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js"; 
// import reportRoutes from "./routes/reportRoutes.js";
// import supportRoutes from "./routes/support.js";

// // --------------------
// // GEMINI AI TOOL IMPORTS
// // --------------------
// import { GoogleGenAI } from "@google/genai";
// import { toolDeclarations } from './geminiTools.js'; 

// // --------------------
// // CONFIG
// // --------------------
// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors({ 
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // --------------------
// // ROUTE MIDDLEWARE
// // --------------------
// app.use("/api/auth", authRoutes); 
// app.use("/api/auth", googleAuthRoute);  
// app.use("/api/admin", adminRoutes);
// app.use("/api/seller", sellerRouter);
// app.use("/api/main-admin", mainAdmin);
// app.use("/api/users", userRoutes); 
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes); 
// app.use("/api/support", supportRoutes);
// app.use("/api/reports", reportRoutes);

// // --------------------
// // GEMINI AI CHAT CONFIG
// // --------------------
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// const MODEL = "gemini-2.5-flash";

// const BAZARIO_SYSTEM_INSTRUCTION = `
// You are 'Bazario Assistant', an AI designed exclusively for the Bazario e-commerce platform.
// Your tone must be helpful, professional, and friendly, focusing on sales and support related to e-commerce.

// STRICT RULES:
// 1. Identity: Always refer to yourself as the 'Bazario Assistant'.
// 2. Scope: Only answer questions related to e-commerce, Bazario products, order status, or marketplace models.
// 3. Guardrail: If asked about non-e-commerce topics, respond politely with: "As the Bazario Assistant, my purpose is limited to assisting you with e-commerce needs."
// 4. Tool Priority: If the user asks for product recommendations or order tracking, you MUST use the provided tools to extract the parameters before replying.
// `;

// // --------------------
// // BACKEND FUNCTIONS FOR AI TOOLS
// // --------------------

// // Get product recommendations from MongoDB
// const get_recommendations = async (category, preference, marketplace_model) => {
//     const cat = category.toLowerCase();
//     const pref = preference ? preference.toLowerCase() : "";

//     // MongoDB query using correct field
//     const query = {
//         categoryName: { $regex: cat, $options: 'i' }
//     };

//     // Price filters based on preference
//     if (pref.includes('budget')) query.price = { $lt: 5000 };
//     if (pref.includes('high-end')) query.price = { $gt: 20000 };

//     // Marketplace model filter
//     if (marketplace_model) query.marketplaceModel = marketplace_model;

//     console.log(`[DB Query] Searching products with filter: ${JSON.stringify(query)}`);

//     try {
//         let products = await Product.find(query)
//             .limit(5)
//             .select('name price imageUrl')
//             .lean();

//         // Fallback for electronics if no products found
//         if (products.length === 0 && cat.includes("electronics")) {
//             products = await Product.find({ categoryName: { $in: ["watch", "phone", "earbuds"] } })
//                 .limit(5)
//                 .select('name price imageUrl')
//                 .lean();
//         }

//         if (products.length === 0) {
//             return JSON.stringify({
//                 status: "Fallback",
//                 message: `Could not find exact products for ${category}, showing default recommendations.`,
//                 products: [
//                     { name: "Smart Watch", price: 8500, imageUrl: "/uploads/default-watch.jpg" },
//                     { name: "Wireless Earbuds", price: 5200, imageUrl: "/uploads/default-earbuds.jpg" },
//                     { name: "Power Bank", price: 2000, imageUrl: "/uploads/default-powerbank.jpg" }
//                 ]
//             });
//         }

//         return JSON.stringify({
//             status: "Success",
//             message: `Found ${products.length} recommendations.`,
//             products: products
//         });

//     } catch (error) {
//         console.error("MongoDB Query Error (Recommendations):", error);
//         return JSON.stringify({
//             status: "Error",
//             details: "Database connection failed during product search."
//         });
//     }
// };

// // Track order mock
// const track_order = (order_id) => {
//   console.log(`[DB Call] Tracking order ID: ${order_id}`);
//   if (order_id.includes("BAZ")) {
//     return JSON.stringify({ status: "Shipped", location: "Lahore Hub", eta: "Dec 7, 2025" });
//   } else {
//     return JSON.stringify({ status: "Order ID Not Found", eta: "Please check your ID" });
//   }
// };

// const availableTools = {
//   get_recommendations,
//   track_order,
// };

// // --------------------
// // CHAT ENDPOINT
// // --------------------
// app.post("/api/chat", async (req, res) => {
//   const { prompt, history } = req.body;
//   const contents = [
//     ...(history || []),
//     { role: "user", parts: [{ text: prompt }] }
//   ];

//   try {
//     let response = await ai.models.generateContent({
//       model: MODEL,
//       contents,
//       config: { systemInstruction: BAZARIO_SYSTEM_INSTRUCTION, tools: [{ functionDeclarations: toolDeclarations }] }
//     });

//     // Handle function calls from AI
//     if (response.functionCalls?.length > 0) {
//       const fc = response.functionCalls[0];
//       const toolOutput = await availableTools[fc.name](...Object.values(fc.args));

//       const secondCallContents = [
//         ...contents,
//         { role: "model", parts: [{ functionCall: fc }] },
//         { role: "function", parts: [{ functionResponse: { name: fc.name, response: { result: toolOutput } } }] }
//       ];

//       response = await ai.models.generateContent({
//         model: MODEL,
//         contents: secondCallContents,
//         config: { systemInstruction: BAZARIO_SYSTEM_INSTRUCTION }
//       });
//     }

//     const newHistory = [...contents, { role: "model", parts: [{ text: response.text }] }];
//     res.json({ text: response.text, newHistory });
//   } catch (error) {
//     console.error("Gemini AI Chat Error:", error);
//     res.status(500).json({ text: "I'm sorry, the Bazario Assistant is currently unavailable." });
//   }
// });

// // --------------------
// // OLD GEMINI AI RECOMMENDATION ROUTE (Optional)
// // --------------------
// const oldGenAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

// app.post("/api/recommend", async (req, res) => {
//   try {
//     const { age, gender, event, hobby, relationship, budget } = req.body;
//     if (!age || !gender || !event || !relationship || !budget) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const model = oldGenAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const prompt = `
//       Recommend 3 personalized gifts for Bazario:
//       Age: ${age}, Gender: ${gender}, Event: ${event}, Hobby: ${hobby || "Not specified"}, Relationship: ${relationship}, Budget: ${budget}.
//     `;
//     const result = await model.generateContent(prompt);
//     res.json({ recommendation: result.response.text });
//   } catch (error) {
//     console.error("Gemini AI error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// // --------------------
// // START SERVER
// // --------------------
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
