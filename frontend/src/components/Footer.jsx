import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaApple, FaGooglePlay } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10 shadow-inner pt-8">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">

        {/* Customer Care */}
        <div>
          <h3 className="font-bold text-white mb-4 text-lg">Customer Care</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Help Center</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">How to Buy</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Track Your Order</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Contact Us</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-bold text-white mb-4 text-lg">Bazzario</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-bold text-white mb-4 text-lg">Categories</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Electronics</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Men’s Fashion</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Women’s Fashion</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Health & Beauty</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Groceries</a></li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="font-bold text-white mb-4 text-lg">Payment Methods</h3>
          <div className="flex flex-wrap gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-8 bg-gray-700 rounded-md p-1 shadow-sm" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/MasterCard_Logo.svg" alt="MasterCard" className="h-8 bg-gray-700 rounded-md p-1 shadow-sm" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8 bg-gray-700 rounded-md p-1 shadow-sm" />
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-bold text-white mb-4 text-lg">Follow Us</h3>
          <div className="flex space-x-5 text-2xl">
            <FaFacebook className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors duration-200" />
            <FaTwitter className="text-gray-400 hover:text-sky-500 cursor-pointer transition-colors duration-200" />
            <FaInstagram className="text-gray-400 hover:text-pink-500 cursor-pointer transition-colors duration-200" />
            <FaYoutube className="text-gray-400 hover:text-red-600 cursor-pointer transition-colors duration-200" />
          </div>
        </div>

        {/* App Download */}
        <div>
          <h3 className="font-bold text-white mb-4 text-lg">Download App</h3>
          <div className="flex flex-col gap-4">
            <button className="flex items-center justify-center gap-3 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-md">
              <FaGooglePlay className="text-green-400 text-xl" />
              <span className="text-sm font-medium">Google Play</span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-md">
              <FaApple className="text-white text-xl" />
              <span className="text-sm font-medium">App Store</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Bazzario. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
