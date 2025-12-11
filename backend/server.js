
 // this new for support 

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// --- GEMINI TOOL USE (AI Assistant) ---
import { GoogleGenAI } from "@google/genai";
import { toolDeclarations } from "./geminiTools.js";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import googleAuthRoute from "./routes/googleAuthRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import sellerRouter from "./routes/sellerRoutes.js";
import mainAdmin from "./routes/mainAdmin.js";
import userRoutes from "./routes/userRoutes.js";
import Product from "./routes/product.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import supportRoutes from "./routes/support.js"; // ✅ ADDED

dotenv.config();
connectDB();

const app = express();

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
app.use("/uploads", express.static("uploads"));
app.use("/api/products", Product);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

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

app.post("/api/chat", async (req, res) => {
  const { prompt, history } = req.body;

  const contents = [...(history || []), { role: "user", parts: [{ text: prompt }] }];

  try {
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
