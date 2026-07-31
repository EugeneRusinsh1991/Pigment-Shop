import { useEffect, useRef } from 'react';
import { Animated, Platform } from 'react-native';

const HIDE_HEIGHT = 56; // search bar container height (paddings + input)
const SCROLL_THRESHOLD = 4; // min px delta to trigger direction change
const DEBOUNCE_MS = 250;
const ACCUMULATED_THRESHOLD = 50; // min accumulated px to trigger state change
const TOP_THRESHOLD = 80; // min scroll from top to allow hiding

function isDocTarget(target) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return false;
  return !target || target === document || target === document.documentElement || target === document.body;
}

function getWindowScrollY() {
  if (typeof window === 'undefined') return 0;
  const doc = document.documentElement || document.body || {};
  return window.scrollY ?? doc.scrollTop ?? 0;
}

function getScrollPos(target) {
  if (target && target.scrollTop != null && !isDocTarget(target)) {
    return target.scrollTop;
  }
  return getWindowScrollY();
}

function getMetric(el, prop) {
  return el ? el[prop] || 0 : 0;
}

function getDocHeight() {
  if (typeof document === 'undefined') return 0;
  const doc = document.documentElement;
  const body = document.body;
  return Math.max(
    getMetric(doc, 'scrollHeight'),
    getMetric(doc, 'offsetHeight'),
    getMetric(body, 'scrollHeight'),
    getMetric(body, 'offsetHeight')
  );
}

function getDocMaxScrollY() {
  const height = getDocHeight();
  const viewportHeight = window.innerHeight || document.documentElement?.clientHeight || 0;
  return Math.max(0, height - viewportHeight);
}

function getMaxScrollY(target) {
  if (isDocTarget(target)) return getDocMaxScrollY();
  const scrollHeight = target?.scrollHeight || 0;
  const clientHeight = target?.clientHeight || 0;
  return Math.max(0, scrollHeight - clientHeight);
}

function getClampedScrollY(target) {
  const currentY = getScrollPos(target);
  const maxScrollY = getMaxScrollY(target);
  return {
    clampedY: Math.max(0, Math.min(currentY, maxScrollY)),
    maxScrollY,
  };
}

function animateVisibility(translateY, isHiddenRef, transitionTimeRef, targetValue, duration) {
  const shouldHide = targetValue < 0;
  if (isHiddenRef.current === shouldHide) return;
  isHiddenRef.current = shouldHide;
  transitionTimeRef.current = Date.now();
  Animated.timing(translateY, {
    toValue: targetValue,
    duration,
    useNativeDriver: false,
  }).start();
}

function updateAccumulatedScroll(accumulatedScroll, delta) {
  if (accumulatedScroll.current * delta < 0) {
    accumulatedScroll.current = 0;
  }
  accumulatedScroll.current += delta;
}

function shouldIgnoreScroll(clampedY, maxScrollY, delta) {
  if (maxScrollY > 0 && clampedY >= maxScrollY) return true;
  return Math.abs(delta) < SCROLL_THRESHOLD;
}

function evaluateAccumulatedAction(acc, clampedY, isHidden) {
  if (acc >= ACCUMULATED_THRESHOLD && clampedY > TOP_THRESHOLD && !isHidden.current) {
    return 'hide';
  }
  if (acc <= -ACCUMULATED_THRESHOLD && isHidden.current) {
    return 'show';
  }
  return 'none';
}

function getScrollAction(clampedY, maxScrollY, delta, accumulatedScroll, isHidden) {
  if (clampedY <= 20) {
    accumulatedScroll.current = 0;
    return 'show';
  }

  if (shouldIgnoreScroll(clampedY, maxScrollY, delta)) {
    return 'none';
  }

  updateAccumulatedScroll(accumulatedScroll, delta);

  const acc = accumulatedScroll.current;
  if (Math.abs(acc) < ACCUMULATED_THRESHOLD) {
    return 'none';
  }

  accumulatedScroll.current = 0;
  return evaluateAccumulatedAction(acc, clampedY, isHidden);
}

function handleScrollEvent(target, lastScrollYRef, lastTransitionTimeRef, accumulatedScroll, isHidden, show, hide) {
  if (Date.now() - lastTransitionTimeRef.current < DEBOUNCE_MS) return;

  const { clampedY, maxScrollY } = getClampedScrollY(target);
  const delta = clampedY - lastScrollYRef.current;

  if (Math.abs(delta) >= SCROLL_THRESHOLD) {
    lastScrollYRef.current = clampedY;
  }

  const action = getScrollAction(clampedY, maxScrollY, delta, accumulatedScroll, isHidden);

  if (action === 'show') show();
  else if (action === 'hide') hide();
}

/**
 * Hides the search bar when scrolling down and reveals it immediately
 * when scrolling up. Works for both mouse wheel and touch scrolling.
 *
 * Returns:
 *  - translateY: Animated.Value (0 = visible, -HIDE_HEIGHT = hidden)
 *  - hideHeight: number, used for overflow clipping
 */
export function useHomeScrollHide(disabled) {
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const lastTransitionTime = useRef(0);
  const accumulatedScroll = useRef(0);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const show = () => animateVisibility(translateY, isHidden, lastTransitionTime, 0, 180);
    const hide = () => animateVisibility(translateY, isHidden, lastTransitionTime, -HIDE_HEIGHT, 200);

    if (disabled) {
      show();
      return;
    }

    function onScroll(e) {
      if (e?.target) {
        handleScrollEvent(e.target, lastScrollY, lastTransitionTime, accumulatedScroll, isHidden, show, hide);
      }
    }

    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.addEventListener('scroll', onScroll, { capture: true, passive: true });
      return () => {
        document.removeEventListener('scroll', onScroll, { capture: true });
      };
    }
  }, [translateY, disabled]);

  return { translateY, hideHeight: HIDE_HEIGHT };
}


