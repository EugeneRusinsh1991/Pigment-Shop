/**
 * OrdersManager.js
 */
import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import useSort from '../../../hooks/useSort';
import OrderDetails from './OrderDetails';
import styles from './OrdersStyles';
import { useCrudWorkflow } from '../../../hooks/useCrudWorkflow';
import { loadAdminOrders } from '../../../services/adminOrdersService';
import { StatusFilterBar } from './OrdersTableControls';
import { renderContent } from './OrdersTable';
import { getStatusGroup, sortOrders } from './OrdersSort';

export default function OrdersManager() {
  const { t } = useTheme();
  const { data: orders, loading, error, setInternalData } = useCrudWorkflow({
    loadFn: loadAdminOrders,
  });
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sorting — independent from status filter
  const { sortField, sortDirection, handleSort } = useSort('date');

  // Status filter — 'all' by default (show everything)
  const [activeFilter, setActiveFilter] = useState('all');

  const handleStatusUpdated = (orderId, newStatus) => {
    setInternalData((prev) => 
      prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o)
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const filteredSortedOrders = useMemo(() => {
    const filtered = orders.filter((o) => {
      if (activeFilter === 'all') return true;
      return getStatusGroup(o.status) === activeFilter;
    });
    return sortOrders(filtered, sortField, sortDirection);
  }, [orders, activeFilter, sortField, sortDirection]);

  if (selectedOrder) {
    return (
      <View style={styles.container}>
        <OrderDetails
          order={selectedOrder}
          onBack={() => setSelectedOrder(null)}
          onStatusUpdated={handleStatusUpdated}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusFilterBar
        t={t}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        count={!loading ? filteredSortedOrders.length : null}
      />

      {renderContent({
        loading,
        error,
        orders: filteredSortedOrders,
        t,
        onSelectOrder: setSelectedOrder,
        sortField,
        sortDirection,
        onSort: handleSort,
      })}
    </View>
  );
}
