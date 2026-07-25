import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/tokens';

export default function ProductBadges({ isNew, discountPercent, containerStyle }) {
  const { t } = useTheme();
  if (!isNew && !(discountPercent > 0)) return null;
  return (
    <View style={[styles.badgeContainer, containerStyle]}>
      {isNew ? (
        <View style={styles.newBadge}>
          <Text style={styles.badgeText}>{t('badgeNew')}</Text>
        </View>
      ) : null}
      {discountPercent > 0 ? (
        <View style={styles.discountBadge}>
          <Text style={styles.discountBadgeText}>-{discountPercent}%</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  newBadge: {
    backgroundColor: colors.accent,
    width: 72,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountBadge: {
    backgroundColor: colors.white,
    borderColor: colors.accent,
    borderWidth: 1,
    width: 72,
    paddingVertical: 3,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  discountBadgeText: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: 'bold',
  },
});
