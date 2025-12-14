// routes/aiRoutes.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/Product.js";

const router = express.Router();

// Gemini model setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// -------------------------------
// PRODUCT RECOMMENDATION FUNCTION
// -------------------------------
const get_recommendations = async (category, preference) => {
  try {
    const query = { categoryName: { $regex: category, $options: "i" } };

    if (preference?.includes("budget")) query.price = { $lt: 5000 };
    if (preference?.includes("high-end")) query.price = { $gt: 20000 };

    const products = await Product.find(query)
      .limit(5)
      .select("name price imageUrl")
      .lean();

    return products;
  } catch (err) {
    console.error("DB ERROR:", err);
    return [];
  }
};

// -------------------------------
// AI CHAT
// -------------------------------
router.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const ai = await model.generateContent(prompt);
    const textResponse = ai.response.text();

    // Extract product category (simple)
    const extractCategory = textResponse.match(/category:\s*(\w+)/i);
    let category = extractCategory ? extractCategory[1] : null;

    let recommendedProducts = [];

    if (category) {
      recommendedProducts = await get_recommendations(category, "budget");
    }

    res.json({
      text: textResponse,
      products: recommendedProducts,
    });

  } catch (error) {
    console.error("AI CHAT ERROR:", error);
    res.status(500).json({ text: "AI service is unavailable right now." });
  }
});

export default router;
