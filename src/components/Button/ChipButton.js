import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';
import { buttonTokens, layout, colors } from '../../theme/tokens';
import { useButtonTheme } from './useButtonTheme';

function resolveChipIconColor(active, isDark) {
  if (active) {
    return isDark ? colors.surfaceDark : colors.surfaceLight;
  }
  return isDark ? colors.textMutedDark : colors.textMutedLight;
}

function renderChipIcon(icon, defaultColor) {
  if (!icon) return null;
  return React.cloneElement(icon, { color: icon.props?.color || defaultColor });
}

export function ChipButton({
  label,
  onPress,
  active = false,
  animated = true,
  variant = 'pill',
  size = 'md',
  leftIcon,
  rightIcon,
  style,
  textStyle,
  activeOpacity,
  isDark: isDarkProp,
  ...props
}) {
  const { isDark, container: resolvedContainer, text: resolvedText } = useButtonTheme({
    isDarkProp,
    variant,
    state: active ? 'Active' : 'Inactive',
    styleMap: chipStyles,
  });

  const sizeToken = buttonTokens.sizes[size] || buttonTokens.sizes.md;
  const shapeStyle = variant === 'rect' 
    ? { borderRadius: sizeToken.borderRadius, paddingHorizontal: sizeToken.paddingHorizontal }
    : { borderRadius: sizeToken.borderRadiusPill };
  const iconColor = resolveChipIconColor(active, isDark);

  return (
    <Button
      variant="unstyled"
      animated={animated}
      size={sizeToken.fontSize}
      style={[
        chipStyles.base,
        { height: sizeToken.height, paddingHorizontal: sizeToken.paddingHorizontal },
        shapeStyle,
        resolvedContainer,
        style,
      ]}
      textStyle={[chipStyles.textBase, resolvedText, textStyle]}
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

const chipStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.xs,
    borderWidth: 1.5,
  },
  textBase: {},
  baseLightInactive: { backgroundColor: colors.surfaceLight, borderColor: colors.borderLight },
  textLightInactive: { color: colors.textMutedLight },
  baseLightActive: { backgroundColor: colors.textLight, borderColor: colors.textLight },
  textLightActive: { color: colors.surfaceLight },
  baseDarkInactive: { backgroundColor: colors.surfaceDark, borderColor: colors.borderDark },
  textDarkInactive: { color: colors.textMutedDark },
  baseDarkActive: { backgroundColor: colors.surfaceLight, borderColor: colors.surfaceLight },
  textDarkActive: { color: colors.surfaceDark },
});
