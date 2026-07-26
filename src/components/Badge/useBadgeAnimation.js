import { useEffect, useRef } from 'react';
import { Animated, Platform } from 'react-native';

/**
 * Handles scale pulse animations for counters and press gesture feedback for interactive chips/badges.
 */
export function useBadgeAnimation({
  animated = false,
  count,
  interactive = false,
  pressScale = 0.94,
} = {}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isFirstRender = useRef(true);

  // Trigger pulse scale sequence when count updates
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (animated && count !== undefined) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.25,
          duration: 120,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    }
  }, [count, animated, scaleAnim]);

  const handlePressIn = () => {
    if (!interactive) return;
    Animated.timing(scaleAnim, {
      toValue: pressScale,
      duration: 80,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  };

  const handlePressOut = () => {
    if (!interactive) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  };

  const animatedStyle = animated || interactive
    ? {
        transform: [{ scale: scaleAnim }],
      }
    : null;

  return {
    scaleAnim,
    animatedStyle,
    bind: {
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
    },
  };
}

export default useBadgeAnimation;
