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








// src/utils/auth.js

 //Save token and user info in localStorage
export const saveAuth = (token, user, expirySeconds = 15) => {
  const tokenData = {
    token,
    expiry: new Date().getTime() + expirySeconds * 1000, // e.g. 15 sec
  };

  localStorage.setItem("authToken", JSON.stringify(tokenData));
  localStorage.setItem("user", JSON.stringify(user)); // keep user info separately
};

// Check if token is valid
export const isLoggedIn = () => {
  const tokenData = JSON.parse(localStorage.getItem("authToken"));
  if (!tokenData) return false;

  return new Date().getTime() < tokenData.expiry; // true if still valid
};

// ✅ Always return user (even if token expired)
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// ✅ Get first name / email prefix
export const getUserInitial = () => {
  const user = getUser();
  if (!user) return null;

  if (user.name) return user.name.split(" ")[0];
  if (user.email) return user.email.split("@")[0];
  return null;
};

// ✅ Clear everything (logout)
export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};











