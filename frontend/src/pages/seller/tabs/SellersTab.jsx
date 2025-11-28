// import React, { useEffect, useState } from "react";

// export default function SellersTab() {
//   const [seller, setSeller] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const authData = JSON.parse(localStorage.getItem("authToken"));
//     if (!authData?.token) {
//       console.error("No token found! Please login.");
//       setLoading(false);
//       return;
//     }

//     fetch("http://localhost:8080/api/seller/my-shop", {
//       headers: {
//         Authorization: `Bearer ${authData.token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Seller Data:", data);
//         setSeller(data.seller);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete your account?")) return;

//     const authData = JSON.parse(localStorage.getItem("authToken"));
//     try {
//       const res = await fetch(`http://localhost:8080/api/seller/${seller._id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${authData.token}`,
//         },
//       });
//       const data = await res.json();
//       if (data.success) {
//         alert("Seller deleted successfully!");
//         setSeller(null);
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("user");
//       } else {
//         alert(data.message || "Failed to delete seller");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     }
//   };

//   const handleEdit = () => {
//     // For simplicity, you can redirect to an edit page or open a modal
//     alert("Redirect to edit page or open modal to update seller info");
//   };

//   if (loading) return <div>Loading seller info...</div>;
//   if (!seller) return <div>No seller data available.</div>;

//   return (
//     <div className="bg-white p-6 shadow rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Registered Seller</h2>
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
//             <tr className="border">
//               <td className="border p-2">{seller.fullName}</td>
//               <td className="border p-2">{seller.email}</td>
//               <td className="border p-2">{seller.phoneNumber}</td>
//               <td className="border p-2">{seller.shopName}</td>
//               <td className="border p-2">{seller.shopCategory}</td>
//               <td className="border p-2">{seller.businessType}</td>
//               <td className="border p-2">{seller.companyName}</td>
//               <td className="border p-2">{new Date(seller.createdAt).toLocaleDateString()}</td>
//               <td className="border p-2 flex gap-2">
//                 <button
//                   onClick={handleEdit}
//                   className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }










import React, { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";

export default function SellersTab() {
  const [seller, setSeller] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true); // loading for fetch
  const [actionLoading, setActionLoading] = useState(false); // loading for edit/delete

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authToken"));
    if (!authData?.token) return console.error("No token found!");

    fetch("http://localhost:8080/api/seller/my-shop", {
      headers: { Authorization: `Bearer ${authData.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSeller(data.seller);
          setEditForm(data.seller);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    setActionLoading(true);
    const authData = JSON.parse(localStorage.getItem("authToken"));
    if (!authData?.token) return;

    const res = await fetch(`http://localhost:8080/api/seller/${seller._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.token}`,
      },
      body: JSON.stringify(editForm),
    });

    const data = await res.json();
    if (data.success) {
      setSeller(data.seller);
      setEditMode(false);
    } else {
      console.error(data.message || "Update failed");
    }
    setActionLoading(false);
  };

  // const handleDelete = async () => {
    
  //   setActionLoading(true);
  //   const authData = JSON.parse(localStorage.getItem("authToken"));
  //   if (!authData?.token) return;

  //   const res = await fetch(`http://localhost:8080/api/seller/${seller._id}`, {
  //     method: "DELETE",
  //     headers: { Authorization: `Bearer ${authData.token}` },
  //   });
  //   const data = await res.json();
  //   if (data.success) {
  //     setSeller(null);
  //   } else {
  //     console.error(data.message);
  //   }
  //   setActionLoading(false);
  // };





const handleDelete = async () => {
  setActionLoading(true); // optional, if you have loading state

  const authData = JSON.parse(localStorage.getItem("authToken"));
  if (!authData?.token) return;

  const res = await fetch(`http://localhost:8080/api/seller/${seller._id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${authData.token}` },
  });

  const data = await res.json();

  setActionLoading(false);

  if (data.success) {
    alert("Seller deleted successfully!");

    // Clear auth info
    localStorage.removeItem("authToken");

    // Redirect to login page (or home)
    window.location.href = "/signin";
  } else {
    alert(data.message);
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
              {/* <button
                onClick={handleDelete}
                disabled={actionLoading}
                className={`px-3 py-1 rounded text-white bg-red-500 ${
                  actionLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {actionLoading ? "Processing..." : "Delete"}
              </button> */}




              <DeleteButton onDelete={handleDelete} actionLoading={actionLoading} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
