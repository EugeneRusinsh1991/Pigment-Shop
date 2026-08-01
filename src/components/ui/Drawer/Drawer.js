import React, { useEffect } from 'react';
import { Animated, Modal, Pressable, StyleSheet, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../Text';
import { getDrawerStyles, drawerStyles } from './DrawerStyles';
import { useDrawerTheme } from './useDrawerTheme';
import { useDrawerAnimation } from './useDrawerAnimation';
import { useVisualViewportDimensions } from '../../../hooks/useVisualViewportDimensions';
import { useLanguage } from '../../../context/LanguageContext';

export function DrawerHeader({ title, onClose, children, style, titleStyle }) {
  return (
    <View style={[drawerStyles.header, style]}>
      {title ? <Text variant="h4" style={[drawerStyles.title, titleStyle]}>{title}</Text> : null}
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
  const { height: viewportHeight } = useVisualViewportDimensions();
  const { t } = useLanguage();

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

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    if (isVisible) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isVisible]);

  const dynamicWebContainerStyle = Platform.OS === 'web' && viewportHeight ? { height: viewportHeight } : null;

  return (
    <Modal visible={isVisible} transparent animationType="none" onRequestClose={handleCloseAction}>
      <View id="app-drawer" nativeID="app-drawer" style={[styles.container, dynamicWebContainerStyle]}>
        <AnimatedPressable
          style={[
            StyleSheet.absoluteFill,
            theme.styles.overlay,
            { opacity: activeScrimOpacity },
          ]}
          onPress={handleCloseAction}
          accessibilityRole="button"
          accessibilityLabel={t('accessibilityCloseDrawer')}
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
          <SafeAreaView style={{ flex: 1 }}>
            <Pressable
              style={{ flex: 1 }}
              onPress={(e) => {
                e?.stopPropagation?.();
                e?.nativeEvent?.stopPropagation?.();
              }}
            >
              {children}
            </Pressable>
          </SafeAreaView>
        </Animated.View>
        <Pressable
          style={styles.dismissPressable}
          onPress={handleCloseAction}
          accessibilityRole="button"
          accessibilityLabel={t('accessibilityCloseDrawer')}
        />
      </View>
    </Modal>
  );
}

export default Drawer;
