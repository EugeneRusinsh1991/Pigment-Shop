import React from 'react';
import { Text as RNText } from 'react-native';
import { useTextTheme } from './useTextTheme';

const FONT_OVERRIDE_KEYS = ['fontSize', 'lineHeight', 'fontWeight', 'fontFamily'];

function warnFontOverrides(style, children) {
  if (!style) return;
  const flattened = Array.isArray(style)
    ? Object.assign({}, ...style.flat().filter(Boolean))
    : style;
  const keys = Object.keys(flattened).filter((k) => FONT_OVERRIDE_KEYS.includes(k));
  if (keys.length > 0) {
    const textSnippet = typeof children === 'string' || typeof children === 'number' ? `"${children}"` : (Array.isArray(children) ? children.filter(c => typeof c === 'string' || typeof c === 'number').join(' ') : 'complex element');
    const msg = `[Typography Warning] Custom font override(s) [${keys.join(', ')}] passed to Text via style prop. Text content: ${textSnippet}. Overriding style: ${JSON.stringify(flattened)}`;
    console.warn(msg);
    if (typeof window !== 'undefined') {
      window.__TYPOGRAPHY_WARNINGS__ = window.__TYPOGRAPHY_WARNINGS__ || [];
      const item = { time: new Date().toISOString(), textSnippet, keys, style: flattened, stack: new Error().stack };
      window.__TYPOGRAPHY_WARNINGS__.push(item);
      try {
        const stored = JSON.parse(localStorage.getItem('typography_warnings') || '[]');
        const isDup = stored.some((s) => s.textSnippet === textSnippet && JSON.stringify(s.keys) === JSON.stringify(keys) && JSON.stringify(s.style) === JSON.stringify(flattened));
        if (!isDup) {
          stored.push(item);
          localStorage.setItem('typography_warnings', JSON.stringify(stored));
        }
      } catch (e) {}
    }
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

  warnFontOverrides(style, children);

  return (
    <RNText style={[textStyle, style]} {...rest}>
      {children}
    </RNText>
  );
}

export default Text;

