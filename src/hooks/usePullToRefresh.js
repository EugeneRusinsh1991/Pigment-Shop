import { useState, useCallback, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

const PULL_THRESHOLD = 80;
const MAX_PULL = 140;

// Global registry for pull-to-refresh handlers
const activeHandlers = [];
let globalListenersBound = false;

const globalState = {
  startY: 0,
  pulling: false,
  indicator: null,
};

function getOrCreateIndicator() {
  if (globalState.indicator) return globalState.indicator;
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
  el.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`;
  document.body.appendChild(el);
  globalState.indicator = el;
  return el;
}

function updateIndicator(pullDistance) {
  const el = getOrCreateIndicator();
  const progress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const yOffset = Math.min(pullDistance * 0.5, MAX_PULL * 0.5);
  const rotation = progress * 360;
  el.style.transform = `translateX(-50%) translateY(${yOffset - 40}px) rotate(${rotation}deg)`;
  el.style.opacity = String(Math.min(progress, 1));
  if (progress >= 1) {
    el.style.background = 'rgba(76, 175, 80, 0.9)';
  } else {
    el.style.background = 'rgba(120, 120, 120, 0.85)';
  }
}

function hideIndicator() {
  if (!globalState.indicator) return;
  globalState.indicator.style.opacity = '0';
  globalState.indicator.style.transform = 'translateX(-50%) translateY(-40px) rotate(0deg)';
  globalState.indicator.style.background = 'rgba(120, 120, 120, 0.85)';
}

function getActiveHandler() {
  return activeHandlers.length > 0 ? activeHandlers[activeHandlers.length - 1] : null;
}

function handleTouchStart(e) {
  const handler = getActiveHandler();
  if (!handler) return;

  if (handler.getScrollTop() > 0) {
    globalState.pulling = false;
    return;
  }
  globalState.startY = e.touches[0].clientY;
  globalState.pulling = true;
}

function handleTouchMove(e) {
  if (!globalState.pulling) return;
  const handler = getActiveHandler();
  if (!handler) return;

  const currentY = e.touches[0].clientY;
  const delta = currentY - globalState.startY;

  if (delta <= 0) {
    hideIndicator();
    return;
  }

  if (handler.getScrollTop() > 0) {
    globalState.pulling = false;
    hideIndicator();
    return;
  }

  updateIndicator(delta);
}

function handleTouchEnd(e) {
  if (!globalState.pulling) return;
  const handler = getActiveHandler();
  if (!handler) return;

  const endY = e.changedTouches[0].clientY;
  const delta = endY - globalState.startY;
  globalState.pulling = false;
  hideIndicator();

  if (delta >= PULL_THRESHOLD && handler.getScrollTop() === 0) {
    handler.onRefresh();
  }
}

function bindGlobalListeners() {
  if (globalListenersBound || typeof document === 'undefined') return;
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
  globalListenersBound = true;
}

/**
 * Hook to handle pull-to-refresh logic.
 * On native: returns refreshing/onRefresh for RefreshControl.
 * On web: registers DOM touch listeners to detect pull-down gesture.
 */
export default function usePullToRefresh(customRefresh = null, options = {}) {
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

  useWebPullToRefresh(onRefresh, options);

  return { refreshing, onRefresh };
}

/**
 * Web-only effect: Uses a singleton stack to ensure only the most recently
 * mounted hook processes the pull-down gesture.
 */
function useWebPullToRefresh(onRefresh, options) {
  const handlerRef = useRef({
    onRefresh,
    getScrollTop: () => {
      if (options.scrollViewRef?.current) {
        const node = options.scrollViewRef.current.getScrollableNode
          ? options.scrollViewRef.current.getScrollableNode()
          : options.scrollViewRef.current;
        return node?.scrollTop || 0;
      }
      return window.scrollY || document.documentElement.scrollTop || 0;
    },
  });

  useEffect(() => {
    handlerRef.current.onRefresh = onRefresh;
    handlerRef.current.getScrollTop = () => {
      if (options.scrollViewRef?.current) {
        const node = options.scrollViewRef.current.getScrollableNode
          ? options.scrollViewRef.current.getScrollableNode()
          : options.scrollViewRef.current;
        return node?.scrollTop || 0;
      }
      return window.scrollY || document.documentElement.scrollTop || 0;
    };
  }, [onRefresh, options.scrollViewRef]);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    bindGlobalListeners();
    const handler = handlerRef.current;
    activeHandlers.push(handler);

    return () => {
      const index = activeHandlers.indexOf(handler);
      if (index > -1) {
        activeHandlers.splice(index, 1);
      }
      if (activeHandlers.length === 0 && globalState.indicator) {
        globalState.indicator.remove();
        globalState.indicator = null;
      }
    };
  }, []);
}
