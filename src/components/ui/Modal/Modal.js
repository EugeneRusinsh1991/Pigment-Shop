import React from 'react';
import { Modal as RNModal, Platform, Pressable } from 'react-native';
import { modalStyles as styles } from './ModalStyles';
import { useModalTheme } from './useModalTheme';

function sanitizeWebViewportOnClose() {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: window.scrollY, behavior: 'instant' });
    }
  }
}

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

  const rawHandleClose = onClose || onRequestClose;
  const { overlayBg } = useModalTheme();

  const handleClose = () => {
    sanitizeWebViewportOnClose();
    if (rawHandleClose) {
      rawHandleClose();
    }
  };

  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
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

