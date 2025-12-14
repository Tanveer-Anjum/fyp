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
      const token = localStorage.getItem("authToken"); // Retrieve token
      const res = await fetch("http://localhost:8080/api/admin/all-users", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token
        },
      });
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
      const token = localStorage.getItem("authToken"); // Retrieve token
      const res = await fetch(`http://localhost:8080/api/admin/users/${deleteModal.user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include token
        },
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

  if (loading) return <p className="text-center py-8 text-indigo-600 text-lg font-medium">Loading users...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
        Manage Users
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{u._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{u.fullName || u.name || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{u.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{u.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <button
                    onClick={() => setDeleteModal({ open: true, user: u })}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl p-8 w-full max-w-sm transform scale-100 animate-fade-in-up duration-300">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Are you sure you want to delete <strong>{deleteModal.user.fullName || deleteModal.user.name || "this user"}</strong>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal({ open: false, user: null })}
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
