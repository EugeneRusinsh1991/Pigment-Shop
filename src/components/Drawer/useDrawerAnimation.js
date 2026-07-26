import { useRef, useEffect, useState, useCallback } from 'react';
import { Animated, Easing } from 'react-native';
import { motion } from '../../theme/tokens';

const drawerMotion = motion?.drawer || {
  durationIn: 250,
  durationOut: 220,
  friction: 7,
  tension: 40,
};

export function useDrawerAnimation({
  visible = false,
  isOpen,
  panelWidth = 300,
  position = 'left',
  onClose,
} = {}) {
  const activeOpen = isOpen !== undefined ? isOpen : visible;
  const anim = useRef(new Animated.Value(activeOpen ? 1 : 0)).current;
  const [shouldRender, setShouldRender] = useState(activeOpen);

  const durationIn = drawerMotion.durationIn || drawerMotion.slideDuration || 250;
  const durationOut = drawerMotion.durationOut || drawerMotion.slideDuration || 220;

  useEffect(() => {
    if (activeOpen) {
      setShouldRender(true);
      Animated.timing(anim, {
        toValue: 1,
        duration: durationIn,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(anim, {
        toValue: 0,
        duration: durationOut,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setShouldRender(false);
        }
      });
    }
  }, [activeOpen, anim, durationIn, durationOut]);

  const handleClose = useCallback(() => {
    Animated.timing(anim, {
      toValue: 0,
      duration: durationOut,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setShouldRender(false);
        if (onClose) {
          onClose();
        }
      }
    });
  }, [anim, durationOut, onClose]);

  const getOutputStart = () => {
    if (position === 'right') return panelWidth;
    if (position === 'top') return -panelWidth;
    if (position === 'bottom') return panelWidth;
    return -panelWidth; // left
  };

  const slideAnim = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [getOutputStart(), 0],
  });

  const backdropOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });

  return {
    shouldRender,
    slideAnim,
    backdropOpacity,
    scrimOpacity: backdropOpacity,
    handleClose,
    anim,
  };
}

export default useDrawerAnimation;
