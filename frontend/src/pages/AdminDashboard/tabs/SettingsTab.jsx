import React from "react";

export default function SettingsTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
        Admin Settings
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Store Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            placeholder="My E-Commerce Store"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            placeholder="owner@example.com"
          />
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-semibold text-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}
