import React, { useState, useEffect } from "react";
import toast from "react-hot-toast"; // Import toast

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for modal visibility
  const [orderIdToDelete, setOrderIdToDelete] = useState(null); // State to store ID of order to delete

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Please log in to view your orders.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:8080/api/orders", {
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
        setError(err.message);
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const confirmDelete = (id) => {
    setOrderIdToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDeleteOrder = async () => {
    setShowConfirmModal(false); // Close the modal
    if (!orderIdToDelete) return; // Should not happen if modal is opened correctly

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/api/orders/${orderIdToDelete}`,
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

      setOrders(orders.filter((order) => order._id !== orderIdToDelete));
      toast.success("Order deleted successfully!");
    } catch (err) {
      console.error("Failed to delete order:", err);
      toast.error(`Failed to delete order: ${err.message}`);
    } finally {
      setOrderIdToDelete(null); // Clear the ID after deletion attempt
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setOrderIdToDelete(null);
  };

  if (loading) {
    return <p className="text-center py-8 text-indigo-600 text-lg font-medium">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-600 text-lg font-medium">Error: {error}</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center py-8 text-gray-500 dark:text-gray-400 text-lg">You have no orders yet.</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
        My Orders
      </h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src={order.product.image
                  ? order.product.image.startsWith("http")
                    ? order.product.image
                    : `http://localhost:8080${order.product.image}`
                  : "/uploads/default-product.jpg"}
                alt={order.product.name}
                className="w-24 h-24 object-cover rounded-lg shadow-sm"
              />
              <div>
                <p className="font-semibold text-xl text-gray-900 dark:text-white">{order.product.name}</p>
                <p className="text-gray-600 dark:text-gray-300">Quantity: {order.quantity}</p>
                {order.product.selectedColor && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Color: {order.product.selectedColor}</p>
                )}
                <p className="text-green-700 dark:text-green-400 font-bold mt-2 text-lg">
                  Rs {Number(order.product.price * order.quantity).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Order Date: {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span
                className={`px-4 py-2 rounded-full text-white text-base font-medium shadow-sm
                  ${order.orderStatus === "delivered" ? "bg-green-600" : ""
                  }${order.orderStatus === "cancelled" ? "bg-red-600" : ""}
                  ${order.orderStatus === "pending" ? "bg-yellow-500" : ""}
                  ${order.orderStatus === "accepted" ? "bg-blue-500" : ""}
                `}
              >
                {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
              </span>
              {(order.orderStatus === "pending" || order.orderStatus === "accepted") && (
                <button
                  onClick={() => confirmDelete(order._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md text-sm font-medium"
                >
                  Delete Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl p-8 w-full max-w-sm transform scale-100 animate-fade-in-up duration-300">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this order? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-5 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOrder}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
