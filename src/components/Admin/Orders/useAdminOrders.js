import { useState, useEffect, useCallback } from 'react';
import { loadAdminOrders } from './OrdersService';

export default function useAdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loadAdminOrders();
      setOrders(data);
    } catch (err) {
      console.error('[useAdminOrders] Failed to load orders:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = (orderId, newStatus, selectedOrder, setSelectedOrder) => {
    setOrders((prev) => 
      prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o)
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return { orders, loading, error, updateOrderStatus };
}
