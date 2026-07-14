/**
 * OrdersManager.js
 */
import { useState } from 'react';
import { ActivityIndicator, Text, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import OrderDetails from './OrderDetails';
import OrderRow from './OrderRow';
import styles from './OrdersStyles';
import useAdminOrders from './useAdminOrders';

function OrdersTable({ orders, t, onSelectOrder }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.tableCard}>
      {!isMobile && (
        <View style={styles.tableHeader}>
          <View style={styles.colId}><Text style={styles.thText}>ID</Text></View>
          <View style={styles.colDate}><Text style={styles.thText}>{t('adminOrdersDate')}</Text></View>
          <View style={styles.colCustomer}><Text style={styles.thText}>{t('adminOrdersCustomer')}</Text></View>
          <View style={styles.colNote}><Text style={styles.thText}>Cust Note</Text></View>
          <View style={styles.colAdminNote}><Text style={styles.thText}>Admin Note</Text></View>
          <View style={styles.colStatus}><Text style={styles.thText}>{t('adminOrdersStatus')}</Text></View>
          <View style={styles.colTotal}><Text style={styles.thText}>{t('adminOrdersTotal')}</Text></View>
        </View>
      )}
      {orders.map((order) => (
        <OrderRow 
          key={order.id} 
          order={order} 
          isMobile={isMobile}
          onPress={() => onSelectOrder(order)} 
        />
      ))}
    </View>
  );
}

function renderContent({ loading, error, orders, t, onSelectOrder }) {
  if (loading) return <ActivityIndicator size="large" color="#1C1C1C" style={{ marginTop: 40 }} />;
  if (error) return <Text style={{ color: '#E87A8E', marginTop: 20 }}>{error}</Text>;
  if (orders.length === 0) return <Text style={{ color: '#94a3b8', marginTop: 20 }}>No orders found.</Text>;
  return <OrdersTable orders={orders} t={t} onSelectOrder={onSelectOrder} />;
}

export default function OrdersManager() {
  const { t } = useTheme();
  const { orders, loading, error, updateOrderStatus } = useAdminOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusUpdated = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus, selectedOrder, setSelectedOrder);
  };

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
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t('adminOrdersTitle')}</Text>
        {!loading && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{orders.length}</Text>
          </View>
        )}
      </View>

      {renderContent({ loading, error, orders, t, onSelectOrder: setSelectedOrder })}
    </View>
  );
}

