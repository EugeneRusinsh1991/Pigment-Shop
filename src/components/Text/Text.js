import { Text as RNText } from 'react-native';
import { useTextTheme } from './useTextTheme';

const FONT_OVERRIDE_KEYS = ['fontSize', 'lineHeight', 'fontWeight', 'fontFamily'];

function flattenStyle(style) {
  if (!style) return null;
  return Array.isArray(style)
    ? Object.assign({}, ...style.flat().filter(Boolean))
    : style;
}

function getTextSnippet(children) {
  if (typeof children === 'string' || typeof children === 'number') {
    return `"${children}"`;
  }

  if (Array.isArray(children)) {
    return children.filter((c) => typeof c === 'string' || typeof c === 'number').join(' ');
  }

  return 'complex element';
}

function collectWarningKeys(flattenedStyle) {
  return Object.keys(flattenedStyle).filter((key) => FONT_OVERRIDE_KEYS.includes(key));
}

function persistTypographyWarning(item, flattenedStyle, keys, textSnippet) {
  if (typeof window === 'undefined') return;

  window.__TYPOGRAPHY_WARNINGS__ = window.__TYPOGRAPHY_WARNINGS__ || [];
  window.__TYPOGRAPHY_WARNINGS__.push(item);

  try {
    const stored = JSON.parse(localStorage.getItem('typography_warnings') || '[]');
    const isDup = stored.some((entry) => entry.textSnippet === textSnippet && JSON.stringify(entry.keys) === JSON.stringify(keys) && JSON.stringify(entry.style) === JSON.stringify(flattenedStyle));
    if (!isDup) {
      stored.push(item);
      localStorage.setItem('typography_warnings', JSON.stringify(stored));
    }
  } catch (e) {}
}

function warnFontOverrides(style, children) {
  const flattenedStyle = flattenStyle(style);
  if (!flattenedStyle) return;

  const keys = collectWarningKeys(flattenedStyle);
  if (keys.length === 0) return;

  const textSnippet = getTextSnippet(children);
  const msg = `[Typography Warning] Custom font override(s) [${keys.join(', ')}] passed to Text via style prop. Text content: ${textSnippet}. Overriding style: ${JSON.stringify(flattenedStyle)}`;
  console.warn(msg);

  const item = {
    time: new Date().toISOString(),
    textSnippet,
    keys,
    style: flattenedStyle,
    stack: new Error().stack,
  };

  persistTypographyWarning(item, flattenedStyle, keys, textSnippet);
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

