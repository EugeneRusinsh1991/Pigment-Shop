import { Text, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import OrderCard from '../../OrderCard';
import styles from './UsersStyles';

const getStyle = (dark, light) => light;

export default function UserOrdersList({ orders, expandedOrders, onToggle }) {
  const { t } = useTheme();
  if (!orders || orders.length === 0) {
    return <Text style={styles.emptyText}>{t('ordersEmpty')}</Text>;
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
