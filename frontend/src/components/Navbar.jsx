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
    <nav className="flex items-center justify-between bg-green-700 px-6 py-3 shadow-lg text-white">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Bazzario Logo" className="h-20 w-auto" />
      </Link>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-lg px-3 py-1 w-1/2">
        <input
          type="text"
          placeholder="Search for products..."
          className="flex-1 outline-none text-black py-1"
        />
        <FaSearch className="text-green-500" />
      </div>

      {/* Right Side */}
      <div className="flex gap-6 items-center">

        {/* HOME – Only visible for ADMIN */}
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/")}
            className="font-semibold hover:text-orange-300"
          >
            Home
          </button>
        )}

        {/* If NO user logged in AND not admin, show Sign In */}
        {!user && (
          <Link to="/signin" className="flex items-center gap-2 hover:text-orange-300">
            <FaUser /> Sign In
          </Link>
        )}

        {user && (
          <div className="relative">
            {/* -------- SELLER -------- */}
            {user.role === "seller" && (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/seller/dashboard")}
              >
                <FaUser className="text-white" />
                <span className="font-semibold">{user.fullName}</span>
              </div>
            )}

            {/* -------- ADMIN -------- */}
            {user.role === "admin" && (
              <>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaUser className="text-white" />
                  <span className="font-semibold">{user.fullName}</span>
                </div>

                {dropdownOpen && (
                  <div className="absolute bg-white text-black mt-2 rounded shadow-lg right-0 w-44 z-50">
                    <button
                      onClick={() => { navigate("/admin/dashboard"); setDropdownOpen(false); }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}

            {/* -------- BUYER -------- */}
            {user.role === "buyer" && (
              <>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaUser className="text-white" />
                  <span className="font-semibold">{user.fullName}</span>
                </div>

                {dropdownOpen && (
                  <div className="absolute bg-white text-black mt-2 rounded shadow-lg right-0 w-40 z-50">
                    <button
                      onClick={() => { navigate("/user/dashboard"); setDropdownOpen(false); }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Manage Account
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Support */}
        <Link to="/support" className="flex items-center gap-2 hover:text-orange-300">
          <FaHeadset /> Support
        </Link>

        {/* Create Shop + Cart (Only for BUYERS) */}
        {user?.role === "buyer" && (
          <>
            <Link to="/signup" className="flex items-center gap-2 hover:text-orange-300">
              <FaStore /> Create Shop
            </Link>

            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-white hover:text-orange-300" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </>
        )}

        {/* Seller Logout Button (moved to dropdown for better consistency) */}
         {user?.role === "seller" && (
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        )} 
      </div>
    </nav>
  );
}












