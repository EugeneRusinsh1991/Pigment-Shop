import React from 'react';
import { Animated, Modal, Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../Text';
import { getDrawerStyles, drawerStyles } from './DrawerStyles';
import { useDrawerTheme } from './useDrawerTheme';
import { useDrawerAnimation } from './useDrawerAnimation';

export function DrawerHeader({ title, onClose, children, style, titleStyle }) {
  return (
    <View style={[drawerStyles.header, style]}>
      {title ? <Text variant="h4" style={titleStyle}>{title}</Text> : null}
      {children}
    </View>
  );
}

export function DrawerFooter({ children, style }) {
  return (
    <View style={[drawerStyles.footer, style]}>
      {children}
    </View>
  );
}

export function Drawer({
  visible,
  isOpen,
  onClose,
  scrimOpacity: scrimOpacityProp,
  panelWidth = 300,
  position = 'left',
  slideAnim: slideAnimProp,
  isDark: isDarkProp,
  style,
  children,
}) {
  const activeVisible = isOpen !== undefined ? isOpen : visible;

  const animation = useDrawerAnimation({
    visible: activeVisible,
    panelWidth,
    position,
    onClose,
  });

  const styles = getDrawerStyles(position);
  const theme = useDrawerTheme({ isDarkProp, styleMap: styles });

  const activeSlideAnim = slideAnimProp || animation.slideAnim;
  const activeScrimOpacity = scrimOpacityProp || animation.scrimOpacity;
  const isVisible = activeVisible !== undefined ? activeVisible : animation.shouldRender;

  const handleCloseAction = onClose || animation.handleClose;
  const pressableStyle = { flex: 1 };

  return (
    <Modal visible={isVisible} transparent animationType="none" onRequestClose={handleCloseAction}>
      <View id="app-drawer" style={styles.container}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            theme.styles.overlay,
            { opacity: activeScrimOpacity },
          ]}
        />
        <Animated.View
          style={[
            styles.panel,
            theme.panelStyle,
            {
              width: panelWidth,
              transform: [{ translateX: activeSlideAnim }],
            },
            style,
          ]}
        >
          {children}
        </Animated.View>
        <Pressable
          style={pressableStyle}
          onPress={handleCloseAction}
          accessibilityRole="button"
          accessibilityLabel="Close drawer"
        />
      </View>
    </Modal>
  );
}

export default Drawer;
