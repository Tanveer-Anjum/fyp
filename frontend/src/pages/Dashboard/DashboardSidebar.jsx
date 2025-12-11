import React from "react";
import { FaUser, FaClipboardList, FaShoppingCart, FaStar } from "react-icons/fa"; // Import icons

const DashboardSidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const tabs = [
    { name: "Profile", icon: <FaUser /> },
    { name: "Orders", icon: <FaClipboardList /> },
    { name: "Cart", icon: <FaShoppingCart /> },
    { name: "My Reviews", icon: <FaStar /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-40 transition-opacity duration-300 md:hidden ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-gray-300 shadow-2xl p-6 z-50 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:shadow-none md:rounded-bl-3xl md:rounded-tl-3xl md:mt-5 md:mb-5 md:ml-5`}
      >
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500 mb-8 text-center">
          My Dashboard
        </h2>
        <ul className="space-y-4">
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
                ${activeTab === tab.name
                  ? "bg-indigo-600 text-white shadow-md transform scale-105"
                  : "hover:bg-gray-700 hover:text-white"}
              }`}
              onClick={() => {
                setActiveTab(tab.name);
                setSidebarOpen(false); // Close sidebar on mobile after selection
              }}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-base font-medium">{tab.name}</span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default DashboardSidebar;
