import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from '@/components/ui/Text';
import { IconButton } from '@/components/ui/Button';
import { CloseIcon, MinusIcon, PlusIcon } from '@/components/Icons';
import { colors, layout, typography } from '@/theme/tokens';
import { formatCurrency } from '@/utils/currency';

export default function CartDrawerItem({ item, isDark, onUpdateQuantity, onRemove }) {
  const iconColor = isDark ? colors.white : colors.dark;

  const handleDecrease = () => {
    if (item.qty > 1) {
      onUpdateQuantity(item.id, -1);
    } else {
      onRemove(item.id);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, 1);
  };

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <Image
        source={{ uri: item.image || item.product?.image || 'https://via.placeholder.com/150' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text variant="body1" style={styles.title} numberOfLines={2}>
            {item.name || item.product?.title || item.label}
          </Text>
          <IconButton
            icon={<CloseIcon color={colors.danger} size={16} />}
            onPress={() => onRemove(item.id)}
            size={32}
            variant="transparent"
            isDark={isDark}
          />
        </View>
        
        {item.variant && (
          <Text variant="caption" style={isDark ? styles.subtextDark : styles.subtextLight}>
            {item.variant}
          </Text>
        )}

        <View style={styles.footerRow}>
          <View style={[styles.quantityControl, isDark ? styles.quantityControlDark : styles.quantityControlLight]}>
            <IconButton
              icon={<MinusIcon color={iconColor} size={14} />}
              onPress={handleDecrease}
              size={28}
              variant="transparent"
              isDark={isDark}
            />
            <Text style={styles.quantityText}>{item.qty}</Text>
            <IconButton
              icon={<PlusIcon color={iconColor} size={14} />}
              onPress={handleIncrease}
              size={28}
              variant="transparent"
              isDark={isDark}
            />
          </View>
          <Text variant="subtitle2" style={styles.price}>
            {formatCurrency(item.price * item.qty)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: layout.spacing.sm,
    borderRadius: layout.radii.md,
    gap: layout.spacing.md,
  },
  containerLight: {
    backgroundColor: colors.backgroundLight,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.borderLight,
  },
  containerDark: {
    backgroundColor: colors.backgroundDark,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.borderDark,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: layout.radii.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: layout.spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: typography.sizes.sm,
  },
  subtextLight: {
    color: colors.textDescLight,
  },
  subtextDark: {
    color: colors.textDescDark,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: layout.spacing.sm,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: layout.radii.full,
    borderWidth: layout.borderWidth.thin,
  },
  quantityControlLight: {
    borderColor: colors.borderLight,
  },
  quantityControlDark: {
    borderColor: colors.borderDark,
  },
  quantityText: {
    width: 24,
    textAlign: 'center',
    fontSize: typography.sizes.sm,
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
  },
});
