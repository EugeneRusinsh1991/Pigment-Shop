import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const docRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().favorites) {
        setFavorites(docSnap.data().favorites);
      } else {
        setFavorites([]);
      }
    }, (error) => {
      console.warn("Favorites snapshot listener failed:", error);
    });

    return () => unsubscribe();
  }, [user]);

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const isFav = prev.some((p) => p.id === product.id);
      let newFavorites;
      if (isFav) {
        newFavorites = prev.filter((p) => p.id !== product.id);
      } else {
        newFavorites = [...prev, product];
      }
      
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        setDoc(docRef, { favorites: newFavorites }, { merge: true }).catch(console.error);
      }
      
      return newFavorites;
    });
  };

  const isFavorite = (productId) => favorites.some((p) => p.id === productId);

  return { favorites, toggleFavorite, isFavorite };
}
