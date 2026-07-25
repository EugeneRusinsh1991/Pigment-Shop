import React, { useRef } from 'react';
import { Animated, Pressable, Platform } from 'react-native';
import { DEFAULT_ACTIVE_OPACITY } from '../theme/buttonCommon';
import { motion } from '../theme/tokens';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AnimatedButton({
  style,
  onPress,
  children,
  activeOpacity = DEFAULT_ACTIVE_OPACITY,
  scaleTo = motion.press.scale,
  disabled,
  ...props
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = (e) => {
    e?.stopPropagation?.();

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
    <AnimatedPressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        typeof style === 'function' ? style({ pressed }) : style,
        {
          opacity: pressed && !disabled ? activeOpacity : 1,
          transform: [{ scale: scaleAnim }],
        },
      ]}
      {...props}
    >
      {typeof children === 'function' ? children : children}
    </AnimatedPressable>
  );
}
