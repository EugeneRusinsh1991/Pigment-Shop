import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useButtonProps, getButtonStyle } from '../theme/buttonCommon';
import { colors } from '../theme/tokens';
import styles from './ButtonStyles';

import AnimatedButton from './AnimatedButton';

function getContainerStyle(variant, size, disabled, isDark, style) {
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

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  animated = true,
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
  const { touchableProps } = useButtonProps({
    isDark,
    disabled,
    loading,
    activeOpacity,
    onPress,
    ...props
  });

  const containerStyle = getContainerStyle(variant, size, disabled, isDark, style);
  const textCombinedStyle = getTextStyle(variant, size, disabled, isDark, textStyle);

  const Component = animated ? AnimatedButton : TouchableOpacity;
  const hitSlop = size === 'sm' ? { top: 6, bottom: 6, left: 4, right: 4 } : size === 'md' ? { top: 2, bottom: 2, left: 0, right: 0 } : undefined;

  if (loading) {
    const spinnerColor = StyleSheet.flatten(textCombinedStyle).color || colors.white;
    return (
      <Component style={containerStyle} hitSlop={hitSlop} {...touchableProps}>
        <ActivityIndicator size="small" color={spinnerColor} />
      </Component>
    );
  }

  return (
    <Component style={containerStyle} hitSlop={hitSlop} {...touchableProps}>
      {leftIcon}
      {title ? <Text style={textCombinedStyle}>{title}</Text> : null}
      {rightIcon}
    </Component>
  );
}
