import { useRef, useEffect } from 'react';
import { Animated, Platform } from 'react-native';

/**
 * Custom hook managing focus state animation drivers and scale/opacity transitions for TextField.
 */
export function useTextFieldAnimation({ focused = false, animated = true } = {}) {
  const focusAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    if (!animated) {
      focusAnim.setValue(focused ? 1 : 0);
      return;
    }

    Animated.timing(focusAnim, {
      toValue: focused ? 1 : 0,
      duration: 160,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [focused, animated, focusAnim]);

  const scale = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.008],
  });

  const focusRingOpacity = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.15],
  });

  return {
    focusAnim,
    animatedContainerStyle: animated
      ? {
          transform: [{ scale }],
        }
      : null,
    focusRingOpacity,
  };
}

