import React, { useRef } from 'react';
import { Animated, Pressable, Platform, StyleSheet } from 'react-native';
import { DEFAULT_ACTIVE_OPACITY } from '../theme/buttonCommon';
import { motion } from '../theme/tokens';

export default function AnimatedButton({
  style,
  onPress,
  onPressIn,
  onPressOut,
  children,
  activeOpacity = DEFAULT_ACTIVE_OPACITY,
  scaleTo = motion.press.scale,
  disabled,
  hitSlop,
  accessibilityRole = 'button',
  ...props
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = (e) => {
    if (!disabled) {
      Animated.timing(opacityAnim, {
        toValue: activeOpacity,
        duration: 50,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }
    if (onPressIn) onPressIn(e);
  };

  const handlePressOut = (e) => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
    if (onPressOut) onPressOut(e);
  };

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
    <Animated.View
      style={[
        style,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Pressable
        accessibilityRole={accessibilityRole}
        disabled={disabled}
        hitSlop={hitSlop}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.innerPressable}
        {...props}
      >
        {typeof children === 'function' ? children : children}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  innerPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
