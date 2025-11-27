import React, { useEffect, useState } from "react";

export default function SellersTab() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/sellers")
      .then(res => res.json())
      .then(data => setSellers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Registered Sellers</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Shop Name</th>
              <th className="border p-2">Shop Category</th>
              <th className="border p-2">Business Type</th>
              <th className="border p-2">Company Name</th>
              <th className="border p-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map(seller => (
              <tr key={seller._id} className="border">
                <td className="border p-2">{seller.fullName}</td>
                <td className="border p-2">{seller.email}</td>
                <td className="border p-2">{seller.phoneNumber}</td>
                <td className="border p-2">{seller.shopName}</td>
                <td className="border p-2">{seller.shopCategory}</td>
                <td className="border p-2">{seller.businessType}</td>
                <td className="border p-2">{seller.companyName}</td>
                <td className="border p-2">{new Date(seller.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
