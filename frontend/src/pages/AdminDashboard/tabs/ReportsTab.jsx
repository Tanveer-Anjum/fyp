import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6666", "#66B2FF", "#FF9933"];

export default function ReportsTab() {
  const [reportData, setReportData] = useState({
    dailySales: [],
    monthlySales: [],
    userRegistrations: [],
    topSellingProducts: [],
    productStockLevels: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminReports = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Admin not authenticated.");
          setLoading(false);
          toast.error("Admin not authenticated.");
          return;
        }

        const response = await axios.get("http://localhost:8080/api/admin/dashboard-stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReportData({
          dailySales: response.data.dailySales || [],
          monthlySales: response.data.monthlySales || [],
          userRegistrations: response.data.userRegistrations || [],
          topSellingProducts: response.data.topSellingProducts || [],
          productStockLevels: response.data.productStockLevels || [],
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch admin reports:", err);
        setError(err.message || "Error fetching reports.");
        setLoading(false);
        toast.error(err.message || "Error fetching reports.");
      }
    };
    fetchAdminReports();
  }, []);

  if (loading) return <p className="text-center py-8 text-indigo-600 text-lg font-medium">Loading admin reports...</p>;
  if (error) return <p className="text-center py-8 text-red-600 text-lg font-medium">Error: {error}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
        Admin Reports & Analytics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Daily Sales Chart */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-white">Daily Sales Trends</h3>
          {reportData.dailySales.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportData.dailySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} name="Revenue (PKR)" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No daily sales data available.</p>
          )}
        </div>

        {/* Monthly Sales Chart */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-white">Monthly Sales Overview</h3>
          {reportData.monthlySales.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#82ca9d" name="Revenue (PKR)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No monthly sales data available.</p>
          )}
        </div>

        {/* User Registrations Chart */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-white">User Registrations</h3>
          {reportData.userRegistrations.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.userRegistrations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#ffc658" name="New Users" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No user registration data available.</p>
          )}
        </div>

        {/* Top Selling Products Chart */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-white">Top Selling Products</h3>
          {reportData.topSellingProducts.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportData.topSellingProducts}
                  dataKey="sold"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {reportData.topSellingProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No top selling products data available.</p>
          )}
        </div>

        {/* Product Stock Levels */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm p-4 lg:col-span-1">
          <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-white">Current Product Stock Levels</h3>
          {reportData.productStockLevels.length ? (
            <ul className="space-y-2">
              {reportData.productStockLevels.map((item, index) => (
                <li key={index} className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{item.name}</span>
                  <span className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{ backgroundColor: COLORS[index % COLORS.length], color: 'white' }}>
                    {item.stock} in stock
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No product stock data available.</p>
          )}
        </div>

      </div>
    </div>
  );
}
