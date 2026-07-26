import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';
import { buttonColors } from '../../theme/buttonCommon';
import { buttonTokens, layout } from '../../theme/tokens';
import { useButtonTheme } from './useButtonTheme';

function resolveChipIconColor(active, isDark) {
  if (active) {
    return isDark ? buttonColors.surfaceDark : buttonColors.surfaceLight;
  }
  return isDark ? buttonColors.textMutedDark : buttonColors.textMutedLight;
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
  baseLightInactive: { backgroundColor: buttonColors.surfaceLight, borderColor: buttonColors.borderLight },
  textLightInactive: { color: buttonColors.textMutedLight },
  baseLightActive: { backgroundColor: buttonColors.textLight, borderColor: buttonColors.textLight },
  textLightActive: { color: buttonColors.surfaceLight },
  baseDarkInactive: { backgroundColor: buttonColors.surfaceDark, borderColor: buttonColors.borderDark },
  textDarkInactive: { color: buttonColors.textMutedDark },
  baseDarkActive: { backgroundColor: buttonColors.surfaceLight, borderColor: buttonColors.surfaceLight },
  textDarkActive: { color: buttonColors.surfaceDark },
});
