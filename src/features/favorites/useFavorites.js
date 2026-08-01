import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { addFavorite, removeFavorite, subscribeFavorites } from '../../services/repositories/favoritesRepository';

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    return subscribeFavorites(user.uid, setFavorites);
  }, [user]);

  const toggleFavorite = useCallback((product) => {
    if (!product || !product.id) return;
    const existing = favorites.find((p) => p.id === product.id);
    const isFav = !!existing;

    setFavorites((prev) =>
      isFav ? prev.filter((p) => p.id !== product.id) : [...prev, product]
    );

    showToast(isFav ? 'Removed from favorites' : 'Added to favorites');

    if (user) {
      if (isFav) {
        removeFavorite(user.uid, existing || product).catch(console.error);
      } else {
        addFavorite(user.uid, product).catch(console.error);
      }
    }
  }, [favorites, user, showToast]);

  const isFavorite = useCallback((productId) => favorites.some((p) => p.id === productId), [favorites]);

  return useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites, toggleFavorite, isFavorite]
  );
}
