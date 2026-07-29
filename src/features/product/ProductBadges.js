import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Badge } from '../../components/ui/Badge';
import { layout } from '../../theme/tokens';

function renderNewBadge(isNew, t) {
  if (!isNew) return null;
  return (
    <Badge variant="new" label={t('badgeNew') || 'NEW'} size="sm" />
  );
}

function renderFeaturedBadge(isFeatured, t) {
  if (!isFeatured) return null;
  return (
    <Badge variant="featured" label={t('badgeFeatured') || 'FEATURED'} size="sm" />
  );
}

function renderDiscountBadge(discountPercent) {
  if (!(discountPercent > 0)) return null;
  return (
    <Badge variant="discount" value={discountPercent} size="sm" />
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
    top: layout.spacing.sm,
    left: layout.spacing.sm,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: layout.spacing.xxs,
  },
});

