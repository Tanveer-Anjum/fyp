// import admin from "firebase-admin";
import admin from "../firebaseAdmin.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Firebase Admin SDK
const serviceAccount = path.join(__dirname, "../firebase-service-account.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const verifyGoogleToken = async (token) => {
  try {
    const decoded = await admin.auth().verifyIdToken(token);

    return {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name,
    };
  } catch (error) {
    console.error("Google token verification failed:", error);
    return null;
  }
};
