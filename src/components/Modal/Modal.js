import React from 'react';
import { Modal as RNModal, Pressable, StyleSheet } from 'react-native';
import { layout } from '../../theme/tokens';

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
        style={[styles.overlay, overlayStyle]}
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: layout.zIndices.modal,
  },
  content: {
    width: '100%',
    maxWidth: 420,
  },
});
