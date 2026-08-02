import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerFooter } from '@/components/ui/Drawer';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { colors, layout, hapticTokens } from '@/theme/tokens';
import { formatCurrency } from '@/utils/currency';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';

export default function CartDrawerFooter({ cart, onClose, isDark }) {
  const router = useRouter();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  const handleCheckout = () => {
    onClose();
    router.push('/cart');
  };

  if (!cart?.items?.length) return null;

  return (
    <DrawerFooter style={[
      styles.footer,
      Platform.OS !== 'web' && { paddingBottom: layout.spacing.lg + insets.bottom }
    ]}>
      <View style={styles.totalRow}>
        <Text variant="h6">{t('cartTotal')}:</Text>
        <Text variant="h6" weight="bold" style={styles.totalAmount}>
          {formatCurrency(cart?.totalPrice || 0)}
        </Text>
      </View>
      <Button
        title={t('productGoToCart')}
        onPress={handleCheckout}
        isDark={isDark}
        variant="primary"
        size="lg"
        haptic={hapticTokens.selection}
        style={styles.checkoutBtn}
      />
    </DrawerFooter>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingTop: layout.spacing.lg,
    paddingBottom: layout.spacing.lg,
    paddingHorizontal: layout.spacing.md,
    gap: layout.spacing.md,
    ...Platform.select({
      web: {
        paddingBottom: `max(${layout.spacing.lg}px, env(safe-area-inset-bottom))`,
      },
      default: {},
    }),
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.sm,
  },
  totalAmount: {
    color: colors.primary,
  },
  checkoutBtn: {
    width: '100%',
  },
});
