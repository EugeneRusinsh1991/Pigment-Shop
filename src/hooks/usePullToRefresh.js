import { useState, useCallback, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { usePullToRefreshContext } from '../features/shell/PullToRefreshContext';

const PULL_THRESHOLD = 80;
const MAX_PULL = 140;

// Global registry for pull-to-refresh handlers
const activeHandlers = [];
let globalListenersBound = false;

const globalState = {
  startY: 0,
  canPull: false,
  pulling: false,
};

function getActiveHandler() {
  return activeHandlers.length > 0 ? activeHandlers[activeHandlers.length - 1] : null;
}

function handleTouchStart(e) {
  const handler = getActiveHandler();
  if (!handler) return;

  const scrollTop = handler.getScrollTop(e.target);
  if (scrollTop > 0) {
    globalState.canPull = false;
    globalState.pulling = false;
    return;
  }
  globalState.startY = e.touches[0].clientY;
  globalState.canPull = true;
  globalState.pulling = true;
}

function handleTouchMove(e) {
  if (!globalState.canPull || !globalState.pulling) return;
  const handler = getActiveHandler();
  if (!handler) return;

  const currentY = e.touches[0].clientY;
  const delta = currentY - globalState.startY;

  if (delta <= 0) {
    handler.setPullDistance(0);
    return;
  }

  if (handler.getScrollTop(e.target) > 0) {
    globalState.canPull = false;
    globalState.pulling = false;
    handler.setPullDistance(0);
    return;
  }

  handler.setPullDistance(Math.min(delta, MAX_PULL));
}

function handleTouchEnd(e) {
  if (!globalState.canPull || !globalState.pulling) {
    globalState.canPull = false;
    globalState.pulling = false;
    return;
  }
  const handler = getActiveHandler();
  if (!handler) {
    globalState.canPull = false;
    globalState.pulling = false;
    return;
  }

  const endY = e.changedTouches[0].clientY;
  const delta = endY - globalState.startY;
  const scrollTop = handler.getScrollTop(e.target);

  globalState.canPull = false;
  globalState.pulling = false;
  handler.setPullDistance(0);

  if (delta >= PULL_THRESHOLD && scrollTop === 0) {
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
 * On web: registers DOM touch listeners to detect pull-down gesture and exposes pullDistance state.
 */
export default function usePullToRefresh(customRefresh = null, options = {}) {
  const [localRefreshing, setLocalRefreshing] = useState(false);
  const [localPullDistance, setLocalPullDistance] = useState(0);
  const context = usePullToRefreshContext();

  const setRefreshing = context?.setRefreshing || setLocalRefreshing;
  const setPullDistance = context?.setPullDistance || setLocalPullDistance;
  const refreshing = context?.refreshing ?? localRefreshing;
  const pullDistance = context?.pullDistance ?? localPullDistance;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    } catch (_) {}

    const isDynamic = options.isDynamicRoute || options.strategy === 'refetch';

    if (Platform.OS === 'web' && typeof window !== 'undefined' && !isDynamic) {
      window.location.reload();
      return;
    }

    try {
      if (customRefresh) {
        await customRefresh();
      } else {
        console.warn('[usePullToRefresh] No customRefresh handler provided.');
      }
    } finally {
      setTimeout(() => setRefreshing(false), 300);
    }
  }, [customRefresh, setRefreshing, options.isDynamicRoute, options.strategy]);

  useWebPullToRefresh(onRefresh, setPullDistance, options);

  return { refreshing, onRefresh, pullDistance };
}

/**
 * Web-only effect: Uses a singleton stack to ensure only the most recently
 * mounted hook processes the pull-down gesture.
 */
function useWebPullToRefresh(onRefresh, setPullDistance, options) {
  const handlerRef = useRef({
    onRefresh,
    setPullDistance,
    getScrollTop: (target) => {
      if (options.scrollViewRef?.current) {
        const node = options.scrollViewRef.current.getScrollableNode
          ? options.scrollViewRef.current.getScrollableNode()
          : options.scrollViewRef.current;
        return node?.scrollTop || 0;
      }
      if (target && target instanceof Element) {
        let curr = target;
        while (curr && curr !== document.body && curr !== document.documentElement) {
          if (curr.scrollTop > 0) return curr.scrollTop;
          curr = curr.parentElement;
        }
      }
      return window.scrollY || document.documentElement.scrollTop || 0;
    },
  });

  useEffect(() => {
    handlerRef.current.onRefresh = onRefresh;
    handlerRef.current.setPullDistance = setPullDistance;
    handlerRef.current.getScrollTop = (target) => {
      if (options.scrollViewRef?.current) {
        const node = options.scrollViewRef.current.getScrollableNode
          ? options.scrollViewRef.current.getScrollableNode()
          : options.scrollViewRef.current;
        return node?.scrollTop || 0;
      }
      if (target && target instanceof Element) {
        let curr = target;
        while (curr && curr !== document.body && curr !== document.documentElement) {
          if (curr.scrollTop > 0) return curr.scrollTop;
          curr = curr.parentElement;
        }
      }
      return window.scrollY || document.documentElement.scrollTop || 0;
    };
  }, [onRefresh, setPullDistance, options.scrollViewRef]);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined' || options.disabled) return;

    bindGlobalListeners();
    const handler = handlerRef.current;
    activeHandlers.push(handler);

    return () => {
      const index = activeHandlers.indexOf(handler);
      if (index > -1) {
        activeHandlers.splice(index, 1);
      }
      handler.setPullDistance(0);
    };
  }, [options.disabled]);
}
