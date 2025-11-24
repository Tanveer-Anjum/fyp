import React, { useEffect, useState } from "react";
import { getUser } from "../../../utils/auth"; // your auth helper

const ProfileTab = () => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const loggedInUser = getUser();
    if (loggedInUser) {
      setUser({
        name: loggedInUser.name || "",
        email: loggedInUser.email || "",

      });
    }
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800"><span>{user.name}</span></h2>
      <p>
        <span className="font-semibold">Name:</span> {user.name}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {user.email}
      </p>
    
      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileTab;
