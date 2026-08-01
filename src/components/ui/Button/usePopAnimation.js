import { useRef, useCallback } from 'react';
import { Animated, Platform } from 'react-native';

export function usePopAnimation({ 
  scaleTo = 0.94, 
  popScale = 1.25, 
  onPress, 
  onPressIn, 
  onPressOut, 
  disabled, 
  loading 
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback((e) => {
    if (!disabled && !loading) {
      Animated.timing(scaleAnim, {
        toValue: scaleTo,
        duration: 80,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }
    if (onPressIn) onPressIn(e);
  }, [disabled, loading, scaleTo, scaleAnim, onPressIn]);

  const handlePressOut = useCallback((e) => {
    if (!disabled && !loading) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 180,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }
    if (onPressOut) onPressOut(e);
  }, [disabled, loading, scaleAnim, onPressOut]);

  const triggerPop = useCallback(() => {
    if (!disabled && !loading) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: popScale,
          duration: 80,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 180,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    }
  }, [disabled, loading, popScale, scaleAnim]);

  const handlePress = useCallback((e) => {
    if (disabled || loading) return;
    e?.stopPropagation?.();
    if (onPress) onPress(e);
  }, [disabled, loading, onPress]);

  return { scaleAnim, handlePressIn, handlePressOut, handlePress, triggerPop };
}
