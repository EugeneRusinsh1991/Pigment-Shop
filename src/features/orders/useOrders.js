import { useEffect, useState } from 'react';
import { subscribeUserOrders } from '../../services/userOrdersService';

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
    const unsubscribe = subscribeUserOrders(
      user.uid,
      (data) => {
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
