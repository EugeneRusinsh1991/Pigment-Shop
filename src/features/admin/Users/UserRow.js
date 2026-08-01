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
        <Text variant="subtitle2" style={styles.mobileCardName} numberOfLines={1}>{fullName}</Text>
        <View style={styles.mobileCardMeta}>
          {metaItems.map((item, i) => (
            <View key={i} style={styles.metaItemRow}>
              {i > 0 && <Text variant="caption" style={styles.mobileCardMetaDot}>·</Text>}
              <Text variant="caption" style={styles.mobileCardMetaItem} numberOfLines={1}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.mobileCardBadge}>
        <Text variant="overline" style={styles.mobileCardBadgeText}>{user.orderCount || 0}</Text>
      </View>
      <Text variant="body2" style={styles.mobileCardChevron}>›</Text>
    </AnimatedButton>
  );
}

function renderCell(value, style) {
  return (
    <Text variant="caption" style={style} numberOfLines={1}>
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
        <Text variant="subtitle2" style={styles.userNameBold}>{fullName}</Text>
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
          <Text variant="overline" style={styles.ordersBadgeText}>{user.orderCount || 0}</Text>
        </View>
        <Text variant="h4" style={styles.rowChevron}>›</Text>
      </View>
    </AnimatedButton>
  );
}

