import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckoutModal from "../components/Checkout/CheckoutModal";

const ProductDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(location.state?.product || null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.product);
          setSelectedColor(data.product.colors?.[0] || null);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        navigate("/");
      }
    };

    if (!product || !product.owner) { // Check if product or product.owner is missing
      fetchProductDetails();
    } else {
      setSelectedColor(product.colors?.[0] || null);
    }
  }, [id, product, navigate]);

  const handleAddToCart = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    // Not logged in, redirect to signin
    localStorage.setItem("redirectAfterLogin", `/product/${id}`);
    alert("Please login to add product to cart!");
    navigate("/signin");
    return;
  }

  const safeQty = Math.max(1, Number(quantity) || 1);

  addToCart({
    ...product,
    quantity: safeQty,
    selectedColor: selectedColor || null,
    imageUrl: product.imageUrl
      ? product.imageUrl.startsWith("http")
        ? product.imageUrl
        : `http://localhost:8080${product.imageUrl}`
      : "/uploads/default-product.jpg",
  });

  alert("✅ Product added to cart!");
};

  if (!product) return <p className="text-center mt-20">Loading product...</p>;

  const numericRating = Number(product.rating ?? 0);
  const fullStars = Math.floor(numericRating);
  const hasHalf = numericRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="bg-gray-900 text-gray-100 p-6 md:p-8 max-w-7xl mx-auto rounded-lg shadow-xl flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Product Image */}
      <div className="flex-1 lg:w-1/2">
        <img
          src={
            product.imageUrl
              ? product.imageUrl.startsWith("http")
                ? product.imageUrl
                : `http://localhost:8080${product.imageUrl}`
              : "/uploads/default-product.jpg"
          }
          alt={product.name}
          className="w-full h-96 object-contain rounded-lg border border-gray-700 p-4 bg-gray-800 shadow-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 lg:w-1/2 flex flex-col gap-5 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
        <h1 className="text-4xl font-extrabold text-blue-400">{product.name}</h1>
        {product.brand && <p className="text-gray-400 text-lg">Brand: <span className="font-semibold">{product.brand}</span></p>}
        {numericRating > 0 && (
          <div className="flex items-center gap-2 text-yellow-400 text-xl">
            {Array.from({ length: fullStars }).map((_, i) => (
              <span key={`full-${i}`}>★</span>
            ))}
            {hasHalf && <span>☆</span>}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <span key={`empty-${i}`}>☆</span>
            ))}
            <span className="text-base text-gray-400 ml-2">{numericRating.toFixed(1)} / 5</span>
          </div>
        )}
        <p className="text-4xl font-bold text-green-500 my-2">
          Rs {Number(product.price).toLocaleString()}
        </p>
        {product.description && (
          <p className="text-gray-300 leading-relaxed text-base">{product.description}</p>
        )}

        {product.colors && (
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-300 text-lg">Color:</span>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="border border-gray-600 bg-gray-700 text-gray-100 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none cursor-pointer"
            >
              {product.colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-4 mt-4">
          <span className="font-semibold text-gray-300 text-lg">Quantity:</span>
          <div className="inline-flex items-center border border-gray-600 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, Number(q || 1) - 1))}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 transition-colors duration-200"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              className="w-20 text-center outline-none py-2 bg-gray-800 text-gray-100 border-x border-gray-600"
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, Number(q || 1) + 1))}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 transition-colors duration-200"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-bold shadow-lg"
          >
            Add to Cart
          </button>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="flex-1 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-bold shadow-lg"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={product}
        selectedColor={selectedColor}
        quantity={quantity}
        onPlaced={() => alert("✅ Order placed successfully! (Demo)")}
      />
    </div>
  );
};

export default ProductDetails;
