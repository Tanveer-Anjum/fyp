// D:\study\fyp\code\fyp\backend\geminiTools.js

import { Type } from '@google/genai';

// Tool 1: AI Recommendation (Module 2)
export const getRecommendationsDeclaration = {
  name: 'get_recommendations',
  description: 'Retrieves a list of personalized product recommendations from the Bazario catalog based on user query and preferences.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      category: {
        type: Type.STRING,
        description: 'The main type of product (e.g., electronics, furniture, books, clothing).',
      },
      preference: {
        type: Type.STRING,
        description: 'A subjective filter (e.g., eco-friendly, high-end, budget, unique).',
      },
      marketplace_model: {
        type: Type.STRING,
        enum: ['direct-retail', 'second-hand', 'rental', 'print-on-demand'],
        description: 'The desired sale model (optional).',
      },
    },
    required: ['category'], 
  },
};

// Tool 2: Order Tracking (Module 3)
export const trackOrderDeclaration = {
  name: 'track_order',
  description: 'Looks up the real-time processing and shipping status for a specific customer order.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      order_id: {
        type: Type.STRING,
        description: 'The unique tracking number (e.g., BAZ12345).',
      },
    },
    required: ['order_id'],
  },
};

export const toolDeclarations = [getRecommendationsDeclaration, trackOrderDeclaration];