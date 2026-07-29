import { useCallback } from 'react';
import { useToast } from '../context/ToastContext';
import { useCartContext } from '../features/cart/CartContext';

/**
 * useCartLogic Hook
 * 
 * Encapsulates cart operations with validation and error handling.
 * Wraps CartContext methods and adds consistent error reporting via ToastContext.
 * 
 * @returns {Object} Cart operation functions
 */
export function useCartLogic() {
  const { items, updateQuantity, removeFromCart, addItem } = useCartContext();
  const { showToast } = useToast();

  const findCartItem = useCallback((itemId) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) {
      showToast('Item not found in cart', 'error');
      return null;
    }
    return item;
  }, [items, showToast]);

  /**
   * Increase item quantity by 1
   * @param {string} itemId - Product ID
   */
  const increaseQty = useCallback((itemId) => {
    try {
      const item = findCartItem(itemId);
      if (!item) return;
      
      if (item.qty >= 99) {
        showToast('Maximum quantity reached (99)', 'error');
        return;
      }
      
      updateQuantity(itemId, 1);
    } catch (error) {
      showToast('Failed to update quantity', 'error');
      console.error('increaseQty error:', error);
    }
  }, [findCartItem, updateQuantity, showToast]);

  /**
   * Decrease item quantity by 1 (minimum 1)
   * @param {string} itemId - Product ID
   */
  const decreaseQty = useCallback((itemId) => {
    try {
      const item = findCartItem(itemId);
      if (!item) return;
      
      if (item.qty <= 1) {
        showToast('Minimum quantity is 1', 'error');
        return;
      }
      
      updateQuantity(itemId, -1);
    } catch (error) {
      showToast('Failed to update quantity', 'error');
      console.error('decreaseQty error:', error);
    }
  }, [findCartItem, updateQuantity, showToast]);

  /**
   * Remove item from cart
   * @param {string} itemId - Product ID
   */
  const removeItem = useCallback((itemId) => {
    try {
      const item = findCartItem(itemId);
      if (!item) return;
      
      removeFromCart(itemId);
      showToast('Item removed from cart', 'success');
    } catch (error) {
      showToast('Failed to remove item', 'error');
      console.error('removeItem error:', error);
    }
  }, [findCartItem, removeFromCart, showToast]);

  /**
   * Add item to cart with validation
   * @param {Object} product - Product object
   * @param {number} price - Product price
   * @param {number} quantity - Quantity to add (default 1)
   */
  const addToCart = useCallback((product, price, quantity = 1) => {
    try {
      if (!product || !product.id) {
        showToast('Invalid product', 'error');
        return;
      }
      
      if (quantity < 1 || quantity > 99) {
        showToast('Quantity must be between 1 and 99', 'error');
        return;
      }
      
      addItem(product, price, quantity);
      showToast('Item added to cart', 'success');
    } catch (error) {
      showToast('Failed to add item to cart', 'error');
      console.error('addToCart error:', error);
    }
  }, [addItem, showToast]);

  /**
   * Calculate subtotal for a single cart item
   * @param {Object} item - Cart item
   * @returns {string} Formatted subtotal
   */
  const calculateItemSubtotal = useCallback((item) => {
    try {
      const priceNum = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
      const subtotal = priceNum * item.qty;
      return `$${subtotal.toFixed(2)}`;
    } catch (error) {
      console.error('calculateItemSubtotal error:', error);
      return '$0.00';
    }
  }, []);

  /**
   * Calculate cart totals
   * @returns {Object} { totalPrice, totalItems }
   */
  const calculateTotals = useCallback(() => {
    try {
      const totalPrice = items.reduce((sum, item) => {
        const priceNum = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
        return sum + priceNum * item.qty;
      }, 0);

      const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

      return { totalPrice, totalItems };
    } catch (error) {
      console.error('calculateTotals error:', error);
      return { totalPrice: 0, totalItems: 0 };
    }
  }, [items]);

  return {
    // Operations
    increaseQty,
    decreaseQty,
    removeItem,
    addToCart,
    
    // Calculations
    calculateItemSubtotal,
    calculateTotals,
    
    // Data
    items,
  };
}
