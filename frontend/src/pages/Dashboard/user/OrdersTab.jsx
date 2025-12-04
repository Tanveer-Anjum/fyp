// import React, { useState, useEffect } from "react";

// const OrdersTab = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//           setError("Please log in to view your orders.");
//           setLoading(false);
//           return;
//         }

//         const response = await fetch("http://localhost:8080/api/orders", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();
//         setOrders(data.orders);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <div className="text-center mt-4">Loading orders...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
//   }

//   if (orders.length === 0) {
//     return <div className="text-center mt-4">You have no orders yet.</div>;
//   }

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">My Orders</h2>
//       <div className="space-y-4">
//         {orders.map((order) => (
//           <div key={order._id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg shadow-sm bg-gray-50">
//             <div className="flex items-center space-x-4 mb-4 md:mb-0">
//               <img
//                 src={order.product.image}
//                 alt={order.product.name}
//                 className="w-20 h-20 object-cover rounded-md"
//               />
//               <div>
//                 <p className="font-semibold text-lg text-gray-900">{order.product.name}</p>
//                 <p className="text-gray-600">Quantity: {order.quantity}</p>
//                 {order.product.selectedColor && (
//                   <p className="text-sm text-gray-500">Color: {order.product.selectedColor}</p>
//                 )}
//                 <p className="text-green-700 font-bold mt-1">Rs {Number(order.product.price * order.quantity).toLocaleString()}</p>
//               </div>
//             </div>
//             <div className="flex flex-col items-end">
//               <span
//                 className={`px-4 py-2 rounded-full text-white text-sm font-medium ${
//                   order.orderStatus === "delivered" ? "bg-green-600"
//                   : order.orderStatus === "cancelled" ? "bg-red-600"
//                   : "bg-orange-500"
//                 }`}
//               >
//                 {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
//               </span>
//               <p className="text-sm text-gray-500 mt-2">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrdersTab;
















import React, { useState, useEffect } from "react";

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Please log in to view your orders.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:8080/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center mt-4">You have no orders yet.</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
             <img
  src={
    order.product.image
      ? order.product.image.startsWith("http")
        ? order.product.image
        : `http://localhost:8080${order.product.image}`
      : "/uploads/default-product.jpg"
  }
  alt={order.product.name}
  className="w-20 h-20 object-cover rounded-md"
/>
              <div>
                <p className="font-semibold text-lg text-gray-900">{order.product.name}</p>
                <p className="text-gray-600">Quantity: {order.quantity}</p>
                {order.product.selectedColor && (
                  <p className="text-sm text-gray-500">Color: {order.product.selectedColor}</p>
                )}
                <p className="text-green-700 font-bold mt-1">
                  Rs {Number(order.product.price * order.quantity).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span
                className={`px-4 py-2 rounded-full text-white text-sm font-medium ${
                  order.orderStatus === "delivered"
                    ? "bg-green-600"
                    : order.orderStatus === "cancelled"
                    ? "bg-red-600"
                    : "bg-orange-500"
                }`}
              >
                {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
              </span>
              <p className="text-sm text-gray-500 mt-2">
                Order Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTab;
