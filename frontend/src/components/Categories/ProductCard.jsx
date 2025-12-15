import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa"; // Added FaShoppingCart

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      // Not logged in → redirect to login first
      localStorage.setItem(
        "redirectAfterLogin",
        `/product/${product?._id || product?.id || ""}`
      );
      toast.error("Please login to view product details!"); // Use toast
      navigate("/signin");
      return;
    }

    // Logged in → go to Product Details page
    navigate(`/product/${product._id || product.id}`, { state: { product } });
  };

  const renderStars = () => {
    const stars = [];
    const rating = Math.round(product?.rating ?? 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400 inline-block" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 inline-block" />
        )
      );
    }
    return stars;
  };

  return (
    <div
      className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="overflow-hidden rounded-t-lg">
        <img
          src={
            product?.imageUrl
              ? product.imageUrl.startsWith("http")
                ? product.imageUrl
                : `http://localhost:8080${product.imageUrl}`
              : "/uploads/default-product.jpg"
          }
          alt={product?.name || "Product"}
          className="w-full h-48 object-cover object-center transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 leading-tight">
          {product?.name || "Unnamed Product"}
        </h3>
        <div className="flex items-center text-sm mb-2">
          {renderStars()}
          <span className="text-gray-600 dark:text-gray-400 ml-2">({product?.reviews ?? 0})</span>
        </div>
        <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">
          Rs {(product?.price ?? 0).toLocaleString()}
        </p>
      </div>

      {/* Overlay for Quick View/Add to Cart on hover (Optional, can be added here) */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-lg">
        <button
          onClick={(e) => { e.stopPropagation(); handleClick(); }}
          className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors duration-300 flex items-center space-x-2"
        >
          <FaShoppingCart className="text-lg" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
