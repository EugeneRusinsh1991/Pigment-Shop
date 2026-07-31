import * as React from 'react';
import { Platform, Text as RNText } from 'react-native';
import { getIconTextStyle } from '../../theme/iconStyles';
import { colors } from '../../theme/tokens';
import { CurrencyIcon } from './AppIcons';

const getThemeColor = (color) => color || colors.textLight;

const styles = {
  svg: (style) => {
    const base = { display: 'inline-block', verticalAlign: 'middle' };
    if (!style) return base;
    if (Array.isArray(style)) {
      return Object.assign({}, base, ...style.filter(Boolean));
    }
    return typeof style === 'object' ? { ...base, ...style } : base;
  },
  text: (color, size, style) => getIconTextStyle(getThemeColor(color), size, style),
};

export const AdminIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={styles.svg(style)} {...props}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.5 1z" />
      </svg>
    );
  }
  return <RNText style={styles.text(color, size, style)} {...props}>⚙</RNText>;
};

export const BoxIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.svg(style)} {...props}>
        <polyline points="21 8 21 21 3 21 3 8" />
        <rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </svg>
    );
  }
  return <RNText style={styles.text(color, size, style)} {...props}>📦</RNText>;
};

export const ImageIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.svg(style)} {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    );
  }
  return <RNText style={styles.text(color, size, style)} {...props}>🖼️</RNText>;
};

export const ClipboardIcon = ({ color, size = 20, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.svg(style)} {...props}>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      </svg>
    );
  }
  return <RNText style={styles.text(color, size, style)} {...props}>📋</RNText>;
};

export const LogoutIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.svg(style)} {...props}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    );
  }
  return <RNText style={styles.text(color, size, style)} {...props}>🚪</RNText>;
};

export const LoginIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.svg(style)} {...props}>
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
      </svg>
    );
  }
  return <RNText style={styles.text(color, size, style)} {...props}>🚪</RNText>;
};

export const LockIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.svg(style)} {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }
  return <RNText style={styles.text(color, size, style)} {...props}>🔒</RNText>;
};

export const DollarIcon = ({ color, size = 16, style, ...props }) => {
  return <CurrencyIcon color={color} size={size} style={[style]} {...props} />;
};

export const TrendIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.svg(style)} {...props}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    );
  }
  return <RNText style={styles.text(color, size, style)} {...props}>📈</RNText>;
};
