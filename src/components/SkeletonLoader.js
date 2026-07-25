import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { colors, layout } from '../theme/tokens';

/**
 * Global SkeletonLoader component for loading placeholders.
 */
export function SkeletonItem({ width = '100%', height = 20, borderRadius = layout.radii.sm, style }) {
  const { isDark } = useTheme();
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  const bg = isDark ? colors.surfaceSubtleDark : colors.neutralLightStrong;

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor: bg,
          opacity,
        },
        style,
      ]}
    />
  );
}

export default function SkeletonLoader({ count = 3, width, height, borderRadius, style, containerStyle }) {
  return (
    <View style={[styles.container, containerStyle]}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem
          key={index}
          width={width}
          height={height}
          borderRadius={borderRadius}
          style={style}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingVertical: 12,
  },
  skeleton: {
    overflow: 'hidden',
  },
});
