import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Hook to handle pull-to-refresh logic.
 * Triggers light haptic feedback and reloads the page on web.
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

  return { refreshing, onRefresh };
}
