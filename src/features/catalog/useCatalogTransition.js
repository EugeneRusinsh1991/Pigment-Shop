import { useState, useEffect } from 'react';

export function useCatalogTransition(showPromotionalSections, showHeroBanner) {
  const [isTransitionReady, setIsTransitionReady] = useState(false);

  useEffect(() => {
    if (!showPromotionalSections && !showHeroBanner) {
      setIsTransitionReady(true);
      return;
    }
    setIsTransitionReady(false);
    const timer = setTimeout(() => {
      setIsTransitionReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [showPromotionalSections, showHeroBanner]);

  return isTransitionReady;
}
