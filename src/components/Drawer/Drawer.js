import React from 'react';
import { Animated, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, layout, shadows } from '../../theme/tokens';

export function DrawerHeader({ title, onClose, children, style, titleStyle }) {
  return (
    <View style={[styles.header, style]}>
      {title ? <Text style={[styles.headerTitle, titleStyle]}>{title}</Text> : null}
      {children}
    </View>
  );
}

export function DrawerFooter({ children, style }) {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
}

export function Drawer({
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

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    zIndex: layout.zIndices.drawer,
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLightBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.secondaryLightBorder,
    marginTop: 'auto',
  },
});
