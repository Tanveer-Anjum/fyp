

// import React, { createContext, useContext, useEffect, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(() => {
//     // Load cart from localStorage on first load
//     const saved = localStorage.getItem("cartItems");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Save to localStorage on every change
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product) => {
//     const exists = cart.find(
//       (item) => item.id === product.id && item.selectedColor === product.selectedColor
//     );

//     if (exists) {
//       setCart(
//         cart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + product.quantity }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, product]);
//     }
//   };

//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

















import React, { createContext, useContext, useState, useEffect } from "react";
import { addToCartLocal, getCart, removeFromCartLocal, clearCartLocal } from "../utils/cartUtils";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const addToCart = (product) => {
    const updatedCart = addToCartLocal(product);
    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = removeFromCartLocal(id);
    setCart(updatedCart);
  };

  const clearCart = () => {
    const updatedCart = clearCartLocal();
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
