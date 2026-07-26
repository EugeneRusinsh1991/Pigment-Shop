import { View } from 'react-native';
import { Text } from '../../Text';
import { AnimatedButton } from '@/components/Button';
import { useTheme } from '../../../context/ThemeContext';
import styles from './UsersStyles';

export function MobileUserCard({ user, index, fullName, onPress }) {
  const metaItems = [user.email, user.phone, user.city].filter(Boolean);

  return (
    <AnimatedButton
      style={[styles.mobileCard, index % 2 === 1 && styles.mobileCardAlt]}
      onPress={onPress}
      activeOpacity={0.7}
      scaleTo={0.99}
    >
      <View style={styles.mobileCardContent}>
        <Text style={styles.mobileCardName} numberOfLines={1}>{fullName}</Text>
        <View style={styles.mobileCardMeta}>
          {metaItems.map((item, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              {i > 0 && <Text style={styles.mobileCardMetaDot}>·</Text>}
              <Text style={styles.mobileCardMetaItem} numberOfLines={1}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.mobileCardBadge}>
        <Text style={styles.mobileCardBadgeText}>{user.orderCount || 0}</Text>
      </View>
      <Text style={styles.mobileCardChevron}>›</Text>
    </AnimatedButton>
  );
}

export function DesktopUserRow({ user, index, fullName, onPress }) {
  const cellStyle = (val) => (val ? styles.cellText : styles.cellTextMuted);

  return (
    <AnimatedButton
      style={[styles.tableRow, index % 2 === 1 && styles.tableRowAlt]}
      onPress={onPress}
      activeOpacity={0.7}
      scaleTo={0.99}
    >
      <View style={[styles.colName, styles.userCell]}>
        <Text style={styles.userNameBold}>{fullName}</Text>
      </View>
      <View style={[styles.colEmail, styles.userCell]}>
        <Text style={cellStyle(user.email)}>{user.email || '—'}</Text>
      </View>
      <View style={[styles.colPhone, styles.userCell]}>
        <Text style={cellStyle(user.phone)}>{user.phone || '—'}</Text>
      </View>
      <View style={[styles.colPhone, styles.userCell]}>
        <Text style={cellStyle(user.city)}>{user.city || '—'}</Text>
      </View>
      <View style={[styles.colOrders, { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }]}>
        <View style={styles.ordersBadge}>
          <Text style={styles.ordersBadgeText}>{user.orderCount || 0}</Text>
        </View>
        <Text style={styles.rowChevron}>›</Text>
      </View>
    </AnimatedButton>
  );
}

