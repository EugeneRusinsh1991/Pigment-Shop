import { useEffect, useRef } from 'react';
import { Animated, Platform } from 'react-native';

const HIDE_HEIGHT = 48;
const SCROLL_THRESHOLD = 15;
const TOP_THRESHOLD = 56;

/**
 * Overrides Expo Web's `body { overflow: hidden }` reset so the document
 * scrolls normally and window.scrollY / position:sticky work correctly.
 * Only runs once.
 */
let bodyOverrideApplied = false;
function ensureBodyScrollable() {
  if (bodyOverrideApplied) return;
  if (typeof document === 'undefined') return;
  bodyOverrideApplied = true;

  const style = document.createElement('style');
  style.textContent = `
    body { overflow: visible !important; overflow-y: auto !important; }
    #root { height: auto !important; min-height: 100vh; }
  `;
  document.head.appendChild(style);
}

function getWindowScrollY() {
  if (typeof window === 'undefined') return 0;
  return window.scrollY ?? document.documentElement?.scrollTop ?? 0;
}

function getMaxScrollY() {
  if (typeof window === 'undefined') return 0;
  const doc = document.documentElement;
  const scrollHeight = Math.max(doc?.scrollHeight || 0, document.body?.scrollHeight || 0);
  const viewportHeight = window.innerHeight || doc?.clientHeight || 0;
  return Math.max(0, scrollHeight - viewportHeight);
}

/**
 * Hides the search bar when scrolling down and reveals it when scrolling up.
 * Fixes Expo Web's body overflow to enable normal window scrolling.
 */
export function useHomeScrollHide(disabled) {
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const accumulatedDelta = useRef(0);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    ensureBodyScrollable();

    const animateTo = (targetValue, shouldHide) => {
      if (isHidden.current === shouldHide) return;
      isHidden.current = shouldHide;
      Animated.timing(translateY, {
        toValue: targetValue,
        duration: 200,
        useNativeDriver: false,
      }).start();
    };

    const show = () => animateTo(0, false);
    const hide = () => animateTo(-HIDE_HEIGHT, true);

    if (disabled) {
      show();
      accumulatedDelta.current = 0;
      return;
    }

    const initialY = getWindowScrollY();
    lastScrollY.current = initialY;
    if (initialY <= TOP_THRESHOLD) {
      show();
    }

    function onScroll() {
      const maxScrollY = getMaxScrollY();
      const rawY = getWindowScrollY();
      const currentY = Math.max(0, Math.min(rawY, maxScrollY));
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      if (currentY <= TOP_THRESHOLD) {
        accumulatedDelta.current = 0;
        show();
        return;
      }

      if (accumulatedDelta.current * delta < 0) {
        accumulatedDelta.current = 0;
      }

      accumulatedDelta.current += delta;

      if (accumulatedDelta.current >= SCROLL_THRESHOLD) {
        hide();
      } else if (accumulatedDelta.current <= -SCROLL_THRESHOLD) {
        show();
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [translateY, disabled]);

  return { translateY, hideHeight: HIDE_HEIGHT };
}
