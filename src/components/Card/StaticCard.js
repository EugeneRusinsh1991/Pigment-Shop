import React from 'react';
import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';
import { ScrollFadeUp } from '../Motion';

function getStaticCardBorderColor(borderColor, isDark) {
  if (borderColor) return borderColor;
  return isDark ? colors.borderDark : colors.borderLight;
}

function getStaticCardBackgroundColor(isDark, lightBgColor, darkBgColor) {
  if (isDark) return darkBgColor || colors.surfaceDark;
  return lightBgColor || colors.surfaceLight;
}

function computeStaticCardStyle({ isDark, lightBgColor, darkBgColor, borderColor, borderRadius, padding, style }) {
  const computedBorderColor = getStaticCardBorderColor(borderColor, isDark);
  const backgroundColor = getStaticCardBackgroundColor(isDark, lightBgColor, darkBgColor);

  const dynamicStyle = {
    borderRadius,
    borderColor: computedBorderColor,
    backgroundColor,
  };

  if (padding === undefined) {
    return [staticStyles.card, dynamicStyle, style];
  }
  return [staticStyles.card, dynamicStyle, { padding }, style];
}

const staticStyles = StyleSheet.create({
  card: {
    borderWidth: layout.borderWidth.thin,
    overflow: 'visible',
  },
});

const StaticCard = React.forwardRef(({
  isDark,
  lightBgColor,
  darkBgColor,
  borderColor,
  borderRadius = layout.radii.lg,
  padding,
  children,
  style,
  ...rest
}, ref) => {
  const computedStyle = computeStaticCardStyle({
    isDark,
    lightBgColor,
    darkBgColor,
    borderColor,
    borderRadius,
    padding,
    style,
  });

  return (
    <ScrollFadeUp ref={ref} style={computedStyle} {...rest}>
      {children}
    </ScrollFadeUp>
  );
});

export default StaticCard;
