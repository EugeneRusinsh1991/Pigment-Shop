import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/tokens';
import { Flag } from '../../components/Flag';

function renderNewBadge(isNew, t) {
  if (!isNew) return null;
  return (
    <Flag variant="chip" readOnly colorScheme="new">
      {t('badgeNew')}
    </Flag>
  );
}

function renderFeaturedBadge(isFeatured, t) {
  if (!isFeatured) return null;
  return (
    <Flag variant="chip" readOnly colorScheme="featured">
      {t('badgeFeatured') || 'FEATURED'}
    </Flag>
  );
}

function renderDiscountBadge(discountPercent) {
  if (!(discountPercent > 0)) return null;
  return (
    <Flag variant="chip" readOnly colorScheme="sale">
      -{discountPercent}%
    </Flag>
  );
}

export default function ProductBadges({ isNew, isFeatured, discountPercent, containerStyle }) {
  const { t } = useTheme();
  
  const hasBadges = isNew || isFeatured || discountPercent > 0;
  if (!hasBadges) return null;

  return (
    <View style={[styles.badgeContainer, containerStyle]}>
      {renderNewBadge(isNew, t)}
      {renderFeaturedBadge(isFeatured, t)}
      {renderDiscountBadge(discountPercent)}
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
