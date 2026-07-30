import React from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { useCart } from '@/features/cart/CartContext';
import { useTheme } from '@/context/ThemeContext';
import CartDrawerHeader from './CartDrawerHeader';
import CartDrawerList from './CartDrawerList';
import CartDrawerFooter from './CartDrawerFooter';

export default function CartDrawer({ visible, onClose }) {
  const { isDark } = useTheme();
  const cart = useCart();

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      position="right"
      panelWidth={400}
      isDark={isDark}
    >
      <CartDrawerHeader onClose={onClose} cartCount={cart?.totalCount || 0} isDark={isDark} />
      <CartDrawerList cart={cart} isDark={isDark} onClose={onClose} />
      <CartDrawerFooter cart={cart} onClose={onClose} isDark={isDark} />
    </Drawer>
  );
}
