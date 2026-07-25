import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useButtonProps, buttonColors, getButtonStyle } from '../theme/buttonCommon';
import { colors } from '../theme/tokens';

import AnimatedButton from './AnimatedButton';

function resolveIconColor(active, isDark) {
  if (active) {
    return isDark ? colors.surfaceDark : colors.surfaceLight;
  }
  return isDark ? colors.textMutedDark : colors.textMutedLight;
}

function renderChipIcon(icon, defaultColor) {
  if (!icon) return null;
  return React.cloneElement(icon, { color: icon.props?.color || defaultColor });
}

export default function ChipButton({
  label,
  onPress,
  active = false,
  animated = true,
  variant = 'pill',
  leftIcon,
  rightIcon,
  style,
  textStyle,
  activeOpacity,
  isDark: isDarkProp,
  ...props
}) {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;
  const { touchableProps } = useButtonProps({
    isDark,
    activeOpacity,
    onPress,
    ...props,
  });

  const stateKey = active ? 'Active' : 'Inactive';
  const resolved = getButtonStyle(styles, variant, isDark, stateKey);
  const shapeStyle = variant === 'rect' ? styles.rect : styles.pill;
  const iconColor = resolveIconColor(active, isDark);

  const Component = animated ? AnimatedButton : TouchableOpacity;
  const hitSlop = { top: 4, bottom: 4, left: 4, right: 4 };

  return (
    <Component
      style={[
        styles.base,
        shapeStyle,
        resolved.container,
        style,
      ]}
      hitSlop={hitSlop}
      {...touchableProps}
    >
      {renderChipIcon(leftIcon, iconColor)}
      {label ? (
        <Text style={[styles.textBase, resolved.text, textStyle]}>
          {label}
        </Text>
      ) : null}
      {renderChipIcon(rightIcon, iconColor)}
    </Component>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 36,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
  },
  pill: {
    borderRadius: 20,
  },
  rect: {
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  textBase: {
    fontSize: 13,
    fontWeight: '500',
  },

  // Light theme - Inactive
  baseLightInactive: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.borderLight,
  },
  textLightInactive: {
    color: colors.textMutedLight,
  },

  // Light theme - Active
  baseLightActive: {
    backgroundColor: colors.textLight,
    borderColor: colors.textLight,
  },
  textLightActive: {
    color: colors.surfaceLight,
    fontWeight: '600',
  },

  // Dark theme - Inactive
  baseDarkInactive: {
    backgroundColor: colors.surfaceDark,
    borderColor: colors.borderDark,
  },
  textDarkInactive: {
    color: colors.textMutedDark,
  },

  // Dark theme - Active
  baseDarkActive: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.surfaceLight,
  },
  textDarkActive: {
    color: colors.surfaceDark,
    fontWeight: '600',
  },
});
