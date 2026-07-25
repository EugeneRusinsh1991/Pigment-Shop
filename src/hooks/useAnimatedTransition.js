import { useEffect, useRef, useState } from 'react';
import { Animated, Platform } from 'react-native';

/**
 * Shared base hook to coordinate boolean visibility transitions, delayed unmounting,
 * and Platform.OS web checks for useNativeDriver animation flags.
 *
 * @param {boolean} visible - Controlled trigger state.
 * @param {object} config - Timing configurations.
 * @returns {object} { shouldRender, anim }
 */
export function useAnimatedTransition(visible, {
  durationIn = 200,
  durationOut = 150,
  initialValue = 0,
  targetValue = 1,
} = {}) {
  const [shouldRender, setShouldRender] = useState(visible);
  const anim = useRef(new Animated.Value(visible ? targetValue : initialValue)).current;
  const isFirstRender = useRef(true);

  useEffect(() => {
    const useNativeDriver = Platform.OS !== 'web';

    if (visible) {
      setShouldRender(true);
      Animated.timing(anim, {
        toValue: targetValue,
        duration: durationIn,
        useNativeDriver,
      }).start();
    } else {
      if (isFirstRender.current) {
        setShouldRender(false);
        anim.setValue(initialValue);
      } else {
        Animated.timing(anim, {
          toValue: initialValue,
          duration: durationOut,
          useNativeDriver,
        }).start(() => {
          setShouldRender(false);
        });
      }
    }
    isFirstRender.current = false;
  }, [visible, anim, durationIn, durationOut, targetValue, initialValue]);

  return {
    shouldRender,
    anim,
  };
}
