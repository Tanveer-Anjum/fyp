// import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import ProductCardSkeleton from "../../components/ProductCardSkeleton"; // ✅ import skeleton
// import { useNavigate } from "react-router-dom";

// // Images from categories assets
// import newPerfum from "./assets/newperfum.jpg";
// import novel from "./assets/novel.webp";
// import novel1 from "./assets/novel1.webp";
// // Existing images from global assets
// import airpodsImg from "./assets/airpod2.webp";
// import earphoneImg from "../../assets/airphone.webp";
// import shirtImg from "./assets/shirt.jpg";
// import bottleImg from "../../assets/waterbottle.jpg";

// const newCategories = [
//   { id: 201, name: "New Perfume", image: newPerfum, price: 2999 },
//     { id: 211, name: "Airpods", image: airpodsImg, price: 9999 },
//       { id: 206, name: "Shirt", image: shirtImg, price: 1999 },
//   { id: 207, name: "Water Bottle", image: bottleImg, price: 799 },
//   { id: 205, name: "Earphone", image: earphoneImg, price: 2499 },
//   { id: 202, name: "New Novel", image: novel, price: 699 },
//   { id: 203, name: "New Novel Volume 2", image: novel1, price: 749 },
//   { id: 204, name: "Airpods", image: airpodsImg, price: 9999 },
//   { id: 233, name: "Earphone", image: earphoneImg, price: 2499 },
//   { id: 290, name: "Shirt", image: shirtImg, price: 1999 },
//   { id: 241, name: "Water Bottle", image: bottleImg, price: 799 },
// ];

// export default function NewCategories() {
//   const navigate = useNavigate();

//   // ✅ loading state
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate API/data loading delay
//     const timer = setTimeout(() => setLoading(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">New Categories</h2>

//       {/* Quick category tiles like Daraz */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
//         <button
//           className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
//           onClick={() => navigate("/new/smartphones")}
//         >
//           Smartphones
//         </button>
//         <button
//           className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
//           onClick={() => navigate("/new/smartwatches")}
//         >
//           Smartwatches
//         </button>
//         <button
//           className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
//           onClick={() => navigate("/new/laptops")}
//         >
//           Laptops
//         </button>
//         <button
//           className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
//           onClick={() => navigate("/new/perfume")}
//         >
//           Perfume
//         </button>
//         <button
//           className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
//           onClick={() => navigate("/new/shirts")}
//         >
//           Shirts
//         </button>
//         <button
//           className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
//           onClick={() => navigate("/new/earphones")}
//         >
//           Earphones
//         </button>
//         <button
//           className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
//           onClick={() => navigate("/new/airpods")}
//         >
//           Airpods
//         </button>
//       </div>

//       {/* ✅ Products grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {loading
//           ? Array(8)
//               .fill(0)
//               .map((_, i) => <ProductCardSkeleton key={i} />) // show skeletons
//           : newCategories.map((item) => (
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

// export default function NewCategories() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [categories, setCategories] = useState([]);

// useEffect(() => {
//   const fetchOldProducts = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:8080/api/products?categoryType=new");
//       setProducts(data.products || []);
//     } catch (err) {
//       console.error("Failed to fetch old products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchOldProducts();
// }, []);


//   const filteredProducts =
//     selectedCategory === "all"
//       ? products
//       : products.filter((p) => p.categoryName === selectedCategory);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">New Categories</h2>

//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
//         <button
//           onClick={() => setSelectedCategory("all")}
//           className={`px-3 py-2 rounded ${
//             selectedCategory === "all" ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200"
//           }`}
//         >
//           All
//         </button>

//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             className={`px-3 py-2 rounded ${
//               selectedCategory === cat ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200"
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

export default function NewCategories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/products?categoryType=new");
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewProducts();
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
              ${selectedCategory === "" ? "bg-amber-600 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
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
              ${selectedCategory === cat ? "bg-amber-600 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
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
