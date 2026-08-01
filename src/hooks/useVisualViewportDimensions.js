import { useState, useEffect } from 'react';
import { useWindowDimensions, Platform } from 'react-native';

export function useVisualViewportDimensions() {
  const windowDimensions = useWindowDimensions();
  const [viewportDimensions, setViewportDimensions] = useState(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.visualViewport) {
      return {
        width: window.visualViewport.width,
        height: window.visualViewport.height,
        offsetTop: window.visualViewport.offsetTop,
        scale: window.visualViewport.scale,
      };
    }
    return {
      width: windowDimensions.width,
      height: windowDimensions.height,
      offsetTop: 0,
      scale: 1,
    };
  });

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined' || !window.visualViewport) {
      setViewportDimensions({
        width: windowDimensions.width,
        height: windowDimensions.height,
        offsetTop: 0,
        scale: 1,
      });
      return;
    }

    const vv = window.visualViewport;

    const handleResize = () => {
      setViewportDimensions({
        width: vv.width,
        height: vv.height,
        offsetTop: vv.offsetTop,
        scale: vv.scale,
      });
    };

    vv.addEventListener('resize', handleResize);
    vv.addEventListener('scroll', handleResize);
    handleResize();

    return () => {
      vv.removeEventListener('resize', handleResize);
      vv.removeEventListener('scroll', handleResize);
    };
  }, [windowDimensions.width, windowDimensions.height]);

  return viewportDimensions;
}

export default useVisualViewportDimensions;
