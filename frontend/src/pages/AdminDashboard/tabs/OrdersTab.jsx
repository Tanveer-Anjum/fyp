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
    return <div className="text-center mt-4">Loading all orders...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center mt-4">No orders found.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Orders</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Order ID</th>
              <th className="p-3">Product</th>
              <th className="p-3">Buyer</th>
              <th className="p-3">Seller</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t hover:bg-gray-50">
                <td className="p-3 text-sm">{o._id}</td>
                <td className="p-3 flex items-center">
                  {/* <img src={o.product.image} alt={o.product.name} className="w-10 h-10 object-cover rounded-md mr-2" /> */}


<img
  src={
    o.product.image.startsWith("http")
      ? o.product.image
      : `http://localhost:8080${o.product.image}`
  }
  alt={o.product.name}
  className="w-10 h-10 object-cover rounded-md mr-2"
/>


                  <div>
                    <p className="font-semibold text-gray-800">{o.product.name}</p>
                    <p className="text-sm text-gray-600">Qty: {o.quantity}</p>
                  </div>
                </td>
                <td className="p-3">
                  <p className="font-medium">{o.buyer?.fullName || o.buyer?.email}</p>
                </td>
                <td className="p-3">
                  <p className="font-medium">{o.seller?.shopName || o.seller?.fullName || o.seller?.email}</p>
                </td>
                <td className="p-3 font-bold text-green-700">Rs {Number(o.product.price * o.quantity).toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-white text-sm ${
                    o.orderStatus === "delivered" ? "bg-green-500" :
                    o.orderStatus === "cancelled" ? "bg-red-500" :
                    "bg-yellow-500"
                  }`}>
                    {o.orderStatus.charAt(0).toUpperCase() + o.orderStatus.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
