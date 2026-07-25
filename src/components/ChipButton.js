import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getButtonStyle } from '../theme/buttonCommon';
import { colors } from '../theme/tokens';
import Button from './Button';

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
  
  const stateKey = active ? 'Active' : 'Inactive';
  const resolved = getButtonStyle(styles, variant, isDark, stateKey);
  const shapeStyle = variant === 'rect' ? styles.rect : styles.pill;
  const iconColor = resolveIconColor(active, isDark);

  return (
    <Button
      variant="unstyled"
      animated={animated}
      style={[
        styles.base,
        shapeStyle,
        resolved.container,
        style,
      ]}
      textStyle={[styles.textBase, resolved.text, textStyle]}
      leftIcon={renderChipIcon(leftIcon, iconColor)}
      rightIcon={renderChipIcon(rightIcon, iconColor)}
      title={label}
      onPress={onPress}
      activeOpacity={activeOpacity}
      isDark={isDark}
      {...props}
    />
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
