import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerHeader } from '@/components/ui/Drawer';
import { IconButton } from '@/components/ui/Button';
import { CloseIcon } from '@/components/Icons';
import { colors, layout, typography } from '@/theme/tokens';
import { Text } from '@/components/ui/Text';

export default function CartDrawerHeader({ onClose, cartCount, isDark }) {
  const iconColor = isDark ? colors.white : colors.dark;

  return (
    <DrawerHeader style={styles.header}>
      <View style={styles.titleRow}>
        <Text variant="h4" style={styles.title}>Корзина</Text>
        {cartCount > 0 && (
          <View style={[styles.badge, isDark ? styles.badgeDark : styles.badgeLight]}>
            <Text style={[styles.badgeText, isDark ? styles.badgeTextDark : styles.badgeTextLight]}>
              {cartCount}
            </Text>
          </View>
        )}
      </View>
      <IconButton
        icon={<CloseIcon color={iconColor} size={20} />}
        onPress={onClose}
        size={36}
        variant="transparent"
        isDark={isDark}
        accessibilityLabel="Close cart"
      />
    </DrawerHeader>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: layout.spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
  },
  title: {
    margin: layout.spacing.none,
  },
  badge: {
    borderRadius: layout.radii.sm,
    paddingHorizontal: layout.spacing.xs,
    paddingVertical: layout.spacing.xxxs,
  },
  badgeDark: {
    backgroundColor: colors.white,
  },
  badgeLight: {
    backgroundColor: colors.dark,
  },
  badgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: 'bold',
  },
  badgeTextDark: {
    color: colors.dark,
  },
  badgeTextLight: {
    color: colors.white,
  },
});
