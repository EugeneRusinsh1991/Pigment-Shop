import { useState, useCallback, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

const PULL_THRESHOLD = 80;
const MAX_PULL = 140;

/**
 * Hook to handle pull-to-refresh logic.
 * On native: returns refreshing/onRefresh for RefreshControl.
 * On web: registers DOM touch listeners to detect pull-down gesture
 * at scrollY === 0 and triggers window.location.reload().
 */
export default function usePullToRefresh(customRefresh = null) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    } catch (_) {}

    try {
      if (customRefresh) {
        await customRefresh();
      } else if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.location.reload();
      }
    } finally {
      setTimeout(() => setRefreshing(false), 300);
    }
  }, [customRefresh]);

  useWebPullToRefresh(onRefresh);

  return { refreshing, onRefresh };
}

/**
 * Web-only effect: attaches DOM touch listeners to detect a pull-down
 * gesture and triggers onRefresh when the pull exceeds PULL_THRESHOLD.
 * Shows a small visual indicator during the gesture.
 */
function useWebPullToRefresh(onRefresh) {
  const stateRef = useRef({
    startY: 0,
    pulling: false,
    indicator: null,
  });

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const state = stateRef.current;

    function getOrCreateIndicator() {
      if (state.indicator) return state.indicator;
      const el = document.createElement('div');
      Object.assign(el.style, {
        position: 'fixed',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%) translateY(-40px)',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'rgba(120, 120, 120, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '999999',
        transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
        opacity: '0',
        pointerEvents: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      });
      el.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>`;
      document.body.appendChild(el);
      state.indicator = el;
      return el;
    }

    function updateIndicator(pullDistance) {
      const el = getOrCreateIndicator();
      const progress = Math.min(pullDistance / PULL_THRESHOLD, 1);
      const yOffset = Math.min(pullDistance * 0.5, MAX_PULL * 0.5);
      const rotation = progress * 360;
      el.style.transform =
        `translateX(-50%) translateY(${yOffset - 40}px) rotate(${rotation}deg)`;
      el.style.opacity = String(Math.min(progress, 1));
      if (progress >= 1) {
        el.style.background = 'rgba(76, 175, 80, 0.9)';
      } else {
        el.style.background = 'rgba(120, 120, 120, 0.85)';
      }
    }

    function hideIndicator() {
      if (!state.indicator) return;
      state.indicator.style.opacity = '0';
      state.indicator.style.transform =
        'translateX(-50%) translateY(-40px) rotate(0deg)';
      state.indicator.style.background = 'rgba(120, 120, 120, 0.85)';
    }

    function removeIndicator() {
      if (!state.indicator) return;
      state.indicator.remove();
      state.indicator = null;
    }

    function getScrollTop() {
      return window.scrollY || document.documentElement.scrollTop || 0;
    }

    function handleTouchStart(e) {
      if (getScrollTop() > 0) {
        state.pulling = false;
        return;
      }
      state.startY = e.touches[0].clientY;
      state.pulling = true;
    }

    function handleTouchMove(e) {
      if (!state.pulling) return;
      const currentY = e.touches[0].clientY;
      const delta = currentY - state.startY;

      if (delta <= 0) {
        hideIndicator();
        return;
      }

      if (getScrollTop() > 0) {
        state.pulling = false;
        hideIndicator();
        return;
      }

      updateIndicator(delta);
    }

    function handleTouchEnd(e) {
      if (!state.pulling) return;
      const endY = e.changedTouches[0].clientY;
      const delta = endY - state.startY;
      state.pulling = false;
      hideIndicator();

      if (delta >= PULL_THRESHOLD && getScrollTop() === 0) {
        onRefresh();
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      removeIndicator();
    };
  }, [onRefresh]);
}
