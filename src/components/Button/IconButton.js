import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';
import { buttonColors } from '../../theme/buttonCommon';
import { buttonTokens } from '../../theme/tokens';
import { useButtonTheme } from './useButtonTheme';

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
  const { isDark, container: resolvedContainer } = useButtonTheme({
    isDarkProp,
    variant,
    fallbackVariant: 'transparent',
    styleMap: iconStyles,
  });

  const getDimension = () => {
    if (typeof size === 'number') return size;
    const sizes = {
      sm: buttonTokens.sizes.sm.height,
      md: buttonTokens.sizes.md.height,
      lg: buttonTokens.sizes.lg.height,
    };
    return sizes[size] || buttonTokens.sizes.md.height;
  };

  const dim = getDimension();
  const radius = dim / 2;

  const defaultIconColor = isDark ? buttonColors.textDark : buttonColors.textLight;
  const renderedIcon = React.isValidElement(icon) && icon.type !== React.Fragment
    ? React.cloneElement(icon, { color: icon.props?.color || defaultIconColor })
    : icon;

  return (
    <Button
      variant="unstyled"
      animated={animated}
      size={dim}
      style={[iconStyles.base, { width: dim, height: dim, borderRadius: radius }, resolvedContainer, style]}
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
