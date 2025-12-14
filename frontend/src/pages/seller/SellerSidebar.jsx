import React from "react";
import {
  FaChartPie,
  FaBox,
  FaShoppingCart,
  FaFileAlt,
  FaCog,
  FaUsers,
} from "react-icons/fa";


const menuItems = [
  { name: "Overview", icon: <FaChartPie /> },
  { name: "Products", icon: <FaBox /> },
  { name: "Orders", icon: <FaShoppingCart /> },
  { name: "Reports", icon: <FaFileAlt /> },

  { name: "Sellers", icon: <FaUsers /> },
];

export default function SellerSidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-gray-800 shadow-lg p-6 hidden md:block border-r border-gray-700">
      <h2 className="text-2xl font-bold text-blue-400 mb-8">Seller Panel</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors duration-200
              ${activeTab === item.name
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-200 hover:bg-gray-700"}
            }`}
            onClick={() => setActiveTab(item.name)}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
