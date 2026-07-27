import { useCallback } from 'react';
import { useRouter } from 'expo-router';

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
