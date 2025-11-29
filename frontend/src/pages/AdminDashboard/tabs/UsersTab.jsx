// import React from "react";

// export default function UsersTab() {
//   const users = [
//     { id: 1, name: "Ali Khan", email: "ali@example.com", role: "Customer" },
//     { id: 2, name: "Sara Ahmed", email: "sara@example.com", role: "Customer" },
//     { id: 3, name: "Bilal Khan", email: "bilal@example.com", role: "Customer" },
//   ];

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Users</h2>
//       <div className="bg-white shadow rounded-lg p-4">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="p-3">ID</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u) => (
//               <tr key={u.id} className="border-t hover:bg-gray-50">
//                 <td className="p-3">{u.id}</td>
//                 <td className="p-3">{u.name}</td>
//                 <td className="p-3">{u.email}</td>
//                 <td className="p-3">{u.role}</td>
//                 <td className="p-3 space-x-2">
//                   <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
//                   <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }







// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function UsersTab() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/api/admin/all-users");
//       const data = await res.json();
//       if (!data.success) {
//         toast.error(data.message || "Failed to fetch users");
//         setLoading(false);
//         return;
//       }
//       setUsers(data.users);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching users");
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       const res = await fetch(`http://localhost:8080/api/admin/users/${id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (!data.success) {
//         toast.error(data.message || "Failed to delete user");
//         return;
//       }
//       toast.success("User deleted successfully");
//       setUsers(users.filter((u) => u._id !== id));
//     } catch (err) {
//       console.error(err);
//       toast.error("Error deleting user");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Users</h2>
//       <div className="bg-white shadow rounded-lg p-4">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="p-3">ID</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u) => (
//               <tr key={u._id} className="border-t hover:bg-gray-50">
//                 <td className="p-3">{u._id}</td>
//                 <td className="p-3">{u.name}</td>
//                 <td className="p-3">{u.email}</td>
//                 <td className="p-3">{u.role}</td>
//                 <td className="p-3">
//                   <button
//                     onClick={() => handleDelete(u._id)}
//                     className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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







import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, user: null });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/all-users");
      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed to fetch users");
        setLoading(false);
        return;
      }

      setUsers(data.users);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching users");
      setLoading(false);
    }
  };

  // Delete user
  const handleDelete = async () => {
    if (!deleteModal.user) return;

    try {
      const res = await fetch(`http://localhost:8080/api/admin/users/${deleteModal.user._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed to delete user");
        setDeleteModal({ open: false, user: null });
        return;
      }

      toast.success("User deleted successfully");
      setUsers(users.filter((u) => u._id !== deleteModal.user._id));
      setDeleteModal({ open: false, user: null });
    } catch (err) {
      console.error(err);
      toast.error("Error deleting user");
      setDeleteModal({ open: false, user: null });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-gray-600">Loading users...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Users</h2>

      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{u._id}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  <button
                    onClick={() => setDeleteModal({ open: true, user: u })}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
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
      {deleteModal.open && (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete <strong>{deleteModal.user.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteModal({ open: false, user: null })}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
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
