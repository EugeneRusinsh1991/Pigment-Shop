import React from 'react';
import { StyleSheet, Text as RNText, Platform } from 'react-native';
import { colors } from '../../theme/tokens';

const styles = StyleSheet.create({
  svg: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});

const getThemeColor = (color) => color || colors.textLight;
const getSvgStyle = (style) => {
  const base = { display: 'inline-block', verticalAlign: 'middle' };
  if (!style) return base;
  if (Array.isArray(style)) {
    return Object.assign({}, base, ...style.filter(Boolean));
  }
  return typeof style === 'object' ? { ...base, ...style } : base;
};
const getTextStyle = (color, size, style) => [{ color: getThemeColor(color), fontSize: size }, style];

export const SparkleIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={getSvgStyle(style)} {...props}>
        <path d="M9 2h6v6H9z" />
        <path d="M6 8h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8z" />
        <path d="M12 2v6" />
      </svg>
    );
  }
  return <RNText style={[getTextStyle(color, size, style)]} {...props}>✨</RNText>;
};

export const LashIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={getSvgStyle(style)} {...props}>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
        <path d="m10 5-1.5-2" />
        <path d="m14 5 1.5-2" />
        <path d="m6 8-2-1.5" />
        <path d="m18 8 2-1.5" />
      </svg>
    );
  }
  return <RNText style={[getTextStyle(color, size, style)]} {...props}>👁️</RNText>;
};

export const BrowIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={getSvgStyle(style)} {...props}>
        <path d="m18 8-2-2-10 10v2h2L18 8Z" />
        <path d="M16 6c1.5-1.5 3-1.5 4-1s.5 2.5-1 4L16 6Z" />
        <path d="m11 11-2-2" />
      </svg>
    );
  }
  return <RNText style={[getTextStyle(color, size, style)]} {...props}>🖌️</RNText>;
};

export const LipIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={getSvgStyle(style)} {...props}>
        <path d="M4 14c2.5-2 5.5-2 8 0 2.5-2 5.5-2 8 0-1 3-4.5 5-8 5s-7-2-8-5Z" />
        <path d="M4 14c4 1 12 1 16 0" />
      </svg>
    );
  }
  return <RNText style={[getTextStyle(color, size, style)]} {...props}>👄</RNText>;
};

export const NeedleIcon = ({ color, size = 18, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={getThemeColor(color)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={getSvgStyle(style)} {...props}>
        <path d="m3 21 13-13" />
        <path d="m13 5 6 6" />
        <path d="M10 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2v-2" />
      </svg>
    );
  }
  return <RNText style={[getTextStyle(color, size, style)]} {...props}>📍</RNText>;
};
