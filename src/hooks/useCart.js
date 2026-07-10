import { useCallback, useState } from 'react';

/**
 * useCart
 *
 * Manages cart items in local state.
 * Each item: { id, label, icon, price, qty }
 *
 * Returns:
 *   items        – current cart array
 *   addItem      – (product, price, qty?) => void
 *   increaseQty  – (id) => void
 *   decreaseQty  – (id) => void  (minimum 1)
 *   removeItem   – (id) => void
 *   totalCount   – total number of units across all items
 */
export default function useCart() {
  const [items, setItems] = useState([]);

  const addItem = useCallback((product, price, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: Math.min(99, i.qty + qty) } : i
        );
      }
      
      const newItem = { id: product.id, label: product.label, price, qty };
      if (product.image) newItem.image = product.image;
      if (product.icon) newItem.icon = product.icon;
      return [...prev, newItem];
    });
  }, []);

  const increaseQty = useCallback((id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.min(99, i.qty + 1) } : i))
    );
  }, []);

  const decreaseQty = useCallback((id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);

  return { items, addItem, increaseQty, decreaseQty, removeItem, clearCart, totalCount };
}
