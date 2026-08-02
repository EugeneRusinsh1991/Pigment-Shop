/**
 * OrdersManager.js
 */
import { useMemo, useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import useSort from '../../../hooks/useSort';
import { loadAdminOrders } from '../../../services/adminOrdersService';
import CatalogPagination from '../../catalog/CatalogPagination';
import { useCrudWorkflow } from '../useCrudWorkflow';
import OrderDetails from './OrderDetails';
import { getStatusGroup, sortOrders } from './OrdersSort';
import styles from './OrdersStyles';
import adminStyles from '../AdminPanelStyles';
import { renderContent } from './OrdersTable';
import { StatusFilterBar } from './OrdersTableControls';
import DateRangePicker from '../Analytics/DateRangePicker';

const PAGE_SIZE = 20;

function getOrderTime(order) {
  if (!order || !order.createdAt) return null;
  if (order.createdAt.toMillis) return order.createdAt.toMillis();
  if (order.createdAt.toDate) return order.createdAt.toDate().getTime();
  const d = new Date(order.createdAt);
  return isNaN(d.getTime()) ? null : d.getTime();
}

export default function OrdersManager({ dateRange: propDateRange, onDateRangeChange }) {
  const { t } = useLanguage();
  const { data: orders, loading, error, setInternalData } = useCrudWorkflow({
    loadFn: loadAdminOrders,
  });
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Date range filter — last 7 days by default
  const initialEnd = useMemo(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return end;
  }, []);

  const initialStart = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(initialEnd.getDate() - 6);
    return start;
  }, [initialEnd]);

  const [localDateRange, setLocalDateRange] = useState({ start: initialStart, end: initialEnd, mode: '7days' });

  const dateRange = propDateRange || localDateRange;
  const setDateRange = onDateRangeChange || setLocalDateRange;

  const handleDateChange = (start, end, mode) => {
    setDateRange({ start, end, mode: mode || dateRange.mode || '7days' });
  };

  // Sorting — independent from status filter
  const { sortField, sortDirection, handleSort } = useSort('date');

  // Status filter — array of active filter keys, ['all'] by default
  const [activeFilter, setActiveFilter] = useState(['all']);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, dateRange, sortField, sortDirection]);

  const handleStatusUpdated = (orderId, newStatus) => {
    setInternalData((prev) => 
      prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o)
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const filteredSortedOrders = useMemo(() => {
    const startMs = dateRange.start ? dateRange.start.getTime() : 0;
    const endMs = dateRange.end ? dateRange.end.getTime() : Infinity;

    const filtered = orders.filter((o) => {
      // Status filter
      const isAllSelected = Array.isArray(activeFilter)
        ? activeFilter.includes('all') || activeFilter.length === 0
        : activeFilter === 'all';
      if (!isAllSelected) {
        const orderStatusGroup = getStatusGroup(o.status);
        const matchStatus = Array.isArray(activeFilter)
          ? activeFilter.includes(orderStatusGroup)
          : activeFilter === orderStatusGroup;
        if (!matchStatus) return false;
      }

      // Date range filter
      const orderTime = getOrderTime(o);
      if (orderTime !== null) {
        if (orderTime < startMs || orderTime > endMs) {
          return false;
        }
      }

      return true;
    });
    return sortOrders(filtered, sortField, sortDirection);
  }, [orders, activeFilter, dateRange, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredSortedOrders.length / PAGE_SIZE) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredSortedOrders.slice(start, start + PAGE_SIZE);
  }, [filteredSortedOrders, currentPage]);

  if (selectedOrder) {
    return (
      <View style={{ flex: 1 }}>
        <OrderDetails
          order={selectedOrder}
          onBack={() => setSelectedOrder(null)}
          onStatusUpdated={handleStatusUpdated}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={adminStyles.contentContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <DateRangePicker
          startDate={dateRange.start}
          endDate={dateRange.end}
          mode={dateRange.mode}
          onChange={handleDateChange}
        />

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
          <View style={styles.paginationWrapper}>
            <CatalogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              loading={loading}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
