import { typography } from './typography.js';

export const layout = {
  maxContentWidth: 1330,
  breakpoints: {
    sm: 640,
    mobile: 768,
    desktop: 1024,
  },
  radii: {
    none: 0,
    xxxs: 2,
    xs: 6,
    sm: 8,
    iconBtn: 14,
    md: 16,
    lg: 20,
    xl: 24,
    full: 50,
  },
  elevation: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 16,
  },
  zIndices: {
    base: 1,
    raised: 10,
    active: 20,
    dropdown: 100,
    sticky: 200,
    header: 500,
    drawer: 1000,
    modal: 2000,
    toast: 3000,
    tooltip: 4000,
  },
  borderWidth: {
    none: 0,
    thin: 1,
    focus: 1.5,
    thick: 2,
    medium: 3,
    heavy: 4,
    xheavy: 10,
    xxheavy: 16,
  },
  spacing: {
    none: 0,
    xxxs: 2,
    xxs: 4,
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  opacity: {
    faint: 0.2,
    disabled: 0.5,
    muted: 0.6,
    subtle: 0.7,
    pressed: 0.8,
    full: 1,
  },
  cardHeights: {
    categoryGrid: { desktop: 280, tablet: 250, mobile: 200 },
    categoryBanner: { desktop: 180, tablet: 160, mobile: 140 },
    heroRightMobile: 220,
    heroRightWide: 360,
  },
};

export const badgeTokens = {
  fontSizes: {
    sm: typography.sizes.xxs,
    small: typography.sizes.xxs,
    md: 11,
    medium: 11,
    lg: typography.sizes.xs,
    large: typography.sizes.xs,
    counter: typography.sizes.xxs,
  },
};

export const buttonTokens = {
  sizes: {
    sm: { height: 32, paddingHorizontal: 12, borderRadius: layout.radii.xs, borderRadiusPill: 16, fontSize: 12 },
    md: { height: 40, paddingHorizontal: 16, borderRadius: layout.radii.sm, borderRadiusPill: 20, fontSize: 13 },
    lg: { height: 48, paddingHorizontal: 24, borderRadius: layout.radii.md, borderRadiusPill: 24, fontSize: 14 },
  },
};

export const iconTokens = {
  sizes: {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  },
  strokeWidth: {
    default: 2,
    bold: 2.5,
    tagDot: 3,
  },
  viewBox: '0 0 24 24',
  fillNone: 'none',
};

export const motion = {
  press: {
    duration: 90,
    friction: 4,
    tension: 40,
    scale: 0.97,
    activeOpacity: 0.8,
  },
  drawer: {
    slideDuration: 250,
    durationIn: 250,
    durationOut: 220,
    friction: 7,
    tension: 40,
  },
};
