import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * PlaceholderCard
 *
 * Props:
 *   item      { id, label, icon, children }
 *   onPress   () => void
 *   isDark    boolean
 *   isLeaf    boolean  – true when this node has no children (Product level)
 */
export default function PlaceholderCard({ item, onPress, isDark, isLeaf }) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isDark ? styles.cardDark : styles.cardLight,
        isLeaf && (isDark ? styles.cardLeafDark : styles.cardLeafLight),
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Icon */}
      <View style={[styles.iconWrap, isDark ? styles.iconWrapDark : styles.iconWrapLight]}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>

      {/* Label */}
      <Text
        style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}
        numberOfLines={2}
      >
        {item.label}
      </Text>

      {/* Arrow / leaf indicator */}
      <Text style={[styles.arrow, isDark ? styles.arrowDark : styles.arrowLight]}>
        {isLeaf ? '●' : '›'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardLight: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  // Leaf (Product) cards get a subtle accent border
  cardLeafDark: {
    borderColor: '#38bdf8',
    borderWidth: 1.5,
  },
  cardLeafLight: {
    borderColor: '#7c3aed',
    borderWidth: 1.5,
  },

  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconWrapDark: {
    backgroundColor: '#0f172a',
  },
  iconWrapLight: {
    backgroundColor: '#f1f5f9',
  },
  icon: {
    fontSize: 22,
  },

  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  labelDark: {
    color: '#f1f5f9',
  },
  labelLight: {
    color: '#1e293b',
  },

  arrow: {
    fontSize: 22,
    marginLeft: 8,
    fontWeight: '300',
  },
  arrowDark: {
    color: '#475569',
  },
  arrowLight: {
    color: '#94a3b8',
  },
});
