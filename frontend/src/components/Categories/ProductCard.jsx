import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const tokenData = JSON.parse(localStorage.getItem("authToken"));

    if (!tokenData || new Date().getTime() > tokenData.expiry) {
      localStorage.removeItem("authToken"); // remove expired token
      toast.error("Please sign in to view this product!");

      localStorage.setItem("redirectAfterLogin", `/product/${product.id}`);
      setTimeout(() => navigate("/signin"), 1500);
      return;
    }

    navigate(`/product/${product.id}`, { state: { product } });
  };

  const renderStars = () => {
    const stars = [];
    const rating = Math.round(product.rating || 0);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline-block" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 inline-block" />);
      }
    }
    return stars;
  };

  return (
    <div
      className="relative bg-white shadow rounded-lg cursor-pointer overflow-hidden group"
      onClick={handleClick}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold">{product.name}</h3>
        <p className="text-green-600 font-bold mt-1">Rs {product.price.toLocaleString()}</p>
      </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
        <p className="text-xs mb-2">{product.description}</p>
        <div className="flex items-center justify-center mb-2">
          {renderStars()}
          <span className="text-xs text-gray-200 ml-2">({product.reviews || 0} reviews)</span>
        </div>
        <button className="mt-2 px-3 py-1 bg-green-500 rounded hover:bg-green-600 flex items-center gap-1 text-xs font-medium">
          <FaShoppingCart /> View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
