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














/// it working 

// import React, { useState } from "react";
// import AddProductForm from "../../../components/forms/AddProductForm";

// export default function ProductsTab() {
//   const [showForm, setShowForm] = useState(false);

//   // Dummy function (later you can replace with real product fetching)
//   const fetchProducts = () => {
//     console.log("Fetching products...");
//   };

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
//           <AddProductForm
//             fetchProducts={fetchProducts}
//             closeForm={() => setShowForm(false)}
//           />
//         </div>
//       )}

//       <div className="bg-white shadow rounded-lg p-4">
//         <p className="text-gray-600">Products list will show here...</p>
//       </div>
//     </div>
//   );
// }
















import React, { useState, useEffect } from "react";
import AddProductForm from "../../../components/forms/AddProductForm";
import toast from "react-hot-toast";

export default function ProductsTab() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for modal visibility
  const [productIdToDelete, setProductIdToDelete] = useState(null); // State to store ID of product to delete

  const token = localStorage.getItem("authToken");

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/products/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) setProducts(data.products);
      else toast.error("Failed to load products");
    } catch (err) {
      console.log(err);
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Confirm Delete product
  const confirmDelete = (id) => {
    setProductIdToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    setShowConfirmModal(false); // Close the modal
    if (!productIdToDelete) return; // Should not happen if modal is opened correctly

    try {
      const res = await fetch(`http://localhost:8080/api/products/delete/${productIdToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Product deleted");
        fetchProducts();
      } else toast.error(data.message || "Delete failed");
    } catch (err) {
      console.log(err);
      toast.error("Server error");
    } finally {
      setProductIdToDelete(null); // Clear the ID after deletion attempt
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setProductIdToDelete(null);
  };

  // Open edit mode
  const startEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 pb-5 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Manage All Products</h2>

        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(!showForm);
          }}
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg text-lg font-semibold"
        >
          {showForm ? "Close Form" : "Add New Product"}
        </button>
      </div>

      {/* Add / Edit Product Form */}
      {showForm && (
        <div className="mb-10 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-inner border border-gray-200 dark:border-gray-700">
          <AddProductForm
            fetchProducts={fetchProducts}
            editingProduct={editingProduct}
            closeForm={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {/* Product List */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">All Products Overview</h3>

        {products.length === 0 ? (
          <p className="text-center py-12 text-gray-500 dark:text-gray-400 text-xl font-medium">
            No products found. Add a new product to get started!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <img
                        src={p.imageUrl ? `http://localhost:8080${p.imageUrl}` : "/uploads/default-product.jpg"}
                        alt={p.name}
                        className="h-20 w-20 object-cover mx-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 dark:text-white">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700 dark:text-gray-300">Rs {p.price.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700 dark:text-gray-300">{p.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700 dark:text-gray-300">{p.categoryName}</td>

                    <td className="px-6 py-4 whitespace-nowrap text-left text-base font-medium space-x-4">
                      <button
                        onClick={() => startEdit(p)}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => confirmDelete(p._id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl p-8 w-full max-w-sm transform scale-100 animate-fade-in-up duration-300">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-5 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
