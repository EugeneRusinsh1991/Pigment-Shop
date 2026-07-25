import React from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import { useLocalSearchParams } from 'expo-router';
import OrderConfirmationPage from '../../src/features/orders/OrderConfirmationPage';
import PageTransition from '../../src/components/PageTransition';

export default function OrderConfirmationRoute() {
  const { isDark } = useTheme();
  const rawParams = useLocalSearchParams();
  
  let parsedParams = { ...rawParams };
  if (typeof parsedParams.items === 'string') {
    try {
      parsedParams.items = JSON.parse(parsedParams.items);
    } catch (e) {
      parsedParams.items = [];
    }
  }
  
  return (
    <PageTransition trigger="order-confirmation">
      <OrderConfirmationPage isDark={isDark} params={parsedParams} />
    </PageTransition>
  );
}
