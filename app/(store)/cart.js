import React from 'react';
import CartView from '@/components/CartView';
import PageTransition from '@/components/PageTransition';

export default function CartRoute() {
  return (
    <PageTransition trigger="cart">
      <CartView />
    </PageTransition>
  );
}
