import { useEffect, useRef } from 'react';
import { useCarouselState } from '@/hooks/useCarouselState';

const AUTO_ADVANCE_MS = 5000;

export function useCarouselData(banners) {
  const safeBanners = banners || [];
  const {
    currentIndex,
    prevIndex,
    fadeAnim,
    handleSwitchWithTransition,
    handlePrev,
    handleNext,
  } = useCarouselState(safeBanners);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Auto-advance uses the animated switch so transitions stay smooth.
  // Reset the timer after every change so manual switches and automatic rotation stay in sync.
  useEffect(() => {
    if (safeBanners.length <= 1) return;

    const timer = setTimeout(() => {
      handleSwitchWithTransition((currentIndexRef.current + 1) % safeBanners.length);
    }, AUTO_ADVANCE_MS);

    return () => clearTimeout(timer);
  }, [currentIndex, safeBanners.length, handleSwitchWithTransition]);

  return {
    currentIndex,
    prevIndex,
    fadeAnim,
    handleSwitch: handleSwitchWithTransition,
    handlePrev,
    handleNext,
    hasMultiple: safeBanners.length > 1,
    banners: safeBanners,
  };
}
