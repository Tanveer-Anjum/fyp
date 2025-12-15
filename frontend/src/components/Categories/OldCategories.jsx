






import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "../../components/ProductCardSkeleton";
import axios from "axios";

export default function OldCategories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchOldProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/products?categoryType=old");
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOldProducts();
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.categoryName))).filter(Boolean);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryName === selectedCategory)
    : products;

  return (
    <div className="container mx-auto px-4 py-8 bg-white shadow-lg rounded-xl mt-8">
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.length > 0 && (
          <button
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out
              ${selectedCategory === "" ? "bg-indigo-600 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
            `}
            onClick={() => setSelectedCategory("")}
          >
            All
          </button>
        )}
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out
              ${selectedCategory === cat ? "bg-indigo-600 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {loading
          ? Array(10).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
          : filteredProducts.length > 0
          ? filteredProducts.map((p) => <ProductCard key={p._id} product={p} />)
          : <p className="col-span-full text-center text-gray-500 text-lg py-10">No products found in this category.</p>}
      </div>
    </div>
  );
}
