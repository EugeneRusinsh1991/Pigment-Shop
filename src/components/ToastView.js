import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors, layout, shadows } from '../theme/tokens';
import { useTheme } from '../context/ThemeContext';

export function ToastView({ toast, fadeAnim }) {
  const { isDark } = useTheme();

  if (!toast) return null;

  let toastBg = isDark ? colors.surfaceDark : colors.surfaceLight;
  let textColor = isDark ? colors.textDark : colors.textLight;
  let borderColor = isDark ? colors.borderDark : colors.borderLight;

  if (toast.type === 'error') {
    toastBg = isDark ? colors.dangerDarkShellBg : colors.dangerBgLight;
    textColor = isDark ? colors.textDark : colors.dangerDeep;
    borderColor = colors.dangerMid;
  } else if (toast.type === 'success') {
    toastBg = isDark ? colors.navSurfaceDark : colors.successBgLight;
    textColor = isDark ? colors.successLight : colors.successDeep;
    borderColor = colors.successMid;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: toastBg,
          borderColor,
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        },
      ]}
      pointerEvents="none"
    >
      <Text style={[styles.text, { color: textColor }]}>{toast.message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: layout.radii.md,
    borderWidth: 1,
    maxWidth: '90%',
    zIndex: layout.zIndices.toast,
    ...shadows.dropdownLight.web,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
