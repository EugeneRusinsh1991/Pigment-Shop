import React, { useEffect, useRef } from 'react';
import { Animated, Platform, View } from 'react-native';
import { layout } from '../../../../theme/tokens';
import { useSkeletonTheme } from './useSkeletonTheme';

export function SkeletonItem({ width = '100%', height = 20, borderRadius = layout.radii.sm, style }) {
  const { backgroundColor, styles } = useSkeletonTheme();
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 750,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: Platform.OS !== 'web',
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
  const { styles } = useSkeletonTheme();
  return (
    <View style={styles.catalogGrid}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={[{ width: `${Math.floor(100 / cols) - 3}%` }, styles.catalogItem]}>
          <SkeletonItem height={160} borderRadius={layout.radii.md} style={styles.catalogCardItem} />
          <SkeletonItem height={18} width="80%" style={styles.catalogTitleItem} />
          <SkeletonItem height={14} width="40%" />
        </View>
      ))}
    </View>
  );
}

export function ProductDetailSkeleton() {
  const { styles } = useSkeletonTheme();
  return (
    <View style={styles.productDetailContainer}>
      <SkeletonItem height={320} width={320} borderRadius={layout.radii.lg} />
      <View style={styles.productDetailInfo}>
        <SkeletonItem height={32} width="70%" />
        <SkeletonItem height={24} width="40%" />
        <SkeletonItem height={80} width="100%" borderRadius={layout.radii.md} />
        <SkeletonItem height={48} width={160} borderRadius={layout.radii.md} style={styles.productDetailButton} />
      </View>
    </View>
  );
}

export function ProfileSkeleton() {
  const { styles } = useSkeletonTheme();
  return (
    <View style={styles.profileContainer}>
      <SkeletonItem height={36} width={200} style={styles.profileHeaderItem} />
      <SkeletonItem height={52} width="100%" borderRadius={layout.radii.md} />
      <SkeletonItem height={52} width="100%" borderRadius={layout.radii.md} />
      <SkeletonItem height={52} width="100%" borderRadius={layout.radii.md} />
      <SkeletonItem height={44} width={140} borderRadius={layout.radii.md} style={styles.profileButtonItem} />
    </View>
  );
}


