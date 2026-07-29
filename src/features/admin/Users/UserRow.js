import { AnimatedButton } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { View } from 'react-native';
import { motion } from '../../../theme/tokens';
import styles from './UsersStyles';

export function MobileUserCard({ user, index, fullName, onPress }) {
  const metaItems = [user.email, user.phone, user.city].filter(Boolean);

  return (
    <AnimatedButton
      style={[styles.mobileCard, index % 2 === 1 && styles.mobileCardAlt]}
      onPress={onPress}
      activeOpacity={motion.press.activeOpacity}
      scaleTo={0.99}
    >
      <View style={styles.mobileCardContent}>
        <Text style={styles.mobileCardName} size={14} weight="bold" numberOfLines={1}>{fullName}</Text>
        <View style={styles.mobileCardMeta}>
          {metaItems.map((item, i) => (
            <View key={i} style={styles.metaItemRow}>
              {i > 0 && <Text style={styles.mobileCardMetaDot} size={12}>·</Text>}
              <Text style={styles.mobileCardMetaItem} size={12} numberOfLines={1}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.mobileCardBadge}>
        <Text style={styles.mobileCardBadgeText} size={12} weight="700">{user.orderCount || 0}</Text>
      </View>
      <Text style={styles.mobileCardChevron} size={14}>›</Text>
    </AnimatedButton>
  );
}

function renderCell(value, style) {
  return (
    <Text style={style} size={13} numberOfLines={1}>
      {value || '—'}
    </Text>
  );
}

export function DesktopUserRow({ user, index, fullName, onPress }) {
  return (
    <AnimatedButton
      style={[styles.tableRow, index % 2 === 1 && styles.tableRowAlt]}
      onPress={onPress}
      activeOpacity={motion.press.activeOpacity}
      scaleTo={0.99}
    >
      <View style={[styles.colName, styles.userCell]}>
        <Text style={styles.userNameBold} size={14} weight="bold">{fullName}</Text>
      </View>
      <View style={[styles.colEmail, styles.userCell]}>
        {renderCell(user.email, user.email ? styles.cellText : styles.cellTextMuted)}
      </View>
      <View style={[styles.colPhone, styles.userCell]}>
        {renderCell(user.phone, user.phone ? styles.cellText : styles.cellTextMuted)}
      </View>
      <View style={[styles.colPhone, styles.userCell]}>
        {renderCell(user.city, user.city ? styles.cellText : styles.cellTextMuted)}
      </View>
      <View style={[styles.colOrders, styles.colOrdersContent]}>
        <View style={styles.ordersBadge}>
          <Text style={styles.ordersBadgeText} size={12} weight="700">{user.orderCount || 0}</Text>
        </View>
        <Text style={styles.rowChevron} size={16} weight="600">›</Text>
      </View>
    </AnimatedButton>
  );
}

