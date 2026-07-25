import React from 'react';
import { Modal, View, Animated, StyleSheet, Pressable, Platform } from 'react-native';
import { colors, layout, shadows } from '../theme/tokens';

export default function SideDrawer({
  visible,
  onClose,
  scrimOpacity,
  panelWidth,
  slideAnim,
  isDark,
  children,
}) {
  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View id="app-drawer" style={styles.container}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colors.overlayScrim,
              opacity: scrimOpacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.panel,
            isDark ? styles.panelDark : styles.panelLight,
            {
              width: panelWidth,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {children}
        </Animated.View>
        <Pressable style={{ flex: 1 }} onPress={onClose} accessibilityRole="button" accessibilityLabel="Close drawer" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  panel: {
    height: '100%',
    ...Platform.select({
      web: shadows.drawerSide.web,
      default: shadows.drawerSide.native,
    }),
    elevation: layout.elevation.xl,
  },
  panelDark: { backgroundColor: colors.navSurfaceDark },
  panelLight: { backgroundColor: colors.white },
});
