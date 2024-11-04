import React, { createContext, useState, useMemo, useCallback } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCartOpen = useCallback(() => {
    setCartOpen((prevCartOpen) => !prevCartOpen);
  }, []);

  const addItemToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const removeItemFromCart = useCallback((productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }, []);

  const updateItemQuantity = useCallback((productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const totalCartValue = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const cartItemCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  );

  console.log({
    cartItems,
    totalCartValue,
    cartItemCount,
    cartOpen
  });

  const contextValue = useMemo(
    () => ({
      cartItems,
      addItemToCart,
      removeItemFromCart,
      updateItemQuantity,
      totalCartValue,
      cartItemCount,
      toggleCartOpen
    }),
    [
      cartItems,
      addItemToCart,
      removeItemFromCart,
      updateItemQuantity,
      totalCartValue,
      cartItemCount,
      toggleCartOpen
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
