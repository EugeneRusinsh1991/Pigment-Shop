import React from 'react';
import { Text, Platform } from 'react-native';
import { colors } from '../../theme/tokens';

const getThemeColor = (color) => color || colors.textLight;

export const CheckIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>✓</Text>;
};

export const CrossIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>✗</Text>;
};


export const BackArrowIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>←</Text>;
};

export const ForwardArrowIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>→</Text>;
};

export const ChevronLeftIcon = ({ color, size = 14, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <polyline points="15 18 9 12 15 6" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>◀</Text>;
};

export const ChevronRightIcon = ({ color, size = 14, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <polyline points="9 18 15 12 9 6" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>▶</Text>;
};

export const ChevronDownIcon = ({ color, size = 14, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <polyline points="6 9 12 15 18 9" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>▼</Text>;
};

export const EyeIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>👁️</Text>;
};

export const EyeOffIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>🙈</Text>;
};

export const RefreshIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>🔄</Text>;
};

export const UploadIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>📁</Text>;
};

export const AlertIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>⚠️</Text>;
};

export const EditIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>✏️</Text>;
};

export const TrashIcon = ({ color, size = 16, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} {...props}>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    );
  }
  return <Text style={{ color: getThemeColor(color), fontSize: size, ...style }} {...props}>🗑️</Text>;
};


