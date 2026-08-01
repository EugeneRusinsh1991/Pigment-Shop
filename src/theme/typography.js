import { Platform } from 'react-native';

const PRIMARY_FONT_FAMILY = 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const MONO_FONT_FAMILY = Platform.select({
  ios: 'Courier',
  android: 'monospace',
  web: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  default: 'monospace',
});

export const fonts = {
  primary: PRIMARY_FONT_FAMILY,
  sans: PRIMARY_FONT_FAMILY,
  serif: PRIMARY_FONT_FAMILY,
  mono: MONO_FONT_FAMILY,
};

export const typography = {
  sizes: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 28,
    display: 36,
    h1: 28,
    h2: 24,
    h3: 20,
    body1: 16,
    body2: 14,
    caption: 12,
    label: 12,
    code: 13,
  },
  lineHeights: {
    xxs: 14,
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 30,
    xxl: 34,
    display: 42,
    h1: 34,
    h2: 30,
    h3: 28,
    body1: 24,
    body2: 20,
    caption: 16,
    label: 16,
    code: 18,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    widest: 1,
  },
  fonts,
};

export const scale = {
  display: { fontSize: 36, lineHeight: 42, letterSpacing: -0.5, fontWeight: '700', fontFamily: fonts.primary },
  h1: { fontSize: 28, lineHeight: 34, letterSpacing: -0.5, fontWeight: '700', fontFamily: fonts.primary },
  h2: { fontSize: 24, lineHeight: 30, letterSpacing: -0.5, fontWeight: '700', fontFamily: fonts.primary },
  h3: { fontSize: 20, lineHeight: 28, letterSpacing: 0, fontWeight: '600', fontFamily: fonts.primary },
  body1: { fontSize: 16, lineHeight: 24, letterSpacing: 0, fontWeight: '400', fontFamily: fonts.primary },
  body2: { fontSize: 14, lineHeight: 20, letterSpacing: 0, fontWeight: '400', fontFamily: fonts.primary },
  caption: { fontSize: 12, lineHeight: 16, letterSpacing: 0.5, fontWeight: '400', fontFamily: fonts.primary },
  label: { fontSize: 12, lineHeight: 16, letterSpacing: 0.5, fontWeight: '500', fontFamily: fonts.primary },
  code: { fontSize: 13, lineHeight: 18, letterSpacing: 0.5, fontWeight: '600', fontFamily: fonts.mono },
};
