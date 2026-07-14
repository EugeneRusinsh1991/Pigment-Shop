import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function useCarouselState(banners = [], intervalMs = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Reset index if banners shrinks or updates out of bounds
  useEffect(() => {
    if (currentIndex >= banners.length) {
      setCurrentIndex(0);
      setPrevIndex(0);
    }
  }, [banners, currentIndex]);

  const handleSwitch = (newIndex) => {
    if (newIndex === currentIndex || newIndex < 0 || newIndex >= banners.length) return;
    setPrevIndex(currentIndex);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (currentIndex !== prevIndex) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setPrevIndex(currentIndex);
      });
    }
  }, [currentIndex, prevIndex, fadeAnim]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      handleSwitch(nextIndex);
    }, intervalMs); // Auto-advance every intervalMs ms
    return () => clearInterval(interval);
  }, [currentIndex, banners.length, intervalMs]);

  return {
    currentIndex,
    prevIndex,
    fadeAnim,
    handleSwitch,
  };
}
