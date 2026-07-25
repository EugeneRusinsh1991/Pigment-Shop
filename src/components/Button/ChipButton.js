import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';
import { useTheme } from '../../context/ThemeContext';
import { getButtonStyle, buttonColors } from '../../theme/buttonCommon';

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
  const resolved = getButtonStyle(chipStyles, variant, isDark, stateKey);
  const shapeStyle = variant === 'rect' ? chipStyles.rect : chipStyles.pill;
  const iconColor = resolveChipIconColor(active, isDark);

  return (
    <Button
      variant="unstyled"
      animated={animated}
      style={[
        chipStyles.base,
        shapeStyle,
        resolved.container,
        style,
      ]}
      textStyle={[chipStyles.textBase, resolved.text, textStyle]}
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
    height: 36,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
  },
  pill: { borderRadius: 20 },
  rect: { borderRadius: 6, borderWidth: 1, paddingVertical: 6, paddingHorizontal: 16 },
  textBase: { fontSize: 13, fontWeight: '500' },
  baseLightInactive: { backgroundColor: buttonColors.surfaceLight, borderColor: buttonColors.borderLight },
  textLightInactive: { color: buttonColors.textMutedLight },
  baseLightActive: { backgroundColor: buttonColors.textLight, borderColor: buttonColors.textLight },
  textLightActive: { color: buttonColors.surfaceLight, fontWeight: '600' },
  baseDarkInactive: { backgroundColor: buttonColors.surfaceDark, borderColor: buttonColors.borderDark },
  textDarkInactive: { color: buttonColors.textMutedDark },
  baseDarkActive: { backgroundColor: buttonColors.surfaceLight, borderColor: buttonColors.surfaceLight },
  textDarkActive: { color: buttonColors.surfaceDark, fontWeight: '600' },
});
