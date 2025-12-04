// utils/cartUtils.js

export const addToCartLocal = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Make sure image URL is full
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://localhost:8080${product.image}` // prepend backend URL
    : "/uploads/default-product.jpg"; // default image

  const existingIndex = cart.findIndex((item) => item.id === product.id);

  if (existingIndex !== -1) {
    // Increase quantity if item already exists
    cart[existingIndex].quantity += product.quantity || 1;
  } else {
    cart.push({
      ...product,
      image: imageUrl,
      quantity: product.quantity || 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const removeFromCartLocal = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const newCart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(newCart));
  return newCart;
};

export const clearCartLocal = () => {
  localStorage.removeItem("cart");
  return [];
};
