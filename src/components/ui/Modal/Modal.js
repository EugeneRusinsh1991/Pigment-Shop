import React from 'react';
import { Modal as RNModal, Pressable } from 'react-native';
import { modalStyles as styles } from './ModalStyles';
import { useModalTheme } from './useModalTheme';

export default function Modal({
  visible,
  onClose,
  onRequestClose,
  animationType = 'fade',
  transparent = true,
  closeOnBackdropPress = true,
  overlayStyle,
  contentStyle,
  children,
  ...props
}) {
  if (!visible) return null;

  const handleClose = onClose || onRequestClose;
  const { overlayBg } = useModalTheme();

  const handleBackdropPress = () => {
    if (closeOnBackdropPress && handleClose) {
      handleClose();
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={handleClose}
      {...props}
    >
      <Pressable
        style={[styles.overlay, { backgroundColor: overlayBg }, overlayStyle]}
        onPress={handleBackdropPress}
      >
        <Pressable
          style={[styles.content, contentStyle]}
          onPress={(e) => {
            if (e && typeof e.stopPropagation === 'function') {
              e.stopPropagation();
            }
          }}
        >
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

