import React from 'react';
import CartView from '@/features/cart/CartView';
import { PageTransition } from '@/components/ui/Motion';

export default function CartRoute() {
  return (
    <PageTransition trigger="cart">
      <CartView />
    </PageTransition>
  );
}
