import React from 'react';
import ScrollFadeUp from './ScrollFadeUp';
import { colors } from '../theme/tokens';

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

  const baseStyle = {
    borderRadius,
    borderWidth: 1,
    borderColor: computedBorderColor,
    backgroundColor,
    overflow: 'visible',
  };

  if (padding === undefined) {
    return [baseStyle, style];
  }
  return [baseStyle, { padding }, style];
}

const StaticCard = React.forwardRef(({
  isDark,
  lightBgColor,
  darkBgColor,
  borderColor,
  borderRadius,
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
