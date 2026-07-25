import React from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';
import { colors, layout, shadows } from '../theme/tokens';

export default function CardShadow({ hoverAnim, isDark, lightBgColor = colors.productCardLight, style }) {
  const shadowStyle = {
    ...StyleSheet.absoluteFillObject,
    borderRadius: layout.radii.lg,
    backgroundColor: isDark ? colors.productCardDark : lightBgColor,
    ...Platform.select({
      web: shadows.cardHover.web,
      default: shadows.cardHover.native,
    }),
    elevation: layout.elevation.md,
    opacity: hoverAnim,
  };

  return <Animated.View style={[shadowStyle, style]} />;
}
