/**
 * usePriceRangeSlider.js
 *
 * Encapsulates pan responder logic for the price range slider.
 * Handles drag gestures for min and max handles with value constraints.
 */
import { useRef } from 'react';
import { PanResponder } from 'react-native';

export default function useSliderPanResponders(minLimit, maxLimit, trackWidthRef, minRef, maxRef, startVal, onChange) {
  const minPanRef = useRef(null);
  if (!minPanRef.current) {
    minPanRef.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startVal.current = minRef.current;
      },
      onPanResponderMove: (e, gestureState) => {
        if (!trackWidthRef.current) return;
        const deltaPct = gestureState.dx / trackWidthRef.current;
        const deltaVal = deltaPct * (maxLimit - minLimit);
        let nextVal = Math.round(startVal.current + deltaVal);
        nextVal = Math.max(minLimit, Math.min(nextVal, maxRef.current - 100));
        onChange(nextVal, maxRef.current);
      },
    });
  }

  const maxPanRef = useRef(null);
  if (!maxPanRef.current) {
    maxPanRef.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startVal.current = maxRef.current;
      },
      onPanResponderMove: (e, gestureState) => {
        if (!trackWidthRef.current) return;
        const deltaPct = gestureState.dx / trackWidthRef.current;
        const deltaVal = deltaPct * (maxLimit - minLimit);
        let nextVal = Math.round(startVal.current + deltaVal);
        nextVal = Math.max(minRef.current + 100, Math.min(nextVal, maxLimit));
        onChange(minRef.current, nextVal);
      },
    });
  }

  return { handleMinPan: minPanRef.current, handleMaxPan: maxPanRef.current };
}
