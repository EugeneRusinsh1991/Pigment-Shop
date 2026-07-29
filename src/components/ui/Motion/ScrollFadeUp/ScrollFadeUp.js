// @audit-keep
import React from 'react';
import { Animated } from 'react-native';
import { useMotionAnimation } from './useMotionAnimation';

export const ScrollFadeUp = React.forwardRef(function ScrollFadeUp({ children, style }, ref) {
  const { fadeAnim, translateYAnim, setRef } = useMotionAnimation(ref);

  return (
    <Animated.View
      ref={setRef}
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
});

export default ScrollFadeUp;
