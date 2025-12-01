// import React, { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find((p) => p.name === product.name);
//       if (existing) {
//         // Increment quantity if product already in cart
//         return prev.map((p) =>
//           p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p
//         );
//       } else {
//         // Add new product with quantity 1
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });
//     console.log("Added to cart:", product);
//   };

//   const removeFromCart = (name) => {
//     setCart((prev) => prev.filter((p) => p.name !== name));
//   };

//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);











import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on first load
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exists = cart.find(
      (item) => item.id === product.id && item.selectedColor === product.selectedColor
    );

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

