import React from 'react';
import { Text as RNText } from 'react-native';
import { useTextTheme } from './useTextTheme';

const FONT_OVERRIDE_KEYS = ['fontSize', 'lineHeight', 'fontWeight', 'fontFamily'];

function warnFontOverrides(style) {
  if (!style) return;
  const flattened = Array.isArray(style)
    ? Object.assign({}, ...style.flat().filter(Boolean))
    : style;
  const keys = Object.keys(flattened).filter((k) => FONT_OVERRIDE_KEYS.includes(k));
  if (keys.length > 0) {
    console.warn(
      `[Typography Warning] Custom font override(s) [${keys.join(', ')}] passed to Text via style prop. Use variant or primitive props instead.`
    );
  }
}

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

  if (__DEV__) warnFontOverrides(style);

  return (
    <RNText style={[textStyle, style]} {...rest}>
      {children}
    </RNText>
  );
}

export default Text;

