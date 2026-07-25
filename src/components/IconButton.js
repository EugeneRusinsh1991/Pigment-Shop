import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getButtonStyle } from '../theme/buttonCommon';
import { colors } from '../theme/tokens';
import Button from './Button';

export default function IconButton({
  icon,
  onPress,
  size = 'md', // 'sm' (28) | 'md' (36) | 'lg' (48)
  variant = 'transparent', // 'solid' | 'glass' | 'outline' | 'transparent'
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

  const resolved = getButtonStyle(styles, variant, isDark, '', 'transparent');

  const combinedStyle = [
    styles.base,
    { width: dim, height: dim, borderRadius: radius },
    resolved.container,
    style,
  ];

  const defaultIconColor = isDark ? colors.textDark : colors.textLight;
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

function createIconButtonStyles() {
  const variants = {
    solidLight:       { backgroundColor: colors.textLight },
    solidDark:        { backgroundColor: colors.textDark },
    glassLight:       { backgroundColor: colors.overlayLight },
    glassDark:        { backgroundColor: colors.overlayDark },
    outlineLight:     { backgroundColor: colors.surfaceLight, borderWidth: 1, borderColor: colors.borderLight },
    outlineDark:      { backgroundColor: colors.surfaceDark,  borderWidth: 1, borderColor: colors.borderDark },
    transparentLight: { backgroundColor: 'transparent' },
    transparentDark:  { backgroundColor: 'transparent' },
  };

  return StyleSheet.create({
    base: { alignItems: 'center', justifyContent: 'center' },
    ...variants,
  });
}

const styles = createIconButtonStyles();
