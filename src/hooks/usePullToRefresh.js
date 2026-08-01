import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Hook to handle pull-to-refresh logic.
 * Triggers light haptic feedback on refresh start.
 * Performs custom refresh if provided, or soft async pause fallback.
 */
export default function usePullToRefresh(customRefresh = null) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    } catch (_) {
      // Haptics safe fallback for web / unsupported environments
    }

    try {
      if (customRefresh) {
        await customRefresh();
      } else {
        // Soft fallback instead of forcing window.location.reload()
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
    } finally {
      setTimeout(() => setRefreshing(false), 300);
    }
  }, [customRefresh]);

  return { refreshing, onRefresh };
}
