import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('name');

  useEffect(() => {
    console.log("Search Term in SearchResults:", searchTerm); // Debugging line
    const fetchSearchResults = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const apiUrl = `http://localhost:8080/api/products?name=${searchTerm}`;
        console.log("API URL in SearchResults:", apiUrl); // Debugging line
        const response = await axios.get(apiUrl);
        setSearchResults(response.data.products);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to load search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  if (loading) {
    return <div className="text-center p-4">Loading search results...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  if (searchResults.length === 0) {
    return <div className="text-center p-4 text-gray-500">No products found matching "{searchTerm}".</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{searchTerm}"</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map(product => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-2 rounded" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">Rs {product.price.toLocaleString()}</p>
            {/* Add more product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
