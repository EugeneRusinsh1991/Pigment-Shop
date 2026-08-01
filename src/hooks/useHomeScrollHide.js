import { useEffect, useRef, useCallback } from 'react';
import { Animated, Platform } from 'react-native';

const HIDE_HEIGHT = 60;
const DIRECTION_THRESHOLD = 4;

export function useHomeScrollHide(disabled) {
  const translateY = useRef(new Animated.Value(0)).current;
  const isHidden = useRef(false);
  const accumulatedDelta = useRef(0);

  const animateTo = useCallback((targetValue, shouldHide) => {
    if (isHidden.current === shouldHide) return;
    isHidden.current = shouldHide;
    Animated.timing(translateY, {
      toValue: targetValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [translateY]);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const show = () => animateTo(0, false);
    const hide = () => animateTo(-HIDE_HEIGHT, true);

    if (disabled) {
      show();
      accumulatedDelta.current = 0;
      return;
    }

    const onDirectionChange = (deltaY) => {
      if (accumulatedDelta.current * deltaY < 0) {
        accumulatedDelta.current = 0;
      }
      accumulatedDelta.current += deltaY;

      if (accumulatedDelta.current >= DIRECTION_THRESHOLD) {
        hide();
      } else if (accumulatedDelta.current <= -DIRECTION_THRESHOLD) {
        show();
      }
    };

    const isEventInOverlay = (e) => {
      return Boolean(e?.target?.closest?.('#app-drawer, [role="dialog"]'));
    };

    const onWheel = (e) => {
      if (isEventInOverlay(e)) return;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollY <= 0 && e.deltaY < 0) return;
      if (scrollY >= maxScrollY && e.deltaY > 0) return;
      onDirectionChange(e.deltaY);
    };

    let lastTouchY = null;
    const onTouchStart = (e) => {
      if (isEventInOverlay(e)) {
        lastTouchY = null;
        return;
      }
      lastTouchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e) => {
      if (isEventInOverlay(e)) {
        lastTouchY = null;
        return;
      }
      if (lastTouchY === null) return;
      const currentY = e.touches[0]?.clientY;
      if (currentY == null) return;
      const delta = lastTouchY - currentY;
      lastTouchY = currentY;

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollY <= 0 && delta < 0) return;
      if (scrollY >= maxScrollY && delta > 0) return;

      onDirectionChange(delta);
    };
    const onTouchEnd = () => { lastTouchY = null; };

    document.addEventListener('wheel', onWheel, { passive: true });
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('wheel', onWheel);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [translateY, disabled, animateTo]);

  return { translateY, hideHeight: HIDE_HEIGHT };
}
