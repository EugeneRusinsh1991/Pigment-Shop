import { useCallback, useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useCartContext } from '../features/cart/CartContext';
import { useFavoritesContext } from '../features/favorites/FavoritesContext';

export function useProductActions(product) {
  const { addItem } = useCartContext();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const { showToast } = useToast();
  const [qty, setQty] = useState(1);

  const onAddToCart = useCallback((prod, q) => {
    try {
      addItem(prod, prod?.price, q);
      showToast('Added to cart');
    } catch (error) {
      showToast('Failed to add to cart');
    }
  }, [addItem, showToast]);

  const decreaseQty = useCallback(() => {
    setQty((q) => Math.max(1, q - 1));
  }, []);

  const increaseQty = useCallback(() => {
    setQty((q) => Math.min(99, q + 1));
  }, []);

  const onToggleFavorite = useCallback(() => {
    try {
      toggleFavorite(product);
    } catch (error) {
      showToast('Failed to update favorites');
    }
  }, [toggleFavorite, product, showToast]);

  return {
    onAddToCart,
    isFavorite: product ? isFavorite(product.id) : false,
    onToggleFavorite,
    qty,
    decreaseQty,
    increaseQty,
  };
}
