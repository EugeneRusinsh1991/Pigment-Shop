import { View } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import OrderCard from '../../../features/orders/components/OrderCard';
import EmptyState from '@/components/domain/DataTable/EmptyState';
import styles from './UsersStyles';

const getStyle = (dark, light) => light;

export default function UserOrdersList({ orders, expandedOrders, onToggle }) {
  const { t } = useLanguage();
  if (!orders || orders.length === 0) {
    return <EmptyState>{t('ordersEmpty')}</EmptyState>;
  }
  return (
    <View style={styles.ordersList}>
      {orders.map(order => (
        <OrderCard
          key={order.id}
          order={order}
          isDark={false}
          isExpanded={!!expandedOrders[order.id]}
          onToggle={() => onToggle(order.id)}
          getStyle={getStyle}
          isAdminView={true}
        />
      ))}
    </View>
  );
}
