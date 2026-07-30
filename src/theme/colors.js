// Tier 1: Base Primitives (Primitive Layer)
export const primitives = {
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#15803D',
    900: '#166534',
  },
  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
};

// Tier 2: Semantic Design Tokens (Semantic Layer)
export const semantic = {
  color: {
    background: {
      light: '#FFFFFF',
      dark: '#0D0D0D',
    },
    surface: {
      light: {
        default: '#FFFFFF',
        subtle: primitives.slate[100],
        elevated: primitives.slate[50],
      },
      dark: {
        default: '#1C1C1C',
        subtle: primitives.slate[900],
        elevated: '#1E1E1E',
      },
    },
    border: {
      light: {
        default: primitives.slate[200],
        subtle: primitives.slate[100],
        strong: primitives.slate[300],
      },
      dark: {
        default: primitives.slate[700],
        subtle: primitives.slate[800],
        strong: primitives.slate[600],
      },
    },
    text: {
      light: {
        primary: primitives.slate[900],
        secondary: primitives.slate[700],
        muted: primitives.slate[500],
      },
      dark: {
        primary: '#FFFFFF',
        secondary: primitives.slate[300],
        muted: primitives.slate[400],
      },
    },
    status: {
      success: {
        subtleBg: primitives.green[50],
        border: primitives.green[200],
        text: primitives.green[700],
        solidBg: primitives.green[500],
      },
      danger: {
        subtleBg: primitives.red[50],
        border: primitives.red[200],
        text: primitives.red[700],
        solidBg: primitives.red[500],
      },
      warning: {
        subtleBg: primitives.amber[50],
        border: primitives.amber[200],
        text: primitives.amber[700],
        solidBg: primitives.amber[500],
      },
      info: {
        subtleBg: primitives.blue[50],
        border: primitives.blue[200],
        text: primitives.blue[700],
        solidBg: primitives.blue[500],
      },
    },
  },
};

// Tier 3: Component Token Mapping (Component Layer)
export const component = {
  button: {
    secondary: {
      lightBg: primitives.slate[100],
      lightBorder: primitives.slate[200],
      lightText: primitives.slate[700],
      darkBg: primitives.slate[800],
      darkBorder: primitives.slate[700],
      darkText: primitives.slate[400],
    },
  },
  card: {
    bgLight: semantic.color.surface.light.default,
    bgDark: semantic.color.surface.dark.default,
  },
};

export const colors = {
  // Brand & Accent
  accent: '#E31B23',
  accentBlue: '#3B82F6',

  // Backgrounds
  backgroundLight: '#FFFFFF',
  backgroundDark: '#0D0D0D',

  // Surfaces & Cards
  surfaceLight: '#FFFFFF',
  surfaceDark: '#1C1C1C',
  productCardLight: '#FDF6F6',
  productCardDark: '#1E1E1E',

  // Neutral / Shell Surfaces
  surfaceNeutralLight: semantic.color.surface.light.subtle,
  surfaceNeutralDark: semantic.color.surface.dark.subtle,
  surfaceSubtleLight: semantic.color.surface.light.subtle,
  surfaceSubtleDark: semantic.color.surface.dark.subtle,
  surfaceElevatedLight: semantic.color.surface.light.elevated,
  surfaceElevatedDark: semantic.color.surface.dark.elevated,

  // Borders
  borderLight: semantic.color.border.light.default,
  borderDark: semantic.color.border.dark.default,
  borderLightAlt: semantic.color.border.light.subtle,
  borderDarkAlt: semantic.color.border.dark.subtle,
  borderSlateLight: semantic.color.border.light.subtle,
  borderSlateDark: semantic.color.border.dark.default,

  // Text
  textLight: primitives.slate[900],
  textDark: '#FFFFFF',
  textMutedLight: primitives.slate[500],
  textMutedDark: primitives.slate[400],
  textDescLight: primitives.slate[600],
  textDescDark: primitives.slate[400],
  textSubtleLight: primitives.slate[400],
  textSubtleDark: primitives.slate[500],
  textStrongLight: primitives.slate[900],
  textStrongDark: primitives.slate[900],
  textDimLight: primitives.slate[600],
  textDimDark: primitives.slate[800],

  // Translucent / Overlays
  overlayLight: 'rgba(255, 255, 255, 0.8)',
  overlayDark: 'rgba(28, 28, 28, 0.7)',
  glassLightBg: 'rgba(255, 255, 255, 0.8)',
  glassDarkBg: 'rgba(28, 28, 28, 0.7)',
  overlayScrim: 'rgba(0, 0, 0, 0.45)',
  accentOverlayDark: 'rgba(227, 27, 35, 0.12)',
  accentOverlayLight: 'rgba(227, 27, 35, 0.05)',
  surfaceFaintDark: 'rgba(255, 255, 255, 0.03)',
  surfaceFaintLight: 'rgba(15, 23, 42, 0.03)',

  // Standard UI States
  danger: primitives.red[500],
  success: primitives.green[500],
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  dark: '#1C1C1C',

  // Secondary Button / Component Styles
  secondaryLightBg: primitives.slate[100],
  secondaryLightBorder: primitives.slate[200],
  secondaryLightText: primitives.slate[700],
  secondaryDarkBg: primitives.slate[800],
  secondaryDarkBorder: primitives.slate[700],
  secondaryDarkText: primitives.slate[400],

  // Outline/Borders (Button Specific)
  outlineLightBorder: primitives.slate[300],
  outlineDarkBorder: primitives.slate[800],

  // Soft Danger & Status
  dangerSoftLightBg: semantic.color.status.danger.subtleBg,
  dangerSoftLightBorder: semantic.color.status.danger.border,
  dangerSoftLightText: semantic.color.status.danger.text,
  dangerSoftDarkBg: 'rgba(239, 68, 68, 0.15)',
  dangerSoftDarkBorder: 'rgba(239, 68, 68, 0.3)',
  dangerSoftDarkBgAlt: 'rgba(239, 68, 68, 0.2)',
  dangerSoftDarkBorderAlt: 'rgba(239, 68, 68, 0.4)',
  warningSoftDarkBg: 'rgba(245, 158, 11, 0.2)',
  warningSoftDarkBorder: 'rgba(245, 158, 11, 0.4)',
  infoSoftDarkBg: 'rgba(59, 130, 246, 0.2)',
  infoSoftDarkBorder: 'rgba(59, 130, 246, 0.4)',
  successSoftDarkBg: 'rgba(16, 185, 129, 0.2)',
  successSoftDarkBgFaint: 'rgba(52, 211, 153, 0.1)',
  successSoftDarkBgMid: 'rgba(52, 211, 153, 0.16)',
  successSoftDarkBorder: 'rgba(16, 185, 129, 0.4)',
  purpleSoftDarkBg: 'rgba(139, 92, 246, 0.2)',
  purpleSoftDarkBorder: 'rgba(139, 92, 246, 0.4)',
  blueSoftDarkBg: 'rgba(37, 99, 235, 0.2)',
  blueSoftDarkBorder: 'rgba(37, 99, 235, 0.4)',

  // Consolidated Danger Scale
  dangerLight: primitives.red[400],
  dangerMid: primitives.red[600],
  dangerStrong: primitives.red[700],
  dangerDeep: primitives.red[900],
  dangerBgLight: primitives.red[100],
  dangerBgAlt: primitives.red[50],
  dangerDarkShellBg: '#1F1315',
  dangerDarkShellBorder: '#451A20',

  // Consolidated Success Scale
  successLight: primitives.green[400],
  successMid: primitives.green[500],
  successDark: primitives.green[600],
  successStrong: primitives.green[700],
  successDeep: primitives.green[800],
  successDeeper: primitives.green[900],
  successBgLight: primitives.green[50],
  successBgMid: primitives.green[100],
  successBgAlt: primitives.green[100],
  successBgSoft: primitives.green[50],
  successBgFaint: primitives.green[200],
  successBgTeal: primitives.green[50],
  successBgGreen: primitives.green[50],

  // Consolidated Warning / Amber Scale
  warningLight: primitives.amber[300],
  warningMid: primitives.amber[400],
  warningStrong: primitives.amber[500],
  warningDark: primitives.amber[600],
  warningDeep: primitives.amber[800],
  warningDeeper: primitives.amber[900],
  warningDarkAlt: primitives.amber[900],
  warningBgLight: primitives.amber[100],
  warningBgMid: primitives.amber[100],
  warningBgStrong: primitives.amber[50],
  warningBgLegacy: primitives.amber[100],

  // Consolidated Info / Blue Scale
  infoBgLight: primitives.blue[50],
  infoBgMid: primitives.blue[100],
  infoBgAlt: primitives.blue[50],
  infoLight: primitives.blue[400],
  infoMid: primitives.blue[400],
  infoStrong: primitives.blue[500],
  infoDeep: primitives.blue[600],

  // Purple / Violet Scale
  purpleBgLight: '#F5F3FF',
  purpleBgAlt: '#F8F7FF',
  purpleLight: '#8B5CF6',
  purpleMid: '#7c3aed',
  purpleDeep: '#6D28D9',
  purpleStrong: '#4f46e5',

  // Social Brand Colors
  telegramBlue: '#24A1DE',
  googleRed: '#DB4437',
  instagramPink: '#E1306C',

  // Accent Pink
  accentPink: '#EC4899',
  accentPinkLight: '#E87A8E',

  // Warm Neutral Scale
  warmNeutralLight: '#F5F1EE',
  warmNeutralMid: '#F3ECE7',
  warmNeutralBorder: '#D0C9C0',
  warmNeutralSoft: '#e5d8d3',
  warmNeutralFaint: '#f3e1db',

  // Slate Scale
  slateLight: primitives.slate[50],
  slateMid: primitives.slate[100],
  slateStrong: primitives.slate[300],
  slateText: primitives.slate[500],

  // Admin / Dark Nav Surfaces
  navSurfaceDark: '#161616',
  navBorderDark: '#242424',
  navItemHoverDark: '#e8edf5',
  navItemHoverLight: '#f1f5f9',
  navTextDark: primitives.slate[900],

  // Chip Component Styles
  chipLightInactiveBorder: primitives.slate[200],
  chipLightInactiveText: primitives.slate[600],
  chipDarkInactiveBg: primitives.slate[800],
  chipDarkInactiveBorder: primitives.slate[700],
  chipDarkInactiveText: primitives.slate[400],

  // Input / Form Surfaces
  inputBgLight: primitives.slate[50],
  inputBgDark: primitives.slate[800],
  inputBorderLight: primitives.slate[200],
  inputBorderDark: primitives.slate[700],

  // Legacy Neutral Scale (Deprecated aliases mapped to semantic layer)
  neutralLightFaint: primitives.slate[100],
  neutralLightMid: primitives.slate[200],
  neutralLightStrong: primitives.slate[200],
  neutralLightMax: primitives.slate[100],
  neutralDarkFaint: primitives.slate[800],
  neutralDarkMid: primitives.slate[700],
  neutralDarkStrong: primitives.slate[600],
};
