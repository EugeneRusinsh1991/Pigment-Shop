import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/Text';
import DataTable from '@/components/domain/DataTable/DataTable';
import { MobileOrderRow, DesktopOrderRow } from './OrderRow';
import { colors, layout } from '../../../theme/tokens';
import styles from './OrdersStyles';

function OrdersTable({ orders, t, onSelectOrder, sortField, sortDirection, onSort }) {
  const columns = [
    { key: 'id', label: 'ID', style: styles.colId, sortable: true },
    { key: 'customer', label: t('adminOrdersCustomer'), style: styles.colCustomer, sortable: true },
    { key: 'date', label: t('adminOrdersDate'), style: styles.colDate, sortable: true },
    { key: 'status', label: t('adminOrdersStatus'), style: styles.colStatus, sortable: true },
    { key: 'total', label: t('adminOrdersTotal'), style: styles.colTotal, sortable: true },
  ];

  return (
    <DataTable
      data={orders}
      columns={columns}
      sortField={sortField}
      sortDirection={sortDirection}
      onSort={onSort}
      emptyText={t('adminProductsEmpty')}
      renderRow={(order) => (
        <DesktopOrderRow
          key={order.id}
          order={order}
          onPress={() => onSelectOrder(order)}
        />
      )}
      renderMobileRow={(order) => (
        <MobileOrderRow
          key={order.id}
          order={order}
          onPress={() => onSelectOrder(order)}
        />
      )}
      keyExtractor={(order) => order.id}
    />
  );
}

export function renderContent({ loading, error, orders, t, onSelectOrder, sortField, sortDirection, onSort }) {
  if (loading) return <ActivityIndicator size="large" color={colors.textLight} style={styles.loadingIndicator} />;
  if (error) return <Text color="danger" style={styles.errorText}>{error}</Text>;
  return <OrdersTable orders={orders} t={t} onSelectOrder={onSelectOrder} sortField={sortField} sortDirection={sortDirection} onSort={onSort} />;
}
