import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addFavorite, removeFavorite, subscribeFavorites } from '../services/repositories/favoritesRepository';

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    return subscribeFavorites(user.uid, setFavorites);
  }, [user]);

  const toggleFavorite = useCallback((product) => {
    setFavorites((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      const isFav = !!existing;
      const next = isFav
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];

      if (user) {
        if (isFav) {
          removeFavorite(user.uid, existing || product).catch(console.error);
        } else {
          addFavorite(user.uid, product).catch(console.error);
        }
      }

      return next;
    });
  }, [user]);

  const isFavorite = useCallback((productId) => favorites.some((p) => p.id === productId), [favorites]);

  return useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites, toggleFavorite, isFavorite]
  );
}
