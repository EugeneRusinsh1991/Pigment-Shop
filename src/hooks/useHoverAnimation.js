import { useState } from 'react';
import { useAnimatedTransition } from './useAnimatedTransition';

/**
 * Hover trigger translation animation hook.
 * Wraps useAnimatedTransition to drive hover translation.
 *
 * @param {Array<number>} outputRange - Y translation output range.
 * @param {number} duration - Timing duration.
 * @returns {object} { hoverAnim, translateY, bind }
 */
export default function useHoverAnimation(outputRange = [0, -5], duration = 150) {
  const [hovered, setHovered] = useState(false);
  const { anim } = useAnimatedTransition(hovered, {
    durationIn: duration,
    durationOut: duration,
    initialValue: 0,
    targetValue: 1,
  });

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const handlePressIn = () => setHovered(true);
  const handlePressOut = () => setHovered(false);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange,
  });

  return {
    hoverAnim: anim,
    translateY,
    bind: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
    },
  };
}
