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
          style={[style]}
        />
      ))}
    </View>
  );
}

export function CatalogSkeleton({ count = 6, cols = 3 }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, padding: 16, width: '100%' }}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={{ width: `${Math.floor(100 / cols) - 3}%`, marginBottom: 16 }}>
          <SkeletonItem height={160} borderRadius={layout.radii.md} style={{ marginBottom: 8 }} />
          <SkeletonItem height={18} width="80%" style={{ marginBottom: 6 }} />
          <SkeletonItem height={14} width="40%" />
        </View>
      ))}
    </View>
  );
}

export function ProductDetailSkeleton() {
  return (
    <View style={{ flexDirection: 'row', gap: 24, padding: 24, flexWrap: 'wrap', width: '100%' }}>
      <SkeletonItem height={320} width={320} borderRadius={layout.radii.lg} />
      <View style={{ flex: 1, minWidth: 260, gap: 12 }}>
        <SkeletonItem height={32} width="70%" />
        <SkeletonItem height={24} width="40%" />
        <SkeletonItem height={80} width="100%" borderRadius={layout.radii.md} />
        <SkeletonItem height={48} width={160} borderRadius={layout.radii.md} style={{ marginTop: 12 }} />
      </View>
    </View>
  );
}

export function ProfileSkeleton() {
  return (
    <View style={{ padding: 24, gap: 16, maxWidth: 580, alignSelf: 'center', width: '100%' }}>
      <SkeletonItem height={36} width={200} style={{ marginBottom: 12 }} />
      <SkeletonItem height={52} width="100%" borderRadius={layout.radii.md} />
      <SkeletonItem height={52} width="100%" borderRadius={layout.radii.md} />
      <SkeletonItem height={52} width="100%" borderRadius={layout.radii.md} />
      <SkeletonItem height={44} width={140} borderRadius={layout.radii.md} style={{ marginTop: 12 }} />
    </View>
  );
}

