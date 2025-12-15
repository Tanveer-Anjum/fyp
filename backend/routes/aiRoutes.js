import express from "express";
import OpenAI from "openai";
import Product from "../models/Product.js";

const router = express.Router();

// -------------------
// OPENAI SETUP
// -------------------
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// -------------------
// AI CHAT ROUTE
// -------------------
router.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      text: "Prompt is required",
      structuredProducts: [],
    });
  }

  try {
    // 1️⃣ Extract intent using AI
    const aiPrompt = `
You are an AI shopping assistant.

Extract from the user message:
- categoryName
- maxPrice (number, PKR)
- brand
- categoryType ("New" or "Old")

Respond ONLY in JSON:
{
  "categoryName": "",
  "maxPrice": null,
  "brand": "",
  "categoryType": ""
}

User message: "${prompt}"
`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: aiPrompt }],
    });

    const intent = JSON.parse(aiResponse.choices[0].message.content);

    // 2️⃣ Build MongoDB query
    const query = {};

    if (intent.categoryName) {
      query.categoryName = { $regex: intent.categoryName, $options: "i" };
    }

    if (intent.brand) {
      query.brand = { $regex: intent.brand, $options: "i" };
    }

    if (intent.categoryType) {
      query.categoryType = intent.categoryType;
    }

    if (intent.maxPrice) {
      query.price = { $lte: intent.maxPrice };
    }

    let products = await Product.find(query)
      .limit(8)
      .select(
        "name price imageUrl categoryName brand rating stock description"
      )
      .lean();

    // fallback if no products found
    if (!products.length) {
      products = await Product.find().limit(8).lean();
    }

    // 3️⃣ Response
    res.json({
      text: "Here are the best products for you 👇",
      structuredProducts: products,
    });

  } catch (error) {
    console.error("❌ AI ERROR:", error);
    res.status(500).json({
      text: "AI service is unavailable",
      structuredProducts: [],
    });
  }
});

export default router;
