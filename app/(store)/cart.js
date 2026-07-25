import React from 'react';
import CartView from '../../src/components/CartView';
import PageTransition from '../../src/components/PageTransition';

export default function CartRoute() {
  return (
    <PageTransition trigger="cart">
      <CartView />
    </PageTransition>
  );
}
