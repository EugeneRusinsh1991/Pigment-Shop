import React from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import OrdersPage from '../../src/features/orders/OrdersPage';
import PageTransition from '../../src/components/PageTransition';

export default function OrdersRoute() {
  const { isDark } = useTheme();
  return (
    <PageTransition trigger="orders">
      <OrdersPage isDark={isDark} />
    </PageTransition>
  );
}
