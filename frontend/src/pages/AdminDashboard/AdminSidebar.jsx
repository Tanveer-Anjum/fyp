import React from "react";
import { FaChartPie, FaBox, FaShoppingCart, FaUsers, FaFileAlt, FaCog, FaStore,FaBell } from "react-icons/fa";

const menuItems = [
  { name: "Overview", icon: <FaChartPie /> },
  { name: "Products", icon: <FaBox /> },
  { name: "Orders", icon: <FaShoppingCart /> },
  { name: "Users", icon: <FaUsers /> },
  { name: "Reports", icon: <FaFileAlt /> },
  { name: "Notifications", icon: <FaBell /> },

  { name: "Shop Details", icon: <FaStore /> }, // Updated display name
];

export default function AdminSidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-gray-800 text-gray-300 shadow-2xl p-6 hidden md:block rounded-bl-3xl rounded-tl-3xl mt-5 mb-5 ml-5">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500 mb-8 text-center">
        Admin Panel
      </h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
              ${activeTab === item.name
                ? "bg-indigo-600 text-white shadow-md transform scale-105"
                : "hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => setActiveTab(item.name)}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-base font-medium">{item.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
