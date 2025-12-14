import React, { useState, useEffect } from "react";
import toast from "react-hot-toast"; // Import toast

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
      setOrders(data.orders || []);
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

      const response = await fetch(
        `http://localhost:8080/api/seller/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error updating order.");
      }

      const updatedOrder = await response.json();

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? { ...o, orderStatus: updatedOrder.orderStatus }
            : o
        )
      );

      toast.success("Order updated successfully."); // Use toast for success
    } catch (err) {
      console.error("Failed:", err);
      toast.error(err.message); // Use toast for error
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/api/seller/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error deleting order: ${response.status} ${response.statusText}`
        );
      }

      setOrders(orders.filter((order) => order._id !== orderId));
      toast.success("Order deleted successfully!"); // Use toast for success
    } catch (err) {
      console.error("Failed to delete order:", err);
      toast.error(`Failed to delete order: ${err.message}`); // Use toast for error
    }
  };

  if (loading) return <div className="text-center mt-4">Loading orders...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📑 Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row justify-between"
            >
              {/* Left: Product & Buyer Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={
                    order?.product?.image
                      ? order.product.image.startsWith("http")
                        ? order.product.image
                        : `http://localhost:8080${order.product.image}`
                      : "/uploads/default-product.jpg"
                  }
                  alt={order?.product?.name || "Product"}
                  className="h-16 w-16 object-cover rounded"
                />

                <div>
                  <p className="font-semibold text-lg">{order?.product?.name || "Unknown Product"}</p>
                  <p className="text-gray-600">Quantity: {order?.quantity || 0}</p>

                  {/* Buyer Info */}
                  <p className="text-gray-600">
                    Buyer: {order?.buyer?.fullName || order?.buyer?.username || "Unknown"}
                  </p>
                  <p className="text-gray-600">
                    Phone: {order?.shippingAddress?.phone || "Not provided"}
                  </p>

                  {/* Shipping Address */}
                  <p className="text-gray-600 text-sm">
                    Shipping: {order?.shippingAddress?.addressLine1 || ""}, {order?.shippingAddress?.city || ""}
                  </p>

                  {/* Total Price */}
                  <p className="text-green-700 font-bold mt-1">
                    Rs {Number(order?.product?.price || 0 * order?.quantity || 0).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Right: Status & Actions */}
              <div className="flex flex-col items-end">
                <span
                  className={`px-3 py-1 rounded text-white text-sm font-medium ${
                    order?.orderStatus === "delivered"
                      ? "bg-green-600"
                      : order?.orderStatus === "cancelled"
                      ? "bg-red-600"
                      : "bg-orange-500"
                  }`}
                >
                  {order?.orderStatus || "pending"}
                </span>

                {order?.orderStatus === "pending" && (
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

                {(order?.orderStatus === "pending" || order?.orderStatus === "accepted") && (
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition mt-3"
                  >
                    Delete
                  </button>
                )}

                <p className="text-sm text-gray-500 mt-2">
                  Order Date: {order?.orderDate ? new Date(order.orderDate).toLocaleDateString() : "Unknown"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
