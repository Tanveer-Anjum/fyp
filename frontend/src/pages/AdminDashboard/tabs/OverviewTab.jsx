import React, { useState, useEffect } from "react";

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
        { label: "Total Sellers", value: data.totalSellers },
        { label: "Total Buyers", value: data.totalBuyers },
        { label: "Total Products", value: data.totalProducts },
        { label: "Total Orders", value: data.totalOrders },
        { label: "Revenue (PKR)", value: data.totalRevenue.toLocaleString() },
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

  if (loading) return <div className="text-center py-8">Loading stats...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-lg font-semibold text-gray-600">{s.label}</p>
            <p className="text-2xl font-bold text-green-600 mt-2">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
