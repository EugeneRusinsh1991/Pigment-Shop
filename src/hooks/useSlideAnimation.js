import { useAnimatedTransition } from './useAnimatedTransition';

/**
 * Slide panel animation hook.
 * Wraps the base useAnimatedTransition hook to define slide and scrim interpolation.
 *
 * @param {boolean} visible - Controlled trigger state.
 * @param {number} panelWidth - Width of the sliding panel.
 * @param {function} onClose - On close callback handler.
 * @returns {object} { showModal, slideAnim, scrimOpacity, handleClose }
 */
export function useSlideAnimation(visible, panelWidth, onClose) {
  const { shouldRender, anim } = useAnimatedTransition(visible, {
    durationIn: 250,
    durationOut: 220,
    initialValue: 0,
    targetValue: 1,
  });

  const slideAnim = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-panelWidth, 0],
  });

  const scrimOpacity = anim;

  const handleClose = () => {
    if (onClose) onClose();
  };

  return {
    showModal: shouldRender,
    slideAnim,
    scrimOpacity,
    handleClose,
  };
}
