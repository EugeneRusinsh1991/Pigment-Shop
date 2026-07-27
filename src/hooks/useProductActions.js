import { useCallback, useState } from 'react';
import { useCartContext } from '../context/CartContext';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';

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
      showToast(isFavorite(product.id) ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      showToast('Failed to update favorites');
    }
  }, [toggleFavorite, product, isFavorite, showToast]);

  return {
    onAddToCart,
    isFavorite: product ? isFavorite(product.id) : false,
    onToggleFavorite,
    qty,
    decreaseQty,
    increaseQty,
  };
}
