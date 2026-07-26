import { useRef, useLayoutEffect } from 'react';
import { Animated, Platform } from 'react-native';

function getDomNode(element) {
  if (Platform.OS !== 'web' || typeof window === 'undefined' || !element) {
    return null;
  }
  return typeof element.getRootNode === 'function' ? element : null;
}

function checkIsVisible(domNode) {
  const rect = domNode.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function animateFadeUp(fadeAnim, translateYAnim) {
  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: Platform.OS !== 'web',
    }),
    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: Platform.OS !== 'web',
    }),
  ]).start();
}

export function useScrollAnimation(ref) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const viewRef = useRef(null);

  const setRef = (element) => {
    viewRef.current = element;
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref && typeof ref === 'object') {
      ref.current = element;
    }
  };

  useLayoutEffect(() => {
    const domNode = getDomNode(viewRef.current);
    if (!domNode) return;

    if (checkIsVisible(domNode)) {
      fadeAnim.setValue(1);
      translateYAnim.setValue(0);
      return;
    }

    fadeAnim.setValue(0);
    translateYAnim.setValue(20);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateFadeUp(fadeAnim, translateYAnim);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.05 }
    );

    observer.observe(domNode);
    return () => observer.disconnect();
  }, []);

  return { fadeAnim, translateYAnim, setRef };
}
