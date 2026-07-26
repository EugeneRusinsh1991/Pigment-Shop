import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import OrdersPage from '@/features/orders/OrdersPage';
import { PageTransition } from '@\/components\/Motion';

export default function OrdersRoute() {
  const { isDark } = useTheme();
  return (
    <PageTransition trigger="orders">
      <OrdersPage isDark={isDark} />
    </PageTransition>
  );
}
