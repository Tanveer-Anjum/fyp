import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ReportsTab = () => {
  const [dailySales, setDailySales] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [currentStock, setCurrentStock] = useState([]); // Added for current stock
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/seller/orders-report", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // if using JWT
        },
      });

      setDailySales(data.dailySales || []);
      setMonthlySales(data.monthlySales || []);
      setTopProducts(data.topProducts || []);
      setCurrentStock(data.currentStock || []); // Set current stock
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Seller Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Daily Sales Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-4">Daily Sales</h3>
          {dailySales.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Daily Sales (PKR)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600">No daily sales data.</p>
          )}
        </div>

        {/* Monthly Sales Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-4">Monthly Sales</h3>
          {monthlySales.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#82ca9d" name="Monthly Sales (PKR)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600">No monthly sales data.</p>
          )}
        </div>

        {/* Top Selling Products Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-4">Top Selling Products</h3>
          {topProducts.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topProducts}
                  dataKey="sold"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600">No top selling products data.</p>
          )}
        </div>

        {/* Current Stock Display */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-4">Current Stock</h3>
          {currentStock.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentStock}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#FF8042" name="Stock Quantity" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600">No products found in stock.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsTab;
