// export function getUserInitial() {
//   const email = localStorage.getItem("userEmail");
//   if (!email) return null;

//   // If email = "tanveer@gmail.com" → return "T"
//  return email.split("@")[0].substring(0, 3).toUpperCase();
// }

// export function isLoggedIn() {
//   const tokenData = JSON.parse(localStorage.getItem("authToken"));
//   if (!tokenData) return false;

//   return new Date().getTime() < tokenData.expiry;
// }








// // src/utils/auth.js

//  //Save token and user info in localStorage
// export const saveAuth = (token, user, expirySeconds = 15) => {
//   const tokenData = {
//     token,
//     expiry: new Date().getTime() + expirySeconds * 1000, // e.g. 15 sec
//   };

//   localStorage.setItem("authToken", JSON.stringify(tokenData));
//   localStorage.setItem("user", JSON.stringify(user)); // keep user info separately
// };

// // Check if token is valid
// export const isLoggedIn = () => {
//   const tokenData = JSON.parse(localStorage.getItem("authToken"));
//   if (!tokenData) return false;

//   return new Date().getTime() < tokenData.expiry; // true if still valid
// };

// // ✅ Always return user (even if token expired)
// export const getUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };

// // ✅ Get first name / email prefix
// export const getUserInitial = () => {
//   const user = getUser();
//   if (!user) return null;

//   if (user.name) return user.name.split(" ")[0];
//   if (user.email) return user.email.split("@")[0];
//   return null;
// };

// // ✅ Clear everything (logout)
// export const logout = () => {
//   localStorage.removeItem("authToken");
//   localStorage.removeItem("user");
// };


















// // src/utils/auth.js

// // Save token + user info with optional expiry in seconds (default 20s)
// export const saveAuth = (token, user, expirySeconds = 20) => {
//   const tokenData = {
//     token,
//     expiry: new Date().getTime() + expirySeconds * 1000, // expiry timestamp
//   };

//   localStorage.setItem("authToken", JSON.stringify(tokenData));
//   localStorage.setItem("user", JSON.stringify(user));
// };

// // Check if token is valid
// export const isLoggedIn = () => {
//   const tokenData = JSON.parse(localStorage.getItem("authToken"));
//   if (!tokenData) return false;

//   if (new Date().getTime() > tokenData.expiry) {
//     logout(); // auto logout if expired
//     return false;
//   }

//   return true;
// };

// // Get user info (even if token expired)
// export const getUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };

// // Get first name or email prefix
// export const getUserInitial = () => {
//   const user = getUser();
//   if (!user) return null;

//   if (user.name) return user.name.split(" ")[0];
//   if (user.email) return user.email.split("@")[0];
//   return null;
// };

// // Logout and clear storage
// export const logout = () => {
//   localStorage.removeItem("authToken");
//   localStorage.removeItem("user");
// };

// // Check expiry manually (call in Navbar interval)
// export const checkExpiry = () => {
//   const tokenData = JSON.parse(localStorage.getItem("authToken"));
//   if (tokenData && new Date().getTime() > tokenData.expiry) {
//     logout();
//     window.dispatchEvent(new Event("storage")); // trigger update in Navbar
//   }
// };















// src/utils/auth.js

// // Save token + user info with optional expiry in seconds (default 7 days)
// export const saveAuth = (token, user, expirySeconds = 7 * 24 * 60 * 60) => {
//   const tokenData = {
//     token,
//     expiry: new Date().getTime() + expirySeconds * 1000, // expiry timestamp
//   };

//   localStorage.setItem("authToken", JSON.stringify(tokenData));
//   localStorage.setItem("user", JSON.stringify(user));
// };

// // Check if token is valid
// export const isLoggedIn = () => {
//   const tokenData = JSON.parse(localStorage.getItem("authToken"));
//   if (!tokenData) return false;

//   if (new Date().getTime() > tokenData.expiry) {
//     logout(); // auto logout if expired
//     return false;
//   }

//   return true;
// };

// // Get user info (even if token expired)
// export const getUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };

// // Get first name or email prefix
// export const getUserInitial = () => {
//   const user = getUser();
//   if (!user) return null;

//   if (user.name) return user.name.split(" ")[0];
//   if (user.email) return user.email.split("@")[0];
//   return null;
// };

// // Logout and clear storage
// export const logout = () => {
//   localStorage.removeItem("authToken");
//   localStorage.removeItem("user");
// };

// // Check expiry manually (call in Navbar interval)
// export const checkExpiry = () => {
//   const tokenData = JSON.parse(localStorage.getItem("authToken"));
//   if (tokenData && new Date().getTime() > tokenData.expiry) {
//     logout();
//     window.dispatchEvent(new Event("storage")); // trigger update in Navbar
//   }
// };


















// // Save token + user info with optional expiry (7 days default)
// export const saveAuth = (token, user, expirySeconds = 7 * 24 * 60 * 60) => {
//   const tokenData = {
//     token,
//     expiry: Date.now() + expirySeconds * 1000,
//   };

//   localStorage.setItem("authToken", JSON.stringify(tokenData));
//   localStorage.setItem("user", JSON.stringify(user));
// };

// // Check login validity
// export const isLoggedIn = () => {
//   const tokenData = JSON.parse(localStorage.getItem("authToken"));
//   if (!tokenData) return false;

//   if (Date.now() > tokenData.expiry) {
//     logout();
//     return false;
//   }
//   return true;
// };

// // Get user object
// export const getUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };

// // Get user's first name (fallback to email prefix)
// export const getUserInitial = () => {
//   const user = getUser();
//   if (!user) return null;

//   if (user.name) return user.name.split(" ")[0];
//   if (user.email) return user.email.split("@")[0];
//   return null;
// };

// // Logout
// export const logout = () => {
//   localStorage.removeItem("authToken");
//   localStorage.removeItem("user");
// };

// // Expiry check
// export const checkExpiry = () => {
//   const tokenData = JSON.parse(localStorage.getItem("authToken"));
//   if (tokenData && Date.now() > tokenData.expiry) {
//     logout();
//     window.dispatchEvent(new Event("storage"));
//   }
// };










// frontend/src/utils/auth.js
// frontend/src/utils/auth.js
// Save token + user info
export const saveAuth = (token, user, expirySeconds = 7 * 24 * 60 * 60) => {
  const tokenData = { token, expiry: Date.now() + expirySeconds * 1000 };
  localStorage.setItem("authToken", JSON.stringify(tokenData));
  saveUser(user);
};

// Save user
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get user
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Logout
export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

// Check login validity
export const isLoggedIn = () => {
  const tokenData = JSON.parse(localStorage.getItem("authToken"));
  if (!tokenData) return false;

  if (Date.now() > tokenData.expiry) {
    logout();
    return false;
  }
  return true;
};
