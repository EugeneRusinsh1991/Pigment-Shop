import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';
import { buttonTokens, colors } from '../../theme/tokens';
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

  const defaultIconColor = isDark ? colors.textDark : colors.textLight;
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
  solidLight:       { backgroundColor: colors.textLight },
  solidDark:        { backgroundColor: colors.textDark },
  glassLight:       { backgroundColor: colors.glassLightBg },
  glassDark:        { backgroundColor: colors.glassDarkBg },
  outlineLight:     { backgroundColor: colors.surfaceLight, borderWidth: 1, borderColor: colors.borderLight },
  outlineDark:      { backgroundColor: colors.surfaceDark,  borderWidth: 1, borderColor: colors.borderDark },
  transparentLight: { backgroundColor: 'transparent' },
  transparentDark:  { backgroundColor: 'transparent' },
});
