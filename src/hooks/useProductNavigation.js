/**
 * @audit-keep Reusable navigation back-handler hook
 */
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

export function useBackHandler(onBack) {
  const router = useRouter();

  return useCallback(() => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  }, [onBack, router]);
}
