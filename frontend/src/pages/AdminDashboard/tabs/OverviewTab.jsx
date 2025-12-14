import React, { useState, useEffect } from "react";
import { FaStore, FaUsers, FaBox, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";

export default function OverviewTab() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Admin not logged in");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/admin/dashboard-stats", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setError("Failed to fetch dashboard stats");
        setLoading(false);
        return;
      }

      const data = await res.json();

      setStats([
        { label: "Total Sellers", value: data.totalSellers, color: "#8884d8", icon: "FaStore" },
        { label: "Total Buyers", value: data.totalBuyers, color: "#82ca9d", icon: "FaUsers" },
        { label: "Total Products", value: data.totalProducts, color: "#ffc658", icon: "FaBox" },
        { label: "Total Orders", value: data.totalOrders, color: "#ff7300", icon: "FaShoppingCart" },
        { label: "Revenue (PKR)", value: data.totalRevenue.toLocaleString(), color: "#a4de6c", icon: "FaMoneyBillWave" },
      ]);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Server error while fetching stats");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div className="text-center py-8 text-indigo-600 text-lg font-medium">Loading dashboard stats...</div>;
  if (error) return <div className="text-center py-8 text-red-600 text-lg font-medium">Error: {error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
        Admin Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-900 shadow-lg rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-700"
          >
            <div className="text-4xl mb-4"
                 style={{ color: s.color }}>
              {s.icon === "FaStore" && <FaStore />}
              {s.icon === "FaUsers" && <FaUsers />}
              {s.icon === "FaBox" && <FaBox />}
              {s.icon === "FaShoppingCart" && <FaShoppingCart />}
              {s.icon === "FaMoneyBillWave" && <FaMoneyBillWave />}
            </div>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{s.label}</p>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
