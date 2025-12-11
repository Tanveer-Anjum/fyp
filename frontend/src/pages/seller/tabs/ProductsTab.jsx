


// import React, { useEffect, useState } from "react";
// import AddProductForm from "../../../components/forms/AddProductForm";
// import toast from "react-hot-toast";

// export default function ProductsTab() {
//   const [showForm, setShowForm] = useState(false);
//   const [products, setProducts] = useState([]);

//   const seller = JSON.parse(localStorage.getItem("user"));
//   if (!seller || seller.role !== "seller") return <p>Seller not logged in!</p>;

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const res = await fetch("http://localhost:8080/api/products/seller", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.success) setProducts(data.products);
//       else toast.error(data.message || "Failed to fetch products");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch products");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       const token = localStorage.getItem("authToken");
//       const res = await fetch(`http://localhost:8080/api/products/delete/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (!data.success) return toast.error(data.message);
//       toast.success("Product deleted!");
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold">Manage Products</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           {showForm ? "Close Form" : "Add Product"}
//         </button>
//       </div>

//       {showForm && <AddProductForm fetchProducts={fetchProducts} />}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//        {products.map((p) => (
//   <div key={p._id} className="border-b py-4">
//     <img src={`http://localhost:8080${p.imageUrl}`} alt={p.name} className="h-48 w-full object-cover rounded mb-2" />
//     <h3 className="font-bold">{p.name}</h3>
//     <p>{p.description}</p>
//     <p>PKR {p.price}</p>
//     <p>Category: {p.categoryType} - {p.categoryName}</p>
//     <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:text-red-800 mt-2">
//       Delete
//     </button>
//   </div>
// ))}

//       </div>
//     </div>
//   );
// }
















// import React, { useEffect, useState } from "react";
// import AddProductForm from "../../../components/forms/AddProductForm";
// import toast from "react-hot-toast";

// export default function ProductsTab() {
//   const [showForm, setShowForm] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const seller = JSON.parse(localStorage.getItem("user"));
//   if (!seller || seller.role !== "seller") return <p>Seller not logged in!</p>;

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const res = await fetch("http://localhost:8080/api/products/seller", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.success) setProducts(data.products);
//       else toast.error(data.message || "Failed to fetch products");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch products");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       const token = localStorage.getItem("authToken");
//       const res = await fetch(`http://localhost:8080/api/products/delete/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (!data.success) return toast.error(data.message);
//       toast.success("Product deleted!");
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed");
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setShowForm(true);
//   };

//   const handleFormClose = () => {
//     setEditingProduct(null);
//     setShowForm(false);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold">Manage Products</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           {showForm ? "Close Form" : editingProduct ? "Edit Product" : "Add Product"}
//         </button>
//       </div>

//       {showForm && (
//         <AddProductForm
//           fetchProducts={fetchProducts}
//           editingProduct={editingProduct} // Pass product to pre-fill form
//           onClose={handleFormClose} // Callback to close form after save
//         />
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {products.map((p) => (
//           <div key={p._id} className="border-b py-4">
//             <img
//               src={`http://localhost:8080${p.imageUrl}`}
//               alt={p.name}
//               className="h-48 w-full object-cover rounded mb-2"
//             />
//             <h3 className="font-bold">{p.name}</h3>
//             <p>{p.description}</p>
//             <p>PKR {p.price}</p>
//             <p>Category: {p.categoryType} - {p.categoryName}</p>
//             <div className="flex gap-2 mt-2">
//               <button
//                 onClick={() => handleEdit(p)}
//                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(p._id)}
//                 className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



















import React, { useEffect, useState } from "react";
import AddProductForm from "../../../components/forms/AddProductForm";
import toast from "react-hot-toast";

export default function ProductsTab() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // For edit
  const [products, setProducts] = useState([]);

  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for modal visibility
  const [productIdToDelete, setProductIdToDelete] = useState(null); // State to store ID of product to delete

  const seller = JSON.parse(localStorage.getItem("user"));
  if (!seller || (seller.role !== "seller" && seller.role !== "admin")) {
    return (
      <p className="text-center py-8 text-red-600 text-lg font-medium">
        Unauthorized: Only admins or sellers can manage products.
      </p>
    );
  }

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

  const confirmDelete = (id) => {
    setProductIdToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    setShowConfirmModal(false); // Close the modal
    if (!productIdToDelete) return; // Should not happen if modal is opened correctly

    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8080/api/products/delete/${productIdToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success("Product deleted successfully!");
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    } finally {
      setProductIdToDelete(null); // Clear the ID after deletion attempt
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setProductIdToDelete(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Your Products</h2>
        <button
          onClick={() => {
            setEditingProduct(null); // Clear editing product when toggling form
            setShowForm(!showForm);
          }}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md"
        >
          {showForm ? "Close Form" : "Add New Product"}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
          <AddProductForm
            fetchProducts={fetchProducts}
            editingProduct={editingProduct} // Pass product for editing
            closeForm={closeForm} // To close after submit
          />
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-10">
          You haven't added any products yet. Click "Add New Product" to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <img
                src={p.imageUrl ? `http://localhost:8080${p.imageUrl}` : "/uploads/default-product.jpg"}
                alt={p.name}
                className="h-48 w-full object-cover object-center"
              />
              <div className="p-4">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">{p.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">{p.description}</p>
                <p className="font-semibold text-indigo-600 dark:text-indigo-400 text-lg mb-2">Rs {p.price.toLocaleString()}</p>
                <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span className="mr-3">Stock: <span className="font-medium text-gray-700 dark:text-gray-200">{p.stock}</span></span>
                  <span>Category: <span className="font-medium text-gray-700 dark:text-gray-200">{p.categoryType} - {p.categoryName}</span></span>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(p._id)} // Changed to open confirmation modal
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
