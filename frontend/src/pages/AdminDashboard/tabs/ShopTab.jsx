// // src/pages/admin/ShopDetails.jsx
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function ShopDetails() {
//   const [shops, setShops] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchShops = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/api/admin/sellers"); // API endpoint
//       const data = await res.json();

//       if (!data.success && data.shops === undefined) {
//         setShops(data);
//       } else {
//         setShops(data.shops);
//       }
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching shops");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchShops();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this shop?")) return;

//     try {
//       const res = await fetch(`http://localhost:8080/api/admin/sellers/${id}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();

//       if (!data.success) {
//         toast.error(data.message || "Failed to delete shop");
//         return;
//       }

//       toast.success("Shop deleted successfully!");
//       setShops(shops.filter(shop => shop._id !== id)); // remove deleted shop from state
//     } catch (err) {
//       console.error(err);
//       toast.error("Error deleting shop");
//     }
//   };

//   const handleEdit = (id) => {
//     // Redirect to edit page or open a modal
//     window.location.href = `/admin/edit-shop/${id}`;
//   };

//   if (loading) return <p className="p-6 text-center">Loading shops...</p>;
//   if (shops.length === 0)
//     return <p className="p-6 text-center text-gray-500">No shops found.</p>;

//   return (
//     <div className="bg-white p-6 shadow rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Registered Sellers</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Phone</th>
//               <th className="border p-2">Shop Name</th>
//               <th className="border p-2">Shop Category</th>
//               <th className="border p-2">Business Type</th>
//               <th className="border p-2">Company Name</th>
//               <th className="border p-2">Joined</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {shops.map((shop) => (
//               <tr key={shop._id} className="border">
//                 <td className="border p-2">{shop.fullName}</td>
//                 <td className="border p-2">{shop.email}</td>
//                 <td className="border p-2">{shop.phoneNumber}</td>
//                 <td className="border p-2">{shop.shopName}</td>
//                 <td className="border p-2">{shop.shopCategory}</td>
//                 <td className="border p-2">{shop.businessType}</td>
//                 <td className="border p-2">{shop.companyName}</td>
//                 <td className="border p-2">{new Date(shop.createdAt).toLocaleDateString()}</td>
//                 <td className="border p-2 flex gap-2">
//                   <button
//                     onClick={() => handleEdit(shop._id)}
//                     className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(shop._id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }















// src/pages/admin/ShopDetails.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ShopDetails() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSeller, setEditingSeller] = useState(null); // for modal
  const [editForm, setEditForm] = useState({});
  const [deleteSeller, setDeleteSeller] = useState(null);

  // Fetch sellers
  const fetchSellers = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve token
      const res = await fetch("http://localhost:8080/api/admin/sellers", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token
        },
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Failed to fetch shops");
        setLoading(false);
        return;
      }
      setSellers(data.sellers);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching shops");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  // Delete seller (triggered by modal confirm)
  const handleDelete = async () => {
    if (!deleteSeller) return;
    try {
      const token = localStorage.getItem("authToken"); // Retrieve token
      const res = await fetch(`http://localhost:8080/api/admin/sellers/${deleteSeller._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include token
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message || "Delete failed");
      toast.success("Seller deleted successfully");
      setSellers((prev) => prev.filter((s) => s._id !== deleteSeller._id));
      setDeleteSeller(null);
    } catch (err) {
      console.error(err);
      toast.error("Error deleting seller");
    }
  };

  // Open edit modal
  const handleEdit = (seller) => {
    setEditingSeller(seller);
    setEditForm({ ...seller });
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save edits
  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve token
      const res = await fetch(`http://localhost:8080/api/admin/sellers/${editingSeller._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token
        },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message || "Update failed");
      toast.success("Seller updated successfully");

      setSellers((prev) =>
        prev.map((s) => (s._id === data.seller._id ? data.seller : s))
      );
      setEditingSeller(null);
    } catch (err) {
      console.error(err);
      toast.error("Error updating seller");
    }
  };

  if (loading) return <p className="text-center py-8 text-indigo-600 text-lg font-medium">Loading shops...</p>;
  if (sellers.length === 0)
    return <p className="text-center py-8 text-gray-500 text-lg">No shops found.</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
        Registered Sellers
      </h2>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Shop Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Business Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sellers.map((seller) => (
              <tr key={seller._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{seller.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{seller.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{seller.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{seller.shopName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{seller.shopCategory}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{seller.businessType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{seller.companyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(seller.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium space-x-3">
                  <button
                    onClick={() => handleEdit(seller)}
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteSeller(seller)} // open confirmation modal
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      
      {/* Delete Confirmation Modal */}
      {deleteSeller && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl p-8 w-full max-w-sm transform scale-100 animate-fade-in-up duration-300">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Are you sure you want to delete <strong>{deleteSeller.fullName}</strong>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteSeller(null)}
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





      {/* Edit Modal */}
      {editingSeller && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl p-8 w-full max-w-md transform scale-100 animate-fade-in-up duration-300">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit Seller Details</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                value={editForm.fullName}
                onChange={handleEditChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              />
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              />
              <input
                type="text"
                name="phoneNumber"
                value={editForm.phoneNumber}
                onChange={handleEditChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              />
              <input
                type="text"
                name="shopName"
                value={editForm.shopName}
                onChange={handleEditChange}
                placeholder="Shop Name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              />
              <input
                type="text"
                name="shopCategory"
                value={editForm.shopCategory}
                onChange={handleEditChange}
                placeholder="Shop Category"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              />
              <input
                type="text"
                name="businessType"
                value={editForm.businessType}
                onChange={handleEditChange}
                placeholder="Business Type"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              />
              <input
                type="text"
                name="companyName"
                value={editForm.companyName}
                onChange={handleEditChange}
                placeholder="Company Name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingSeller(null)}
                className="px-5 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
