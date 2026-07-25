import { useAnimatedTransition } from './useAnimatedTransition';

/**
 * Dropdown mounting and entry/exit transition animation hook.
 * Wraps useAnimatedTransition to define translateY interpolation.
 *
 * @param {boolean} visible - Controlled trigger state.
 * @returns {object} { shouldRender, anim, translateY, opacity }
 */
export function useDropdownAnimation(visible) {
  const { shouldRender, anim } = useAnimatedTransition(visible, {
    durationIn: 200,
    durationOut: 150,
    initialValue: 0,
    targetValue: 1,
  });

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-12, 0],
  });

  return {
    shouldRender,
    anim,
    translateY,
    opacity: anim,
  };
}
