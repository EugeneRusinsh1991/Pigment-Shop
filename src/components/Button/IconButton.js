import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';
import { useTheme } from '../../context/ThemeContext';
import { getButtonStyle, buttonColors } from '../../theme/buttonCommon';

export function IconButton({
  icon,
  onPress,
  size = 'md',
  variant = 'transparent',
  animated = true,
  style,
  activeOpacity,
  isDark: isDarkProp,
  ...props
}) {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;
  
  const getDimension = () => {
    if (typeof size === 'number') return size;
    const sizes = { sm: 28, md: 36, lg: 48 };
    return sizes[size] || 36;
  };

  const dim = getDimension();
  const radius = dim / 2;
  const resolved = getButtonStyle(iconStyles, variant, isDark, '', 'transparent');

  const combinedStyle = [
    iconStyles.base,
    { width: dim, height: dim, borderRadius: radius },
    resolved.container,
    style,
  ];

  const defaultIconColor = isDark ? buttonColors.textDark : buttonColors.textLight;
  const renderedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon, { color: icon.props?.color || defaultIconColor })
    : icon;

  return (
    <Button
      variant="unstyled"
      animated={animated}
      style={combinedStyle}
      onPress={onPress}
      activeOpacity={activeOpacity}
      isDark={isDark}
      {...props}
    >
      {renderedIcon}
    </Button>
  );
}

const iconStyles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  solidLight:       { backgroundColor: buttonColors.textLight },
  solidDark:        { backgroundColor: buttonColors.textDark },
  glassLight:       { backgroundColor: buttonColors.glassLightBg },
  glassDark:        { backgroundColor: buttonColors.glassDarkBg },
  outlineLight:     { backgroundColor: buttonColors.surfaceLight, borderWidth: 1, borderColor: buttonColors.borderLight },
  outlineDark:      { backgroundColor: buttonColors.surfaceDark,  borderWidth: 1, borderColor: buttonColors.borderDark },
  transparentLight: { backgroundColor: 'transparent' },
  transparentDark:  { backgroundColor: 'transparent' },
});
