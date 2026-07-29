import { useRef, useState } from 'react';
import { Animated, Platform } from 'react-native';
import { motion } from '../../theme/tokens';
import { useAnimatedTransition } from '../../hooks/useAnimatedTransition';

/**
 * Handles hover & press gesture drivers for the Card primitive module.
 */
export function useCardAnimation({
  interactive = false,
  hoverTranslateY = -5,
  pressScale = motion?.press?.scale || 0.98,
  duration = motion?.press?.duration || 150,
} = {}) {
  const [hovered, setHovered] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const { anim: hoverAnim } = useAnimatedTransition(hovered, {
    durationIn: duration,
    durationOut: duration,
    initialValue: 0,
    targetValue: 1,
  });

  const translateY = hoverAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, hoverTranslateY],
  });

  const handleMouseEnter = (e) => {
    if (!interactive) return;
    setHovered(true);
  };

  const handleMouseLeave = (e) => {
    if (!interactive) return;
    setHovered(false);
  };

  const handlePressIn = (e) => {
    if (!interactive) return;
    setHovered(true);
    Animated.timing(scaleAnim, {
      toValue: pressScale,
      duration: motion?.press?.duration || 90,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  };

  const handlePressOut = (e) => {
    if (!interactive) return;
    setHovered(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: motion?.press?.friction || 4,
      tension: motion?.press?.tension || 40,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  };

  const animatedStyle = interactive
    ? {
        transform: [{ translateY }, { scale: scaleAnim }],
      }
    : null;

  return {
    hoverAnim,
    translateY,
    scaleAnim,
    animatedStyle,
    bind: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
    },
  };
}


