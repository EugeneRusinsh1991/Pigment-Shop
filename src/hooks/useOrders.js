import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { COLLECTIONS } from '../services/collections';

function sortByCreatedAtDesc(a, b) {
  const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
  const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
  return timeB - timeA;
}

/**
 * useOrders
 *
 * Subscribes to the current user's orders from Firestore in real time.
 * Returns [] when no user is authenticated.
 *
 * @param {object|null} user - Firebase user object from AuthContext.
 * @returns {{ orders: Array, loading: boolean }}
 */
export function useOrders(user) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(collection(db, COLLECTIONS.ORDERS), where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort(sortByCreatedAtDesc);
        setOrders(data);
        setLoading(false);
      },
      (error) => {
        console.error('[useOrders] snapshot error:', error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  return { orders, loading };
}
