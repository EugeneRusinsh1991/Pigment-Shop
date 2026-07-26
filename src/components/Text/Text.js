import React from 'react';
import { Text as RNText } from 'react-native';
import { useTextTheme } from './useTextTheme';

/**
 * Core Typography primitive component.
 */
export function Text({
  variant = 'body1',
  color = 'primary',
  align,
  weight,
  font,
  size,
  lineHeight,
  isDark: isDarkProp,
  style,
  children,
  ...rest
}) {
  const { textStyle } = useTextTheme({
    isDarkProp,
    variant,
    color,
    align,
    weight,
    font,
    size,
    lineHeight,
  });

  return (
    <RNText style={[textStyle, style]} {...rest}>
      {children}
    </RNText>
  );
}

export default Text;
