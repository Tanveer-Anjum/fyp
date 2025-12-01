import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ReviewPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  useEffect(() => {
    if (!product) navigate("/dashboard");
  }, [product, navigate]);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    const newReview = {
      productId: id,
      name: product.name,
      rating,
      review: reviewText,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("reviews")) || [];
    const updated = [...existing, newReview];
    localStorage.setItem("reviews", JSON.stringify(updated));

      alert("⭐ Review submitted successfully!");
      navigate("/dashboard");
  };

  if (!product) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Write a Review for {product.name}
      </h2>

      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-40 object-cover rounded mb-4"
      />

      {/* Star Rating */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Rating:</h3>
        <div className="flex items-center gap-2 text-2xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`cursor-pointer ${
                star <= (hover || rating) ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Review input */}
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here..."
        className="w-full border p-3 rounded-lg h-32"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewPage;
