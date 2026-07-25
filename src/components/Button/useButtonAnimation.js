import { useRef } from 'react';
import { Animated, Platform } from 'react-native';
import { motion } from '../../theme/tokens';

export function useButtonAnimation({ animated, disabled, loading, activeOpacity, scaleTo, onPressIn, onPressOut, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = (e) => {
    if (!disabled && !loading) {
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
    if (disabled || loading) return;
    e?.stopPropagation?.();

    if (animated) {
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
    }

    if (onPress) onPress(e);
  };

  return { scaleAnim, opacityAnim, handlePressIn, handlePressOut, handlePress };
}
