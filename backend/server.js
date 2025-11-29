


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import googleAuthRoute from "./routes/googleAuthRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import sellerRouter from "./routes/sellerRoutes.js";
import mainAdmin from "./routes/mainAdmin.js";






import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --------------------
// CONFIG
// --------------------
dotenv.config();
connectDB();

const app = express();
app.use(cors({ 
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());


// --------------------
// AUTH ROUTES
// --------------------
app.use("/api/auth", authRoutes); 
app.use("/api/auth", googleAuthRoute);  
app.use("/api/admin", adminRoutes);
app.use("/api/seller", sellerRouter);
app.use("/api/main-admin", mainAdmin);
// Admin routes
   


// --------------------
// HuggingFace Chatbot
// --------------------
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mahazkhan12345654321/tinyllama-1b-bazario",
      { inputs: `You are a helpful Bazario shopping assistant. ${message}` },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );

    const botReply = response.data[0]?.generated_text || "⚠ Sorry, I didn't understand.";
    res.json({ reply: botReply });
  } catch (error) {
    console.error("Chatbot error:", error.response?.data || error.message);
    res.status(500).json({ error: "Chatbot error" });
  }
});

// --------------------
// Gemini AI Gift Recommendation
// --------------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/recommend", async (req, res) => {
  try {
    const { age, gender, event, hobby, relationship, budget } = req.body;

    if (!age || !gender || !event || !relationship || !budget) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Based on the following user details, recommend a personalized gift:

      Age: ${age}
      Gender: ${gender}
      Event: ${event}
      Hobby: ${hobby || "Not specified"}
      Relationship: ${relationship}
      Budget: ${budget}

      Suggest 3 items.
    `;

    const result = await model.generateContent(prompt);
    const recommendation = result.response.text();
    res.json({ recommendation });
  } catch (error) {
    console.error("Gemini AI error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});






