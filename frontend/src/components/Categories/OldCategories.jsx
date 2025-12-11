// import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import ProductCardSkeleton from "../../components/ProductCardSkeleton"; // ✅ import skeleton
// import { useNavigate } from "react-router-dom";

// // Images from categories assets
// import oldShirts from "./assets/oldshirts.jpg";
// import oldPhone from "./assets/oldphone.webp";
// import oldTshirt from "./assets/oldtshirt.webp";
// import oldPerfum from "./assets/oldperfum.webp";
// import oldPerfum1 from "./assets/oldperfum1.jpg";
// import novel from "./assets/novel.webp";
// import novel1 from "./assets/novel1.webp";

// const oldCategories = [
//   { id: 101, name: "Old Shirts", image: oldShirts, price: 1499 ,description:"Comfortable old shirt"},
//   { id: 102, name: "Old Phone", image: oldPhone, price: 4999 ,description:"Good old phone"},
//   { id: 103, name: "Old T-Shirt", image: oldTshirt, price: 799 ,description:"Comfortable old t-shirt"},
//   { id: 104, name: "Classic Perfume", image: oldPerfum, price: 1299 ,description:"Best old perfume"},
//   { id: 105, name: "Classic Perfume Set", image: oldPerfum1, price: 1999 ,description:"Best old perfume set"},
//   { id: 106, name: "Old Novel", image: novel, price: 399 ,description:"Old novel book"},
//     { id: 107, name: "Old T-Shirt", image: oldTshirt, price: 799 ,description:"Comfortable old t-shirt"},
//   { id: 108, name: "Classic Perfume", image: oldPerfum, price: 1299 ,description:"Best old perfume"},
//   { id: 109, name: "Old Novel Volume 2", image: novel1, price: 449 ,description:"Old novel book volume 2"},
// ];

// export default function OldCategories() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   // Simulate fetch
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000); // 2s fake delay
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Old Categories</h2>

//       {/* Quick category tiles like Daraz */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
//         <button
//           className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
//           onClick={() => navigate("/old/phones")}
//         >
//           Old Phones
//         </button>
//         <button
//           className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
//           onClick={() => navigate("/old/watches")}
//         >
//           Old Watches
//         </button>
//         <button
//           className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
//           onClick={() => navigate("/old/cameras")}
//         >
//           Old Cameras
//         </button>
//         <button
//           className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
//           onClick={() => navigate("/old/shirts")}
//         >
//           Old Shirts
//         </button>
//       </div>

//       {/* Product list */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {loading
//           ? Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />) 
//           : oldCategories.map((item) => (
//               <ProductCard key={item.id} product={item} />
//             ))}
//       </div>
//     </div>
//   );
// }










// import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import ProductCardSkeleton from "../../components/ProductCardSkeleton";
// import axios from "axios";

// export default function OldCategories() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [categories, setCategories] = useState([]);

//  useEffect(() => {
//   const fetchOldProducts = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:8080/api/products?categoryType=old");
//       setProducts(data.products || []);
//     } catch (err) {
//       console.error("Failed to fetch old products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchOldProducts();
// }, []);


//   // Filter products by selected category
//   const filteredProducts =
//     selectedCategory === "all"
//       ? products
//       : products.filter((p) => p.categoryName === selectedCategory);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Old Categories</h2>

//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
//         <button
//           onClick={() => setSelectedCategory("all")}
//           className={`px-3 py-2 rounded ${
//             selectedCategory === "all" ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
//           }`}
//         >
//           All
//         </button>

//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             className={`px-3 py-2 rounded ${
//               selectedCategory === cat ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {loading
//           ? Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
//           : filteredProducts.length
//           ? filteredProducts.map((p) => <ProductCard key={p._id} product={p} />)
//           : <p>No products found.</p>}
//       </div>
//     </div>
//   );
// }








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
