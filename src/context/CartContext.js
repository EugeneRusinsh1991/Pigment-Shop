/**
 * CartContext.js
 *
 * Promotes `useCart` from a local hook into a React Context so any component
 * can access cart state without prop drilling.
 */
import React, { createContext, useContext } from 'react';
import useCart from '../hooks/useCart';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
}
