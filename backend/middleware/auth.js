// // middleware/auth.js
// import jwt from "jsonwebtoken";

// export default function auth(req, res, next) {
//   try {
//     // Get token from Authorization header
//     const authHeader = req.header("Authorization");
//     if (!authHeader) {
//       return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     // Bearer tokenString
//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

//     // Attach user info to request
//     req.user = decoded; // decoded contains { id: seller._id, role: "seller" }

//     next();
//   } catch (err) {
//     console.error("Auth middleware error:", err);
//     return res.status(401).json({ message: "Token is not valid" });
//   }
// }









// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ success: false, message: "No token provided" });

//   const token = authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ success: false, message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.id, role: decoded.role };
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(403).json({ success: false, message: "Invalid token" });
//   }
// };






// import jwt from "jsonwebtoken";

// const auth = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader)
//       return res.status(401).json({ message: "No token provided" });

//     const token = authHeader.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Token missing" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default auth;
















// backend/middleware/auth.js
import jwt from "jsonwebtoken";

 const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // "Bearer TOKEN"
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
export default auth;
