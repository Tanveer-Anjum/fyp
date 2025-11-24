// utils/auth.js
export const isLoggedIn = () => {
  return !!localStorage.getItem("token"); // returns true if token exists
};
