// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (service) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.service.id === service.id);
      if (existing) {
        return prev.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: Date.now(), service, quantity: 1 }];
    });
  };

  // Update quantity
  const updateQty = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(newQty, 1) } : item
      )
    );
  };

  // Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQty, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for convenience
export function useCart() {
  return useContext(CartContext);
}
