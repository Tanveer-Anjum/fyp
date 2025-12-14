import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

const CartTab = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
        My Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center py-8 text-gray-500 dark:text-gray-400 text-lg">No items in cart.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl.startsWith("http") ? item.imageUrl : `http://localhost:8080${item.imageUrl}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                )}
                <div>
                  <p className="font-semibold text-xl text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
                  {item.selectedColor && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Color: {item.selectedColor}</p>
                  )}
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-2 text-lg">
                    Rs {item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                {/* Review Button - Uncomment if needed */}
                {/* <button
                  onClick={() => navigate(`/review/${item.id}`, { state: { product: item } })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md text-sm font-medium"
                >
                  Review
                </button> */}

                {/* Delete Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
       {cart.length > 0 && (
        <div className="mt-8 text-right">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md text-lg font-semibold"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartTab;
