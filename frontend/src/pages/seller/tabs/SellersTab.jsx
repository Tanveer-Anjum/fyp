

// import React, { useEffect, useState } from "react";
// import DeleteButton from "./DeleteButton";
// import toast from "react-hot-toast";

// export default function SellersTab() {
//   const [seller, setSeller] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editForm, setEditForm] = useState({});
//   const [loading, setLoading] = useState(true); // for fetch
//   const [actionLoading, setActionLoading] = useState(false); // for edit/delete

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (!token) return console.error("No token found!");

//     fetch("http://localhost:8080/api/seller/my-shop", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setSeller(data.seller);
//           setEditForm(data.seller);
//         } else {
//           toast.error(data.message || "Failed to fetch seller");
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//         toast.error("Error fetching seller");
//       });
//   }, []);

//   const handleEditChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const handleEditSubmit = async () => {
//     setActionLoading(true);
//     const token = localStorage.getItem("authToken");
//     if (!token) return;

//     try {
//       const res = await fetch(`http://localhost:8080/api/seller/${seller._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(editForm),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setSeller(data.seller);
//         setEditMode(false);
//         toast.success("Seller updated successfully!");
//       } else {
//         toast.error(data.message || "Update failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error updating seller");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this seller?")) return;
//     setActionLoading(true);

//     const token = localStorage.getItem("authToken");
//     if (!token) return;

//     try {
//       const res = await fetch(`http://localhost:8080/api/seller/${seller._id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();

//       if (data.success) {
//         toast.success("Seller deleted successfully!");
//         localStorage.removeItem("authToken");
//         window.location.href = "/signin";
//       } else {
//         toast.error(data.message || "Delete failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error deleting seller");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
//       </div>
//     );

//   if (!seller)
//     return (
//       <div className="text-center py-20 text-gray-500">
//         <h2 className="text-xl font-semibold mb-2">No seller found</h2>
//         <p>It looks like you haven't registered your shop yet.</p>
//       </div>
//     );

//   return (
//     <div className="bg-white p-4 md:p-6 shadow rounded-lg overflow-x-auto">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Registered Seller</h2>
//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2 text-left">Name</th>
//             <th className="border p-2 text-left">Email</th>
//             <th className="border p-2 text-left">Phone</th>
//             <th className="border p-2 text-left">Shop Name</th>
//             <th className="border p-2 text-left">Business Type</th>
//             <th className="border p-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="border">
//             <td className="border p-2">
//               {editMode ? (
//                 <input
//                   name="fullName"
//                   value={editForm.fullName}
//                   onChange={handleEditChange}
//                   className="border rounded p-1 w-full"
//                 />
//               ) : (
//                 seller.fullName
//               )}
//             </td>
//             <td className="border p-2 break-words">{seller.email}</td>
//             <td className="border p-2">
//               {editMode ? (
//                 <input
//                   name="phoneNumber"
//                   value={editForm.phoneNumber}
//                   onChange={handleEditChange}
//                   className="border rounded p-1 w-full"
//                 />
//               ) : (
//                 seller.phoneNumber
//               )}
//             </td>
//             <td className="border p-2">
//               {editMode ? (
//                 <input
//                   name="shopName"
//                   value={editForm.shopName}
//                   onChange={handleEditChange}
//                   className="border rounded p-1 w-full"
//                 />
//               ) : (
//                 seller.shopName
//               )}
//             </td>
//             <td className="border p-2">
//               {editMode ? (
//                 <input
//                   name="businessType"
//                   value={editForm.businessType}
//                   onChange={handleEditChange}
//                   className="border rounded p-1 w-full"
//                 />
//               ) : (
//                 seller.businessType
//               )}
//             </td>
//             <td className="border p-2 flex flex-col md:flex-row gap-2">
//               <button
//                 onClick={editMode ? handleEditSubmit : () => setEditMode(true)}
//                 disabled={actionLoading}
//                 className={`px-3 py-1 rounded text-white ${
//                   editMode ? "bg-green-500" : "bg-blue-500"
//                 } ${actionLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//               >
//                 {editMode ? (actionLoading ? "Saving..." : "Save") : "Edit"}
//               </button>

//               <DeleteButton onDelete={handleDelete} actionLoading={actionLoading} />
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }




















import React, { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";
import toast from "react-hot-toast";

export default function SellersTab() {
  const [seller, setSeller] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true); // for fetch
  const [actionLoading, setActionLoading] = useState(false); // for edit/delete

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return console.error("No token found!");

    fetch("http://localhost:8080/api/seller/my-shop", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSeller(data.seller);
          setEditForm(data.seller);
        } else {
          toast.error(data.message || "Failed to fetch seller");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error("Error fetching seller");
      });
  }, []);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    setActionLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:8080/api/seller/${seller._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.success) {
        setSeller(data.seller);     // use updated seller
        setEditForm(data.seller);   // sync form
        setEditMode(false);
        toast.success("Seller updated successfully!");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating seller");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this seller?")) return;
    setActionLoading(true);

    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:8080/api/seller/${seller._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Seller deleted successfully!");
        localStorage.removeItem("authToken");
        window.location.href = "/signin";
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting seller");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );

  if (!seller)
    return (
      <div className="text-center py-20 text-gray-500">
        <h2 className="text-xl font-semibold mb-2">No seller found</h2>
        <p>It looks like you haven't registered your shop yet.</p>
      </div>
    );

  return (
    <div className="bg-white p-4 md:p-6 shadow rounded-lg overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Registered Seller</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Phone</th>
            <th className="border p-2 text-left">Shop Name</th>
            <th className="border p-2 text-left">Business Type</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border">
            <td className="border p-2">
              {editMode ? (
                <input
                  name="fullName"
                  value={editForm.fullName}
                  onChange={handleEditChange}
                  className="border rounded p-1 w-full"
                />
              ) : (
                seller.fullName
              )}
            </td>
            <td className="border p-2 break-words">{seller.email}</td>
            <td className="border p-2">
              {editMode ? (
                <input
                  name="phoneNumber"
                  value={editForm.phoneNumber}
                  onChange={handleEditChange}
                  className="border rounded p-1 w-full"
                />
              ) : (
                seller.phoneNumber
              )}
            </td>
            <td className="border p-2">
              {editMode ? (
                <input
                  name="shopName"
                  value={editForm.shopName}
                  onChange={handleEditChange}
                  className="border rounded p-1 w-full"
                />
              ) : (
                seller.shopName
              )}
            </td>
            <td className="border p-2">
              {editMode ? (
                <input
                  name="businessType"
                  value={editForm.businessType}
                  onChange={handleEditChange}
                  className="border rounded p-1 w-full"
                />
              ) : (
                seller.businessType
              )}
            </td>
            <td className="border p-2 flex flex-col md:flex-row gap-2">
              <button
                onClick={editMode ? handleEditSubmit : () => setEditMode(true)}
                disabled={actionLoading}
                className={`px-3 py-1 rounded text-white ${
                  editMode ? "bg-green-500" : "bg-blue-500"
                } ${actionLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {editMode ? (actionLoading ? "Saving..." : "Save") : "Edit"}
              </button>

              <DeleteButton onDelete={handleDelete} actionLoading={actionLoading} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
