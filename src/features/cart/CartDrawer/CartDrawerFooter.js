import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerFooter } from '@/components/ui/Drawer';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { colors, layout } from '@/theme/tokens';
import { formatCurrency } from '@/utils/currency';
import { useRouter } from 'expo-router';

export default function CartDrawerFooter({ cart, onClose, isDark }) {
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    router.push('/cart');
  };

  if (!cart?.items?.length) return null;

  return (
    <DrawerFooter style={styles.footer}>
      <View style={styles.totalRow}>
        <Text variant="h6">Итого:</Text>
        <Text variant="h6" style={styles.totalAmount}>
          {formatCurrency(cart?.totalPrice || 0)}
        </Text>
      </View>
      <Button
        label="В корзину"
        onPress={handleCheckout}
        isDark={isDark}
        variant="primary"
        size="lg"
        style={styles.checkoutBtn}
      />
    </DrawerFooter>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: layout.spacing.lg,
    paddingHorizontal: layout.spacing.md,
    gap: layout.spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.sm,
  },
  totalAmount: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    width: '100%',
  },
});
