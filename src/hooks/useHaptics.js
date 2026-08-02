import { useCallback } from 'react';
import { hapticsService } from '../services/haptics/hapticsService';

export function useHaptics() {
  const trigger = useCallback((type) => {
    hapticsService.trigger(type);
  }, []);

  return { trigger, hapticsService };
}

export default useHaptics;
