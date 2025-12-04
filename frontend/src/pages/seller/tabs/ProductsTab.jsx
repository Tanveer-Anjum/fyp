// import React, { useState } from "react";
// import AddProductForm from "../../../components/forms/AddProductForm";

// export default function ProductsTab() {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold text-gray-700">Manage Products</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//         >
//           {showForm ? "Close Form" : "Add Product"}
//         </button>
//       </div>

//       {showForm && (
//         <div className="mb-6">
//           <AddProductForm />
//         </div>
//       )}

//       {/* Later: Table of products */}
//       <div className="bg-white shadow rounded-lg p-4">
//         <p className="text-gray-600">Products list will show here...</p>
//       </div>
//     </div>
//   );
// }










import React, { useEffect, useState } from "react";
import AddProductForm from "../../../components/forms/AddProductForm";
import toast from "react-hot-toast";

export default function ProductsTab() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);

  const seller = JSON.parse(localStorage.getItem("user"));
  if (!seller || seller.role !== "seller") return <p>Seller not logged in!</p>;

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch("http://localhost:8080/api/products/seller", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setProducts(data.products);
      else toast.error(data.message || "Failed to fetch products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8080/api/products/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success("Product deleted!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Products</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showForm ? "Close Form" : "Add Product"}
        </button>
      </div>

      {showForm && <AddProductForm fetchProducts={fetchProducts} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {products.map((p) => (
  <div key={p._id} className="border-b py-4">
    <img src={`http://localhost:8080${p.imageUrl}`} alt={p.name} className="h-48 w-full object-cover rounded mb-2" />
    <h3 className="font-bold">{p.name}</h3>
    <p>{p.description}</p>
    <p>PKR {p.price}</p>
    <p>Category: {p.categoryType} - {p.categoryName}</p>
    <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:text-red-800 mt-2">
      Delete
    </button>
  </div>
))}

      </div>
    </div>
  );
}
