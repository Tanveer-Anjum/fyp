import React, { useState } from "react";

export default function DeleteButton({ onDelete, actionLoading }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={actionLoading}
        className={`px-3 py-1 rounded text-white bg-red-500 ${
          actionLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {actionLoading ? "Processing..." : "Delete"}
      </button>

      {showConfirm && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <p className="text-gray-700 mb-4 text-center">
              Are you sure you want to delete your shop? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowConfirm(false);
                }}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
