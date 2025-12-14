// src/components/ProductCardDisplay.jsx
import React from "react";

export default function ProductCardDisplay({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
      {products.map((p) => (
        <div key={p._id || p.name} className="border rounded-lg p-3 shadow bg-white">
          <img
            src={p.imageUrl?.startsWith("http") ? p.imageUrl : `http://localhost:8080${p.imageUrl}`}
            alt={p.name}
            className="w-full h-40 object-cover rounded"
          />
          <h4 className="font-semibold mt-2">{p.name}</h4>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{p.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-green-600 font-bold">PKR {p.price}</span>
            <span className="text-xs text-gray-500">{p.stock ? `${p.stock} in stock` : "Stock unknown"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
