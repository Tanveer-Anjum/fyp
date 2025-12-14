import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function NotificationsTab() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch("http://localhost:8080/api/support/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setNotifications(data.tickets);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch notifications."); // Add toast for errors
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // auto refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8080/api/support/read/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, read: true } : n))
        );
        toast.success("Notification marked as read");
      } else {
        toast.error(data.message || "Failed to mark as read");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark as read");
    }
  };

  if (notifications.length === 0)
    return (
      <p className="text-center py-8 text-gray-500 dark:text-gray-400 text-lg">
        No new notifications.
      </p>
    );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
        Admin Notifications
      </h2>
      <ul className="space-y-4">
        {notifications.map((n) => (
          <li
            key={n._id}
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg shadow-sm transition-all duration-200
              ${n.read
                ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                : "bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border border-blue-200 dark:border-blue-700"
            }`}
          >
            <div className="mb-2 sm:mb-0">
              <p className="font-semibold text-lg ">
                {n.issueType}: <span className="font-normal">{n.description}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Received: {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {!n.read && (
                <button
                  onClick={() => markAsRead(n._id)}
                  className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md text-sm font-medium"
                >
                  <FaCheckCircle /> Mark as Read
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
