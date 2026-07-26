import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { layout } from '../../../theme/tokens';
import { useSkeletonTheme } from './useSkeletonTheme';

function SkeletonItem({ width = '100%', height = 20, borderRadius = layout.radii.sm, style }) {
  const { backgroundColor, styles } = useSkeletonTheme();
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

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
          opacity,
        },
        style,
      ]}
    />
  );
}

export default function SkeletonLoader({ count = 3, width, height, borderRadius, style, containerStyle }) {
  const { styles } = useSkeletonTheme();
  
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
