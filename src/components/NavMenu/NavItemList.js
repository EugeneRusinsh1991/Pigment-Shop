import { Text, TouchableOpacity, View } from 'react-native';
import styles from './NavMenuStyles';

function NavItem({ item, isDark, onSelect }) {
  return (
    <TouchableOpacity
      key={item.id}
      style={[styles.itemRow, isDark ? styles.itemRowDark : styles.itemRowLight]}
      onPress={() => onSelect(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.itemIcon}>{item.icon}</Text>
      <Text style={[styles.itemLabel, isDark ? styles.textDark : styles.textLight]} numberOfLines={1}>
        {item.label}
      </Text>
      <Text style={[styles.chevron, isDark ? styles.mutedDark : styles.mutedLight]}>›</Text>
    </TouchableOpacity>
  );
}

export default function NavItemList({ items, isDark, accentLabels, onSelect }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <View style={[styles.divider, isDark ? styles.dividerDark : styles.dividerLight]} />
      {items.map((item) => (
        <NavItem key={item.id} item={item} isDark={isDark} accent={accentLabels} onSelect={onSelect} />
      ))}
    </>
  );
}
