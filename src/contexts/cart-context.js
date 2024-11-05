import React, { createContext, useState, useMemo, useCallback } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Toggle the cart open or closed
  const toggleCartOpen = useCallback(() => {
    setCartOpen((prevCartOpen) => !prevCartOpen);
  }, []);

  // Add an item to the cart, or if it already exists, increment its quantity
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

  // Remove an item from the cart
  const removeItemFromCart = useCallback((productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }, []);

  // Update the quantity of an item in the cart
  const updateItemQuantity = useCallback((productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  // Calculate the total value-rpridce of all items in the cart
  const totalCartValue = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  // Calculate the total number of items in the cart
  const cartItemCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  );

  console.log({
    cartItems,
    totalCartValue,
    cartItemCount,
    cartOpen,
  });

  const contextValue = useMemo(
    () => ({
      cartItems,
      addItemToCart,
      removeItemFromCart,
      updateItemQuantity,
      totalCartValue,
      cartItemCount,
      toggleCartOpen,
      cartOpen,
    }),
    [
      cartItems,
      addItemToCart,
      removeItemFromCart,
      updateItemQuantity,
      totalCartValue,
      cartItemCount,
      toggleCartOpen,
      cartOpen,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
