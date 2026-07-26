import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/tokens';
import { Flag } from '../../components/Flag';

export default function ProductBadges({ isNew, isFeatured, discountPercent, containerStyle }) {
  const { t } = useTheme();
  if (!isNew && !isFeatured && !(discountPercent > 0)) return null;
  return (
    <View style={[styles.badgeContainer, containerStyle]}>
      {isNew ? (
        <Flag variant="chip" readOnly colorScheme="new">
          {t('badgeNew')}
        </Flag>
      ) : null}
      {isFeatured ? (
        <Flag variant="chip" readOnly colorScheme="featured">
          {t('badgeFeatured') || 'FEATURED'}
        </Flag>
      ) : null}
      {discountPercent > 0 ? (
        <Flag variant="chip" readOnly colorScheme="sale">
          -{discountPercent}%
        </Flag>
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
