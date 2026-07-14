import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import styles from './UsersStyles';


function UserCell({ col, val }) {
  const cellStyle = val ? styles.cellText : styles.cellTextMuted;
  const displayVal = val || '—';
  return (
    <View style={[col, styles.userCell]}>
      <Text style={cellStyle}>
        {displayVal}
      </Text>
    </View>
  );
}

function OrdersBadge({ orderCount }) {
  if (orderCount > 0) {
    return (
      <View style={styles.ordersBadge}>
        <Text style={styles.ordersBadgeText}>{orderCount}</Text>
      </View>
    );
  }
  return <Text style={styles.cellTextMuted}>0</Text>;
}

export default function UserRow({ user, index, onPress }) {
  const { t } = useTheme();
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || t('adminUsersUnnamed');

  return (
    <TouchableOpacity
      style={[styles.tableRow, index % 2 === 1 && styles.tableRowAlt]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.rowNum}>{index + 1}</Text>
      <UserCell col={styles.colName}  val={fullName}     />
      <UserCell col={styles.colEmail} val={user.email}   />
      <UserCell col={styles.colPhone} val={user.phone}   />
      <UserCell col={styles.colPhone} val={user.city}    />
      <View style={styles.colOrders}>
        <OrdersBadge orderCount={user.orderCount} />
      </View>
    </TouchableOpacity>
  );
}
