import React from 'react';
import { Text as RNText, Platform } from 'react-native';
import { colors } from '../../theme/tokens';

const getThemeColor = (color) => color || colors.textLight;

const ThemeSunIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    );
  }
  return <RNText style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>☀️</RNText>;
};

const ThemeMoonIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  }
  return <RNText style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>🌙</RNText>;
};

export const ThemeIcon = ({ isDark, color, size = 18, style, ...props }) => {
  if (isDark) {
    return <ThemeSunIcon color={color} size={size} style={style} {...props} />;
  } else {
    return <ThemeMoonIcon color={color} size={size} style={style} {...props} />;
  }
};

export const GlobeIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }
  return <RNText style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>🌐</RNText>;
};

export const BagIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    );
  }
  return <RNText style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>👜</RNText>;
};

export const UserIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  }
  return <RNText style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>👤</RNText>;
};

export const CartIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    );
  }
  return <RNText style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>🛒</RNText>;
};

export const HeartIcon = ({ filled, color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? getThemeColor(color) : 'none'} stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    );
  }
  return <RNText style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>{filled ? '❤️' : '♡'}</RNText>;
};

export const MailIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );
  }
  return <RNText style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>✉</RNText>;
};

export const TagIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="3" />
      </svg>
    );
  }
  return <RNText style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>🏷️</RNText>;
};

export const SearchIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    );
  }
  return <RNText style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>🔍</RNText>;
};

export const HomeIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }
  return <RNText style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>🏠</RNText>;
};
export const GridIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  }
  return <RNText style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>🗂️</RNText>;
};

export const CurrencyIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  }
  return <RNText style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>$</RNText>;
};
