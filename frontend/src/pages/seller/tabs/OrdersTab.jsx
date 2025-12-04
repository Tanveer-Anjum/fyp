import React, { useState, useEffect } from "react";

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSellerOrders = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Please log in as a seller to view your orders.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:8080/api/seller/orders", {
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
      console.error("Failed to fetch seller orders:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must be logged in to perform this action.");
        return;
      }

      const response = await fetch(`http://localhost:8080/api/seller/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error updating order status: ${response.statusText}`);
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: updatedOrder.orderStatus } : order
        )
      );
      alert(`Order ${orderId} status updated to ${newStatus}.`);
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert(`Failed to update order status: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📑 Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center space-x-4">
                <img src={order.product.image} alt={order.product.name} className="w-20 h-20 object-cover rounded-md" />
                <div>
                  <p className="font-semibold text-lg">{order.product.name}</p>
                  <p className="text-gray-600">Quantity: {order.quantity}</p>
                  <p className="text-gray-600">Buyer: {order.buyer.fullName || order.buyer.username}</p>
                  <p className="text-gray-600 text-sm">Shipping: {order.shippingAddress.addressLine1}, {order.shippingAddress.city}</p>
                  <p className="text-green-700 font-bold mt-1">Rs {Number(order.product.price * order.quantity).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex flex-col items-end mt-4 md:mt-0">
                <span
                  className={`px-3 py-1 rounded text-white text-sm font-medium ${
                    order.orderStatus === "delivered" ? "bg-green-600"
                    : order.orderStatus === "cancelled" ? "bg-red-600"
                    : "bg-orange-500"
                  }`}
                >
                  {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                </span>
                {order.orderStatus === "pending" && (
                  <div className="space-x-2 mt-3">
                    <button
                      onClick={() => updateOrderStatus(order._id, "accepted")}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order._id, "cancelled")}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
