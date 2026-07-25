import React from 'react';
import { ActivityIndicator, Animated, Platform, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useButtonProps, DEFAULT_ACTIVE_OPACITY, calculateHitSlop } from '../../theme/buttonCommon';
import { colors, buttonTokens, motion } from '../../theme/tokens';
import styles from './ButtonStyles';
import { useButtonTheme } from './useButtonTheme';
import { useButtonAnimation } from './useButtonAnimation';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function getDimensionsForSize(size) {
  const token = buttonTokens.sizes[size] || buttonTokens.sizes.md;
  return { width: 0, height: token.height };
}

export default function Button({
  title,
  onPress,
  onPressIn,
  onPressOut,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
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
  accessibilityRole,
  children,
  ...props
}) {
  const resolvedRole = accessibilityRole !== undefined
    ? accessibilityRole
    : (variant === 'unstyled' ? 'none' : 'button');
  const { isDark, container: resolvedContainer, text: resolvedText } = useButtonTheme({
    isDarkProp,
    variant,
    fallbackVariant: 'primary',
    styleMap: styles,
  });

  const { touchableProps } = useButtonProps({
    isDark,
    disabled,
    loading,
    activeOpacity,
    onPress,
    ...props
  });

  const { scaleAnim, opacityAnim, handlePressIn, handlePressOut, handlePress } = useButtonAnimation({
    animated, disabled, loading, activeOpacity, scaleTo, onPressIn, onPressOut, onPress,
  });

  const sizeStyle = styles[size] || styles.md;
  const containerStyle = variant === 'unstyled' ? [fullWidth && styles.fullWidth, style] : [
    styles.base,
    sizeStyle,
    resolvedContainer,
    fullWidth ? styles.fullWidth : null,
    disabled ? styles.disabled : null,
    style,
  ];

  const textSizeStyle = styles[`text_${size}`] || styles.text_md;
  const textCombinedStyle = variant === 'unstyled' ? [textStyle] : [
    styles.textBase,
    textSizeStyle,
    resolvedText,
    disabled ? styles.textDisabled : null,
    textStyle,
  ];

  const { height, width } = getDimensionsForSize(size);
  const computedHitSlop = hitSlop !== undefined ? hitSlop : calculateHitSlop(width, height);

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

  if (!animated || Platform.OS === 'web') {
    return (
      <TouchableOpacity
        {...touchableProps}
        style={containerStyle}
        hitSlop={computedHitSlop}
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled || loading}
        accessibilityRole={resolvedRole}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <AnimatedPressable
      {...touchableProps}
      style={[
        containerStyle,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
      accessibilityRole={resolvedRole}
      disabled={disabled || loading}
      hitSlop={computedHitSlop}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {content}
    </AnimatedPressable>
  );
}

export function AnimatedButton(props) {
  return <Button variant="unstyled" accessibilityRole="none" {...props} />;
}
