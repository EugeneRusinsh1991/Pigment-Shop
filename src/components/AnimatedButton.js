import React, { useRef } from 'react';
import { Animated, TouchableOpacity, Platform } from 'react-native';
import { DEFAULT_ACTIVE_OPACITY } from '../theme/buttonCommon';
import { motion } from '../theme/tokens';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function AnimatedButton({ style, onPress, children, activeOpacity = DEFAULT_ACTIVE_OPACITY, scaleTo = motion.press.scale, ...props }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = (e) => {
    e?.stopPropagation?.();

    // Reset and trigger pop animation (same as FavoriteButton)
    scaleAnim.setValue(1);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: scaleTo,
        duration: motion.press.duration,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: motion.press.friction,
        tension: motion.press.tension,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();

    if (onPress) onPress(e);
  };

  return (
    <AnimatedTouchableOpacity
      accessibilityRole="button"
      {...props}
      onPress={handlePress}
      activeOpacity={activeOpacity}
      style={[style, { transform: [{ scale: scaleAnim }] }]}
    >
      {children}
    </AnimatedTouchableOpacity>
  );
}
