import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Drawer } from '@/components/ui/Drawer';
import { useCart } from '@/features/cart/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useSlideAnimation } from '@/hooks/useSlideAnimation';
import CartDrawerHeader from './CartDrawerHeader';
import CartDrawerList from './CartDrawerList';
import CartDrawerFooter from './CartDrawerFooter';

export default function CartDrawer({ visible, onClose }) {
  const { isDark } = useTheme();
  const cart = useCart();
  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth >= 768;
  const panelWidth = isWide ? 400 : windowWidth - 56;

  const { showModal, slideAnim, scrimOpacity, handleClose } = useSlideAnimation(
    visible,
    panelWidth,
    onClose,
    'right'
  );

  return (
    <Drawer
      visible={showModal}
      onClose={handleClose}
      scrimOpacity={scrimOpacity}
      slideAnim={slideAnim}
      position="right"
      panelWidth={panelWidth}
      isDark={isDark}
    >
      <CartDrawerHeader onClose={handleClose} cartCount={cart?.totalCount || 0} isDark={isDark} />
      <CartDrawerList cart={cart} isDark={isDark} onClose={handleClose} />
      <CartDrawerFooter cart={cart} onClose={handleClose} isDark={isDark} />
    </Drawer>
  );
}
