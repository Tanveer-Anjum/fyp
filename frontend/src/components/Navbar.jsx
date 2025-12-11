import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaHeadset, FaStore, FaShoppingCart, FaSearch } from "react-icons/fa";
import logo from "./Logo/assets/logo1.png";
import { useCart } from "../context/CartContext";
// import { getUser, getUserInitial, logout } from "../utils/auth"; // Remove these imports

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  // const [user, setUser] = useState(getUser());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

 useEffect(() => {
  const interval = setInterval(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
   // console.log("Navbar user state:", storedUser); // Re-add this line for debugging
  }, 1000);
  return () => clearInterval(interval);
}, []);

const handleLogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  setUser(null);
  navigate("/signin");
};
  // const userInitial = getUserInitial(); // Remove this line

  return (
    <nav className="bg-gray-800 text-white shadow-xl px-4 py-3 flex items-center justify-between z-50 relative">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Bazzario Logo" className="h-10 w-auto" />
        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500">Bazzario</span>
      </Link>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-700 rounded-full px-4 py-2 w-1/2 max-w-xl shadow-inner">
        <input
          type="text"
          placeholder="Search for products, categories..."
          className="flex-1 outline-none bg-transparent text-white placeholder-gray-400 text-sm"
        />
        <FaSearch className="text-gray-400 text-lg ml-2 cursor-pointer hover:text-white transition-colors duration-200" />
      </div>

      {/* Right Side Icons & User Menu */}
      <div className="flex items-center space-x-6">
        {/* HOME – Only visible for ADMIN */}
        {user?.role === "admin" && (
          <Link to="/" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
            Home
          </Link>
        )}

        {/* Sign In / User Dropdown */}
        {!user ? (
          <Link to="/signin" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
            <FaUser className="text-xl" />
            <span>Sign In</span>
          </Link>
        ) : (
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUser className="text-xl" />
              <span className="font-medium">{user.fullName || "Guest"}</span>
              {/* Add a subtle caret icon */}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 animate-fade-in-down transform origin-top-right">
                {user.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {user.role === "seller" && (
                  <Link
                    to="/seller/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Seller Dashboard
                  </Link>
                )}
                {user.role === "buyer" && (
                  <Link
                    to="/user/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Manage Account
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-100 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Support */}
        <Link to="/support" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
          <FaHeadset className="text-xl" />
          <span>Support</span>
        </Link>

        {/* Create Shop (Only for BUYERS) */}
        {user?.role === "buyer" && (
          <Link to="/createshop" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
            <FaStore className="text-xl" />
            <span>Create Shop</span>
          </Link>
        )}

        {/* Cart Icon (Always visible for BUYERS, and generally for all) */}
        <Link to="/cart" className="relative text-gray-300 hover:text-white transition-colors duration-200">
          <FaShoppingCart className="text-2xl" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce-once">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}












