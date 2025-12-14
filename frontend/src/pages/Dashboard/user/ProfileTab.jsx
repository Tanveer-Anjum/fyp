import React, { useEffect, useState } from "react";
import { getUser, saveUser } from "../../../utils/auth";
import toast from "react-hot-toast"; // Import toast

const ProfileTab = () => {
  const [user, setUser] = useState({ fullName: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "" });

  useEffect(() => {
    const loggedInUser = getUser();
    if (loggedInUser) {
      setUser(loggedInUser);
      setFormData({ fullName: loggedInUser.fullName, email: loggedInUser.email });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("authToken"));
      const res = await fetch("http://localhost:8080/api/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Failed to update profile"); // Replaced alert
        return;
      }

      setUser(data.user);
      saveUser(data.user); // Update localStorage
      setEditMode(false);
      toast.success("Profile updated successfully!"); // Replaced alert
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating profile!"); // Replaced alert
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-lg mx-auto border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
        My Profile
      </h2>

      <div className="space-y-5">
        <div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name:</p>
          {editMode ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            />
          ) : (
            <p className="text-gray-800 dark:text-gray-200 text-base">{user.fullName}</p>
          )}
        </div>

        <div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address:</p>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            />
          ) : (
            <p className="text-gray-800 dark:text-gray-200 text-base">{user.email}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md font-semibold text-lg"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="flex-1 bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition-colors duration-200 shadow-md font-semibold text-lg"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-semibold text-lg"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;
