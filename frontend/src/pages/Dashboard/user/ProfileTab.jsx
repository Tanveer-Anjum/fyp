// import React, { useEffect, useState } from "react";
// import { getUser } from "../../../utils/auth"; // your auth helper

// const ProfileTab = () => {
//   const [user, setUser] = useState({ name: "", email: "", phone: "" });

//   useEffect(() => {
//     const loggedInUser = getUser();
//     if (loggedInUser) {
//       setUser({
//         name: loggedInUser.name || "",
//         email: loggedInUser.email || "",

//       });
//     }
//   }, []);

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800"><span>{user.name}</span></h2>
//       <p>
//         <span className="font-semibold">Name:</span> {user.name}
//       </p>
//       <p>
//         <span className="font-semibold">Email:</span> {user.email}
//       </p>
    
//       <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//         Edit Profile
//       </button>
//     </div>
//   );
// };

// export default ProfileTab;























// import React, { useEffect, useState } from "react";
// import { getUser } from "../../../utils/auth";

// const ProfileTab = () => {
//   const [user, setUser] = useState({ name: "", email: "" });

//   useEffect(() => {
//     const loggedInUser = getUser();
//     if (loggedInUser) {
//       setUser({
//         name: loggedInUser.name || "",
//         email: loggedInUser.email || "",
//       });
//     }
//   }, []);

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">
//         <span>{user.name}</span>
//       </h2>

//       <p>
//         <span className="font-semibold">Name:</span> {user.name}
//       </p>
//       <p>
//         <span className="font-semibold">Email:</span> {user.email}
//       </p>

//       <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//         Edit Profile
//       </button>
//     </div>
//   );
// };

// export default ProfileTab;











import React, { useEffect, useState } from "react";
import { getUser, saveUser } from "../../../utils/auth";

const ProfileTab = () => {
  const [user, setUser] = useState({ fullName: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "" });

  useEffect(() => {
    const loggedInUser = getUser();
    if (loggedInUser) {
      setUser(loggedInUser);
      setFormData({ fullName: loggedInUser.fullName, email: loggedInUser.email });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("authToken"));
      const res = await fetch("http://localhost:8080/api/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) {
        alert(data.message || "Failed to update profile");
        return;
      }

      setUser(data.user);
      saveUser(data.user); // Update localStorage
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editMode ? (
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          user.fullName
        )}
      </h2>

      <p className="mb-2">
        <span className="font-semibold">Name:</span>{" "}
        {editMode ? (
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          user.fullName
        )}
      </p>

      <p className="mb-4">
        <span className="font-semibold">Email:</span>{" "}
        {editMode ? (
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          user.email
        )}
      </p>

      {editMode ? (
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileTab;
