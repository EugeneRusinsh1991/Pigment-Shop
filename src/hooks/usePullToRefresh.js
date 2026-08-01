import { useState, useCallback } from 'react';
import { Platform } from 'react-native';

/**
 * Hook to handle pull-to-refresh logic.
 * On web, it defaults to a hard page reload (window.location.reload).
 * On native, or if a custom refresh function is provided, it invokes that instead.
 */
export default function usePullToRefresh(customRefresh = null) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    
    try {
      if (customRefresh) {
        await customRefresh();
      } else if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.location.reload();
      }
    } finally {
      // Small timeout to allow the reload to trigger or UI to settle
      setTimeout(() => setRefreshing(false), 500);
    }
  }, [customRefresh]);

  return { refreshing, onRefresh };
}
