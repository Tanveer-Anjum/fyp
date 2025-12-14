import React, { useState, useEffect } from "react";

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Assuming admin also uses authToken
        if (!token) {
          setError("Admin not authenticated.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:8080/api/admin/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        console.error("Failed to fetch all orders for admin:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-indigo-600 text-lg font-medium">Loading all orders...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600 text-lg font-medium">Error: {error}</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-8 text-gray-500 text-lg">No orders found.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
        All Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Buyer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Seller</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((o) => (
              <tr key={o._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{o._id}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <img
                    src={o.product.image.startsWith("http")
                      ? o.product.image
                      : `http://localhost:8080${o.product.image}`}
                    alt={o.product.name}
                    className="w-10 h-10 object-cover rounded-md mr-3 shadow-sm"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{o.product.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Qty: {o.quantity}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  <p className="font-medium">{o.buyer?.fullName || o.buyer?.email}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  <p className="font-medium">{o.seller?.shopName || o.seller?.fullName || o.seller?.email}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600 dark:text-indigo-400">Rs {Number(o.product.price * o.quantity).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${o.orderStatus === "delivered" ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" :
                      o.orderStatus === "cancelled" ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100" :
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"}
                  `}>
                    {o.orderStatus.charAt(0).toUpperCase() + o.orderStatus.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(o.orderDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
