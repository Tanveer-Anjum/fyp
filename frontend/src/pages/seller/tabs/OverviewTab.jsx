


// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   LabelList,
// } from "recharts";
// import toast from "react-hot-toast";

// export default function OverviewTab() {
//   const [products, setProducts] = useState([]);
//   const token = localStorage.getItem("authToken");

//   // Fetch products
//   const fetchProducts = async () => {
//     try {
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

//   // Calculate values
//   const totalProducts = products.length;
//   const pendingOrders = 4; // static
//   const revenue = products.reduce(
//     (acc, p) => acc + Number(p.price) * (p.sold || 1),
//     1
//   );

//   const chartData = [
//     { name: "Products", value: totalProducts, fill: "#22c55e" },
//     { name: "Pending Orders", value: pendingOrders, fill: "#f59e0b" },
//     { name: "Revenue", value: revenue, fill: "#3b82f6" },
//   ];

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">📊 Dashboard Overview</h2>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <ResponsiveContainer width="100%" height={350}>
//           <BarChart
//             data={chartData}
//             margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip
//               formatter={(value, name) =>
//                 name === "Revenue"
//                   ? `₨ ${Number(value).toLocaleString("en-PK")}`
//                   : value
//               }
//             />
//             <Bar dataKey="value" radius={[10, 10, 0, 0]} animationDuration={1500}>
//               <LabelList
//                 dataKey="value"
//                 position="top"
//                 formatter={(value, name) =>
//                   name === "Revenue" ? `₨ ${Number(value).toLocaleString("en-PK")}` : value
//                 }
//               />
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }




















import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import toast from "react-hot-toast";

export default function OverviewTab() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  // Fetch seller products
  const fetchProducts = async () => {
    try {
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

  // Fetch seller orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/seller/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setOrders(data.orders);
      else toast.error(data.message || "Failed to fetch orders");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
<<<<<<< HEAD
      if (!token) {
        setLoading(false);
        return;
      }
=======
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
      await Promise.all([fetchProducts(), fetchOrders()]);
      setLoading(false);
    };
    fetchData();
<<<<<<< HEAD
  }, [token]);
=======
  }, []);
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219

  if (loading) return <div className="text-center mt-4">Loading dashboard...</div>;

  // Calculate dashboard values
  const totalProducts = products.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === "pending").length;
  const revenue = orders
    .filter((o) => o.orderStatus === "accepted")
    .reduce((sum, o) => sum + o.product.price * o.quantity, 0);

  const chartData = [
    { name: "Products", value: totalProducts, fill: "#22c55e" },
    { name: "Pending Orders", value: pendingOrders, fill: "#f59e0b" },
    { name: "Revenue", value: revenue, fill: "#3b82f6" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">📊 Dashboard Overview</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name) =>
                name === "Revenue"
                  ? `₨ ${Number(value).toLocaleString("en-PK")}`
                  : value
              }
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} animationDuration={1500}>
              <LabelList
                dataKey="value"
                position="top"
                formatter={(value, name) =>
                  name === "Revenue" ? `₨ ${Number(value).toLocaleString("en-PK")}` : value
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
<<<<<<< HEAD
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
        <div className="bg-green-100  p-4 rounded-lg text-center">
=======
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg text-center">
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
          <h3 className="text-lg font-medium">Total Products</h3>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium">Pending Orders</h3>
          <p className="text-2xl font-bold">{pendingOrders}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium">Revenue</h3>
          <p className="text-2xl font-bold">₨ {revenue.toLocaleString("en-PK")}</p>
        </div>
      </div>
    </div>
  );
}
