import { useState, useEffect } from 'react';

function getDeviceType(windowWidth) {
  if (windowWidth >= 1024) return 'desktop';
  if (windowWidth >= 768) return 'tablet';
  return 'mobile';
}

function getLayoutConfig(device) {
  switch (device) {
    case 'desktop':
      return { cols: 5, cardWidth: 250, cardMargin: 8 };
    case 'tablet':
      return { cols: 3, cardWidth: 220, cardMargin: 8 };
    case 'mobile':
    default:
      return { cols: 2, cardWidth: 165, cardMargin: 4 };
  }
}

export default function useGridLayout() {
  // Инициализируем ширину текущим размером окна (или значением по умолчанию для SSR)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const device = getDeviceType(windowWidth);
  const { cols, cardWidth, cardMargin } = getLayoutConfig(device);

  const gridWidth = cols * (cardWidth + cardMargin * 2);
  const isWide = device !== 'mobile';

  return { isWide, cols, cardWidth, cardMargin, gridWidth };
}
