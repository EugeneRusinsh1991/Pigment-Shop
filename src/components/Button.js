import React, { useRef } from 'react';
import { ActivityIndicator, Animated, Platform, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useButtonProps, getButtonStyle, DEFAULT_ACTIVE_OPACITY, calculateHitSlop } from '../theme/buttonCommon';
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
