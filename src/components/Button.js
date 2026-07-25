import React, { useRef } from 'react';
import { ActivityIndicator, Animated, Platform, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useButtonProps, getButtonStyle, DEFAULT_ACTIVE_OPACITY, calculateHitSlop, buttonColors } from '../theme/buttonCommon';
import { colors, motion } from '../theme/tokens';
import styles from './ButtonStyles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function getContainerStyle(variant, size, disabled, isDark, style) {
  if (variant === 'unstyled') return [style];
  const resolved = getButtonStyle(styles, variant, isDark, '', 'primary');
  const sizeStyle = styles[size] || styles.md;
  return [
    styles.base,
    sizeStyle,
    resolved.container,
    disabled ? styles.disabled : null,
    style,
  ];
}

function getTextStyle(variant, size, disabled, isDark, textStyle) {
  if (variant === 'unstyled') return [textStyle];
  const resolved = getButtonStyle(styles, variant, isDark, '', 'primary');
  const textSizeStyle = styles[`text_${size}`] || styles.text_md;
  return [
    styles.textBase,
    textSizeStyle,
    resolved.text,
    disabled ? styles.textDisabled : null,
    textStyle,
  ];
}

function getDimensionsForSize(size) {
  if (size === 'sm') return { width: 0, height: 32 };
  if (size === 'md') return { width: 0, height: 40 };
  if (size === 'lg') return { width: 0, height: 48 };
  return { width: 0, height: 40 };
}

export default function Button({
  title,
  onPress,
  onPressIn,
  onPressOut,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  animated = true,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  activeOpacity = DEFAULT_ACTIVE_OPACITY,
  scaleTo = motion.press.scale,
  isDark: isDarkProp,
  hitSlop,
  accessibilityRole = 'button',
  children,
  ...props
}) {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;
  const { touchableProps } = useButtonProps({
    isDark,
    disabled,
    loading,
    activeOpacity,
    onPress,
    ...props
  });

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const containerStyle = getContainerStyle(variant, size, disabled, isDark, style);
  const textCombinedStyle = getTextStyle(variant, size, disabled, isDark, textStyle);

  const flatStyle = StyleSheet.flatten(containerStyle) || {};
  const height = flatStyle.height || getDimensionsForSize(size).height;
  const width = flatStyle.width || 0;
  
  const computedHitSlop = hitSlop !== undefined ? hitSlop : calculateHitSlop(width, height);

  const handlePressIn = (e) => {
    if (!disabled && !loading) {
      Animated.timing(opacityAnim, {
        toValue: activeOpacity,
        duration: 50,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }
    if (onPressIn) onPressIn(e);
  };

  const handlePressOut = (e) => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
    if (onPressOut) onPressOut(e);
  };

  const handlePress = (e) => {
    if (disabled || loading) return;
    e?.stopPropagation?.();

    if (animated) {
      scaleAnim.setValue(1);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: scaleTo,
          duration: motion.press.duration,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: motion.press.friction,
          tension: motion.press.tension,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    }

    if (onPress) onPress(e);
  };

  const content = typeof children === 'function' ? children({ pressed: false }) : children ? children : (
    <>
      {leftIcon}
      {loading ? (
        <ActivityIndicator size="small" color={StyleSheet.flatten(textCombinedStyle).color || colors.white} />
      ) : title ? (
        <Text style={textCombinedStyle}>{title}</Text>
      ) : null}
      {rightIcon}
    </>
  );

  if (!animated) {
    return (
      <TouchableOpacity
        style={containerStyle}
        hitSlop={computedHitSlop}
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled || loading}
        accessibilityRole={accessibilityRole}
        {...touchableProps}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <AnimatedPressable
      style={[
        containerStyle,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
      accessibilityRole={accessibilityRole}
      disabled={disabled || loading}
      hitSlop={computedHitSlop}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...touchableProps}
    >
      {typeof children === 'function' ? children : content}
    </AnimatedPressable>
  );
}

// ==========================================
// Centralized Wrapper Primitives
// ==========================================

export function AnimatedButton(props) {
  return <Button variant="unstyled" {...props} />;
}

// --- ChipButton ---

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

// --- IconButton ---

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
