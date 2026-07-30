/**
 * OrdersManager.js
 */
import { useMemo, useState, useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import useSort from '../../../hooks/useSort';
import { loadAdminOrders } from '../../../services/adminOrdersService';
import CatalogPagination from '../../catalog/CatalogPagination';
import { useCrudWorkflow } from '../useCrudWorkflow';
import OrderDetails from './OrderDetails';
import { getStatusGroup, sortOrders } from './OrdersSort';
import styles from './OrdersStyles';
import { renderContent } from './OrdersTable';
import { StatusFilterBar } from './OrdersTableControls';

const PAGE_SIZE = 50;

export default function OrdersManager() {
  const { t } = useTheme();
  const { data: orders, loading, error, setInternalData } = useCrudWorkflow({
    loadFn: loadAdminOrders,
  });
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sorting — independent from status filter
  const { sortField, sortDirection, handleSort } = useSort('date');

  // Status filter — array of active filter keys, ['all'] by default
  const [activeFilter, setActiveFilter] = useState(['all']);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, sortField, sortDirection]);

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
      const isAllSelected = Array.isArray(activeFilter)
        ? activeFilter.includes('all') || activeFilter.length === 0
        : activeFilter === 'all';
      if (isAllSelected) return true;

      const orderStatusGroup = getStatusGroup(o.status);
      return Array.isArray(activeFilter)
        ? activeFilter.includes(orderStatusGroup)
        : activeFilter === orderStatusGroup;
    });
    return sortOrders(filtered, sortField, sortDirection);
  }, [orders, activeFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredSortedOrders.length / PAGE_SIZE) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredSortedOrders.slice(start, start + PAGE_SIZE);
  }, [filteredSortedOrders, currentPage]);

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
        orders: paginatedOrders,
        t,
        onSelectOrder: setSelectedOrder,
        sortField,
        sortDirection,
        onSort: handleSort,
      })}

      {!loading && !error && totalPages > 1 && (
        <CatalogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
          onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          loading={loading}
        />
      )}
    </View>
  );
}
