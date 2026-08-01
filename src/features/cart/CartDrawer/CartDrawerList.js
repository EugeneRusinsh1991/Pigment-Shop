import React from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import usePullToRefresh from '@/hooks/usePullToRefresh';
import { EmptyState } from '@/components/ui/Feedback';
import { BagIcon } from '@/components/Icons';
import { layout } from '@/theme/tokens';
import CartDrawerItem from './CartDrawerItem';

export default function CartDrawerList({ cart, isDark, onClose }) {
  const { refreshing, onRefresh } = usePullToRefresh();
  if (!cart?.items?.length) {
    return (
      <View style={styles.emptyContainer}>
        <EmptyState
          icon={<BagIcon size={48} />}
          title="Ваша корзина пуста"
          description="Добавьте товары в корзину, чтобы оформить заказ."
          isDark={isDark}
        />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.list} 
      contentContainerStyle={styles.listContent}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {cart.items.map((item) => (
        <CartDrawerItem
          key={item.id}
          item={item}
          isDark={isDark}
          onUpdateQuantity={cart.updateQuantity}
          onRemove={cart.removeFromCart}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.spacing.xl,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: layout.spacing.md,
    gap: layout.spacing.md,
  },
});
