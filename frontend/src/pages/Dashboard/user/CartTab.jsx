// import React from "react";

// const CartTab = () => {
//   const cartItems = [
//     { id: 1, product: "iPhone 14 Pro", price: 280000, quantity: 1 },
//     { id: 2, product: "Cotton Shirt", price: 2000, quantity: 2 },
//   ];

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">My Cart</h2>
//       <div className="space-y-4">
//         {cartItems.map((item) => (
//           <div key={item.id} className="flex justify-between items-center p-4 border rounded">
//             <div>
//               <p className="font-semibold">{item.product}</p>
//               <p className="text-green-600 font-bold">Rs {item.price.toLocaleString()}</p>
//             </div>
//             <div>
//               <span>Qty: {item.quantity}</span>
//             </div>
//           </div>
//         ))}
//         <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartTab;







import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../.../../../../context/CartContext";

const CartTab = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">No items in cart</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border rounded"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-green-600 font-bold">
                  Rs {item.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>

              <div className="flex gap-3">


                {/* Review Button */}
                
                {/* <button
                  onClick={() =>
                    navigate(`/review/${item.id}`, {
                      state: { product: item },
                    })
                  }
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Review
                </button> */}

                {/* Delete Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartTab;
