/**
 * CartContext.js
 *
 * Promotes `useCart` from a local hook into a React Context so any component
 * can access cart state without prop drilling.
 */
import { createContext, useContext, useMemo } from 'react';
import useCartHook from './useCart';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const cart = useCartHook();
  const value = useMemo(
    () => cart,
    [
      cart.cartItems,
      cart.items,
      cart.addToCart,
      cart.addItem,
      cart.removeFromCart,
      cart.updateQuantity,
      cart.clearCart,
      cart.totalCount,
      cart.totalPrice,
    ]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

/** @deprecated Use `useCart` instead */
export const useCartContext = useCart;
