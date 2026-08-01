import { useRef, useState } from 'react';
import { Animated, Platform, useWindowDimensions } from 'react-native';
import { motion, shadows } from '../../../theme/tokens';
import { useAnimatedTransition } from '../../../hooks/useAnimatedTransition';
import { getDeviceTier } from '../../../utils/layoutUtils';

/**
 * Handles hover & press gesture drivers for the Card primitive module.
 */
export function useCardAnimation({
  interactive = false,
  hoverTranslateY = -6,
  pressScale = motion?.press?.scale || 0.98,
  duration = motion?.press?.duration || 150,
} = {}) {
  const { width: windowWidth } = useWindowDimensions();
  const isDesktop = getDeviceTier(windowWidth) === 'desktop';
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
    outputRange: [0, isDesktop ? hoverTranslateY : 0],
  });

  const shadowOpacity = hoverAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.06, 0.22],
  });

  const handleMouseEnter = (e) => {
    if (!interactive || !isDesktop) return;
    setHovered(true);
  };

  const handleMouseLeave = (e) => {
    if (!interactive || !isDesktop) return;
    setHovered(false);
  };

  const handlePressIn = (e) => {
    if (!interactive) return;
    if (isDesktop) setHovered(true);
    Animated.timing(scaleAnim, {
      toValue: pressScale,
      duration: motion?.press?.duration || 90,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  };

  const handlePressOut = (e) => {
    if (!interactive) return;
    if (isDesktop) setHovered(false);
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
        ...(isDesktop && hovered ? shadows.cardHover : shadows.cardRest),
      }
    : null;

  return {
    hoverAnim,
    translateY,
    shadowOpacity,
    scaleAnim,
    animatedStyle,
    bind: {
      onHoverIn: handleMouseEnter,
      onHoverOut: handleMouseLeave,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
    },
  };
}


