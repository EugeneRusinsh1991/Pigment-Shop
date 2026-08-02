import React from 'react';
import { ActivityIndicator, Animated, Platform, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { useButtonProps, DEFAULT_ACTIVE_OPACITY, calculateHitSlop } from '../../../theme/buttonCommon';
import { colors, buttonTokens, motion } from '../../../theme/tokens';
import styles from './ButtonStyles';
import { useButtonTheme } from './useButtonTheme';
import { useInteractionAnimation } from './useInteractionAnimation';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function getDimensionsForSize(size) {
  const token = buttonTokens.sizes[size] || buttonTokens.sizes.md;
  return { width: 0, height: token.height };
}

function buildContainerStyle(variant, size, resolvedContainer, fullWidth, disabled, style) {
  const sizeStyle = styles[size] || styles.md;
  if (variant === 'unstyled') return [fullWidth && styles.fullWidth, style];
  return [
    styles.base,
    sizeStyle,
    resolvedContainer,
    fullWidth ? styles.fullWidth : null,
    disabled ? styles.disabled : null,
    style,
  ];
}

function buildTextStyle(variant, size, resolvedText, disabled, textStyle) {
  const textSizeStyle = styles[`text_${size}`] || styles.text_md;
  if (variant === 'unstyled') return [textStyle];
  return [
    styles.textBase,
    textSizeStyle,
    resolvedText,
    disabled ? styles.textDisabled : null,
    textStyle,
  ];
}

function getButtonTextVariant(size) {
  if (size === 'sm' || size === 12 || size === 11 || size === 10) return 'label';
  return 'subtitle2';
}

function renderButtonContent(children, loading, title, leftIcon, rightIcon, textCombinedStyle, size) {
  if (typeof children === 'function') return children({ pressed: false });
  if (children) return children;
  const textVariant = getButtonTextVariant(size);
  return (
    <>
      {leftIcon}
      {loading
        ? <ActivityIndicator size="small" color={StyleSheet.flatten(textCombinedStyle).color || colors.white} />
        : title ? <Text style={textCombinedStyle} variant={textVariant} weight="semibold">{title}</Text> : null}
      {rightIcon}
    </>
  );
}

function renderNonAnimatedButton({ touchableProps, containerStyle, computedHitSlop, handlePress, onPressIn, onPressOut, disabled, loading, resolvedRole, content }) {
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

function renderAnimatedButton({ touchableProps, containerStyle, computedHitSlop, opacityAnim, scaleAnim, handlePress, handlePressIn, handlePressOut, disabled, loading, resolvedRole, content }) {
  return (
    <AnimatedPressable
      {...touchableProps}
      style={[containerStyle, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}
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

  const { scaleAnim, opacityAnim, handlePressIn, handlePressOut, handlePress } = useInteractionAnimation({
    size,
    fullWidth,
    disabled,
    loading,
    activeOpacity,
    customScaleTo: scaleTo !== motion.press.scale ? scaleTo : undefined,
    onPressIn,
    onPressOut,
    onPress,
  });

  const containerStyle = buildContainerStyle(variant, size, resolvedContainer, fullWidth, disabled, style);
  const textCombinedStyle = buildTextStyle(variant, size, resolvedText, disabled, textStyle);

  const { height, width } = getDimensionsForSize(size);
  const computedHitSlop = hitSlop !== undefined ? hitSlop : calculateHitSlop(width, height);

  const content = renderButtonContent(children, loading, title, leftIcon, rightIcon, textCombinedStyle, size);

  const sharedProps = { touchableProps, containerStyle, computedHitSlop, handlePress, disabled, loading, resolvedRole, content };

  if (!animated) {
    return renderNonAnimatedButton({ ...sharedProps, onPressIn, onPressOut });
  }

  return renderAnimatedButton({ ...sharedProps, opacityAnim, scaleAnim, handlePressIn, handlePressOut });
}

export function AnimatedButton(props) {
  return <Button variant="unstyled" accessibilityRole="none" accessibilityLabel={props.accessibilityLabel} {...props} />;
}
