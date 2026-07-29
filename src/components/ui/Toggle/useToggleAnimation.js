import { useRef, useEffect, useState } from 'react';
import { Animated, Platform } from 'react-native';

export function useToggleAnimation({ animated = true, value }) {
  const layoutsRef = useRef({});
  const translateX = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(0)).current;
  const [hasInitialLayout, setHasInitialLayout] = useState(false);

  const updateIndicator = (layout, isAnimated) => {
    if (!layout) return;
    const { x, width } = layout;

    if (isAnimated && animated) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: x,
          friction: 8,
          tension: 50,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.spring(widthAnim, {
          toValue: width,
          friction: 8,
          tension: 50,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    } else {
      translateX.setValue(x);
      widthAnim.setValue(width);
    }
  };

  const setOptionLayout = (val, layout) => {
    layoutsRef.current[val] = layout;
    if (val === value) {
      updateIndicator(layout, false);
      setHasInitialLayout(true);
    }
  };

  useEffect(() => {
    if (layoutsRef.current[value]) {
      updateIndicator(layoutsRef.current[value], true);
    }
  }, [value]);

  return {
    setOptionLayout,
    indicatorStyle: animated && hasInitialLayout ? {
      transform: [{ translateX }],
      width: widthAnim,
    } : null,
  };
}
