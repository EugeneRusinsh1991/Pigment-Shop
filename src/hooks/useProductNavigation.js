/**
 * @audit-keep Reusable navigation back-handler hook
 */
import { usePathname, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

export function getParentRoute(pathname) {
  if (!pathname || pathname === '/') return '/';
  if (pathname.startsWith('/product/')) return '/catalog';
  if (pathname.startsWith('/catalog/')) return '/catalog';
  if (pathname === '/checkout') return '/cart';
  if (pathname.startsWith('/admin/')) return '/admin';
  return '/';
}

export function useSmartBackHandler(onBack, customFallback) {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(() => {
    if (onBack) {
      onBack();
      return;
    }
    if (router.canGoBack()) {
      router.back();
      return;
    }
    
    const fallback = customFallback || getParentRoute(pathname);
    router.replace(fallback);
  }, [onBack, customFallback, pathname, router]);
}

export function useBackHandler(onBack) {
  return useSmartBackHandler(onBack);
}

export function useDrawerBackHandler(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const onBackPress = () => {
      onClose();
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [isOpen, onClose]);
}
