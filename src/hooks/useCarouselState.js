import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Platform } from 'react-native';

export function getCarouselOpacity(index, currentIndex, prevIndex, fadeAnim) {
  if (index === currentIndex && index === prevIndex) {
    return 1;
  }
  if (index === currentIndex) {
    return fadeAnim;
  }
  if (index === prevIndex) {
    return Animated.subtract(1, fadeAnim);
  }
  return 0;
}

export function useCarouselState(banners = []) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Reset index if banners shrinks or updates out of bounds
  useEffect(() => {
    if (currentIndex >= banners.length) {
      setCurrentIndex(0);
      setPrevIndex(0);
    }
  }, [banners, currentIndex]);

  const handleSwitch = useCallback((newIndex) => {
    const activeIndex = currentIndexRef.current;
    if (newIndex === activeIndex || newIndex < 0 || newIndex >= banners.length) return;
    fadeAnim.setValue(0);
    setPrevIndex(activeIndex);
    setCurrentIndex(newIndex);
  }, [banners.length, fadeAnim]);

  const startTransition = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => {
      setPrevIndex(currentIndexRef.current);
    });
  }, [fadeAnim]);

  const handleSwitchWithTransition = useCallback((newIndex) => {
    handleSwitch(newIndex);
    Promise.resolve().then(startTransition);
  }, [handleSwitch, startTransition]);

  const handlePrev = useCallback(() => {
    if (banners.length <= 1) return;
    handleSwitchWithTransition((currentIndex - 1 + banners.length) % banners.length);
  }, [handleSwitchWithTransition, currentIndex, banners.length]);

  const handleNext = useCallback(() => {
    if (banners.length <= 1) return;
    handleSwitchWithTransition((currentIndex + 1) % banners.length);
  }, [handleSwitchWithTransition, currentIndex, banners.length]);

  return {
    currentIndex,
    prevIndex,
    fadeAnim,
    handleSwitch,
    startTransition,
    handleSwitchWithTransition,
    handlePrev,
    handleNext,
  };
}
