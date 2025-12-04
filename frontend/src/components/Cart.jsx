




// import React from "react";
// import { useCart } from "../context/CartContext";

// const Cart = () => {
//   const { cart, removeFromCart, clearCart } = useCart();

//   const total = cart.reduce(
//     (sum, item) => sum + Number(item.price) * item.quantity,
//     0
//   );

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

//       {cart.length === 0 ? (
//         <p className="text-gray-500">Your cart is empty</p>
//       ) : (
//         <>
//           <div className="space-y-4">
//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex justify-between items-center bg-white shadow p-4 rounded-lg"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="h-16 w-16 object-cover rounded"
//                   />








                  
//                   <div>
//                     <h3 className="font-semibold">{item.name}</h3>
//                     <p className="text-gray-600">
//                       Rs {item.price} × {item.quantity}
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-between items-center mt-6">
//             <p className="font-bold text-xl">
//               Total: Rs {total.toLocaleString()}
//             </p>

//             <button
//               onClick={clearCart}
//               className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-600"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;










import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item,index) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white shadow p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.imageUrl
                        ? item.imageUrl.startsWith("http")
                          ? item.imageUrl
                          : `http://localhost:8080${item.imageUrl}`
                        : "/uploads/default-product.jpg"
                    }
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      Rs {item.price} × {item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="font-bold text-xl">
              Total: Rs {total.toLocaleString()}
            </p>

            <button
              onClick={clearCart}
              className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
