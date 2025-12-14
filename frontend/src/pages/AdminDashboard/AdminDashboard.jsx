import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import OverviewTab from "./tabs/OverviewTab";
import ProductsTab from "./tabs/ProductsTab";
import OrdersTab from "./tabs/OrdersTab";
import UsersTab from "./tabs/UsersTab";
import ReportsTab from "./tabs/ReportsTab";
import SettingsTab from "./tabs/SettingsTab";
import AddProductForm from "../../components/forms/AddProductForm";
import ShopDetails from "./tabs/ShopTab";
import NotificationsTab from "./tabs/NotificationsTab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  const renderTab = () => {
    switch (activeTab) {
      case "Overview": return <OverviewTab />;
      case "Products": return <ProductsTab />;
      case "Orders": return <OrdersTab />;
      case "Users": return <UsersTab />;
      case "Reports": return <ReportsTab />;
      case "Settings": return <SettingsTab />;
      case "Shop Details": return <ShopDetails />;
      case "Notifications":return <NotificationsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
       
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-y-auto bg-gray-100 dark:bg-gray-800 rounded-tl-3xl shadow-inner ml-5 mt-5 mb-5 mr-5">
        <div className="max-w-full mx-auto">
          {renderTab()}
        </div>
      </main>
    </div>
  );
}
