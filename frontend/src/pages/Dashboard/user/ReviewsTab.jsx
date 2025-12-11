import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewsTab = () => {
  const reviews = [
    { id: 1, product: "iPhone 14 Pro", rating: 5, comment: "Excellent product!", date: "2023-10-26" },
    { id: 2, product: "Cotton Shirt", rating: 4, comment: "Good quality, fits well.", date: "2023-09-15" },
    { id: 3, product: "Bluetooth Speaker", rating: 3, comment: "Decent sound for the price.", date: "2023-11-01" },
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      i < rating ? <FaStar key={i} className="text-yellow-400" /> : <FaStar key={i} className="text-gray-300 dark:text-gray-600" />
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
        My Reviews
      </h2>
      {reviews.length === 0 ? (
        <p className="text-center py-8 text-gray-500 dark:text-gray-400 text-lg">You haven't submitted any reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-xl text-gray-900 dark:text-white">{r.product}</p>
                <div className="flex items-center gap-1">
                  {renderStars(r.rating)}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base mb-3">{r.comment}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-right">Reviewed on: {r.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
