import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import ProfileTab from "./user/ProfileTab";
import OrdersTab from "./user/OrdersTab";

import CartTab from "./user/CartTab";
import ReviewsTab from "./user/ReviewsTab";


const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab />;
      case "Orders":
        return <OrdersTab />;
    
      case "Cart":
        return <CartTab />;
        case "My Reviews":
            return <ReviewsTab/>;
        
    
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 bg-indigo-600 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-700 transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-gray-100 dark:bg-gray-800 rounded-tl-3xl shadow-inner md:ml-5 mt-5 mb-5 mr-5">
        <div className="max-w-full mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
            My Dashboard
          </h1>
          {renderTab()}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
