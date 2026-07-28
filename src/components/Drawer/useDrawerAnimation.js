import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { motion } from '../../theme/tokens';

const drawerMotion = motion?.drawer || {
  durationIn: 250,
  durationOut: 220,
  friction: 7,
  tension: 40,
};

function getAnimationConfig(toValue, duration, onComplete) {
  return {
    toValue,
    duration,
    easing: Easing.out(Easing.quad),
    useNativeDriver: true,
    ...(onComplete ? { onComplete } : {}),
  };
}

function getOutputStart(position, panelWidth) {
  if (position === 'right' || position === 'bottom') return panelWidth;
  return -panelWidth;
}

function getMotionDuration(durationKey) {
  return drawerMotion[durationKey] || drawerMotion.slideDuration || (durationKey === 'durationIn' ? 250 : 220);
}

function resolveActiveOpen(visible, isOpen) {
  return isOpen !== undefined ? isOpen : visible;
}

function buildDrawerAnimationResult({ shouldRender, slideAnim, backdropOpacity, handleClose, anim }) {
  return {
    shouldRender,
    slideAnim,
    backdropOpacity,
    scrimOpacity: backdropOpacity,
    handleClose,
    anim,
  };
}

function runAnimation(anim, toValue, duration, onComplete) {
  const config = getAnimationConfig(toValue, duration, onComplete);
  return Animated.timing(anim, config).start(onComplete);
}

function useDrawerAnimationState({ activeOpen, anim, durationIn, durationOut, onClose }) {
  const [shouldRender, setShouldRender] = useState(activeOpen);

  useEffect(() => {
    if (activeOpen) {
      setShouldRender(true);
      runAnimation(anim, 1, durationIn);
      return;
    }

    runAnimation(anim, 0, durationOut, ({ finished }) => {
      if (finished) {
        setShouldRender(false);
      }
    });
  }, [activeOpen, anim, durationIn, durationOut]);

  const handleClose = useCallback(() => {
    runAnimation(anim, 0, durationOut, ({ finished }) => {
      if (finished) {
        setShouldRender(false);
        if (onClose) {
          onClose();
        }
      }
    });
  }, [anim, durationOut, onClose]);

  return { shouldRender, handleClose };
}

export function useDrawerAnimation(props = {}) {
  const { visible = false, isOpen, panelWidth = 300, position = 'left', onClose } = props;
  const activeOpen = resolveActiveOpen(visible, isOpen);
  const anim = useRef(new Animated.Value(activeOpen ? 1 : 0)).current;

  const durationIn = getMotionDuration('durationIn');
  const durationOut = getMotionDuration('durationOut');

  const { shouldRender, handleClose } = useDrawerAnimationState({
    activeOpen,
    anim,
    durationIn,
    durationOut,
    onClose,
  });

  const slideAnim = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [getOutputStart(position, panelWidth), 0],
  });

  const backdropOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });

  return buildDrawerAnimationResult({ shouldRender, slideAnim, backdropOpacity, handleClose, anim });
}

export default useDrawerAnimation;
