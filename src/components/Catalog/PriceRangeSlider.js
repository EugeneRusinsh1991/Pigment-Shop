/**
 * PriceRangeSlider.js
 *
 * A custom React Native double-handle range slider.
 * Uses PanResponder and relative dx to calculate value shifts dynamically,
 * which ensures complete compatibility across Web and Mobile targets.
 */
import React, { useState, useRef } from 'react';
import { Platform, View, PanResponder, StyleSheet } from 'react-native';

function useSliderPanResponders(minLimit, maxLimit, trackWidthRef, minRef, maxRef, startVal, onChange) {
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

function SliderTrackContent({ trackWidth, minPercent, maxPercent, activeColor, isDark, handleMinPan, handleMaxPan }) {
  if (trackWidth <= 0) return null;
  const bg = isDark ? '#1C1C1C' : '#FFFFFF';

  return (
    <>
      <View
        style={[
          styles.activeRange,
          {
            left: `${minPercent * 100}%`,
            width: `${(maxPercent - minPercent) * 100}%`,
            backgroundColor: activeColor,
          },
        ]}
      />
      <View
        {...handleMinPan.panHandlers}
        style={[
          styles.handle,
          {
            left: trackWidth * minPercent - 10,
            borderColor: activeColor,
            backgroundColor: bg,
          },
        ]}
      />
      <View
        {...handleMaxPan.panHandlers}
        style={[
          styles.handle,
          {
            left: trackWidth * maxPercent - 10,
            borderColor: activeColor,
            backgroundColor: bg,
          },
        ]}
      />
    </>
  );
}

export default function PriceRangeSlider({
  minValue,
  maxValue,
  minLimit = 0,
  maxLimit = 5000,
  onChange,
  isDark,
}) {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackWidthRef = useRef(0);
  const minRef = useRef(minValue);
  const maxRef = useRef(maxValue);
  const startVal = useRef(0);

  trackWidthRef.current = trackWidth;
  minRef.current = minValue;
  maxRef.current = maxValue;

  const minPercent = maxLimit === minLimit ? 0 : (minValue - minLimit) / (maxLimit - minLimit);
  const maxPercent = maxLimit === minLimit ? 0 : (maxValue - minLimit) / (maxLimit - minLimit);

  const { handleMinPan, handleMaxPan } = useSliderPanResponders(
    minLimit,
    maxLimit,
    trackWidthRef,
    minRef,
    maxRef,
    startVal,
    onChange
  );

  const activeColor = '#E31B23';
  const inactiveColor = isDark ? '#242424' : '#e5d8d3';

  return (
    <View style={styles.container}>
      <View
        style={[styles.track, { backgroundColor: inactiveColor }]}
        onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
      >
        <SliderTrackContent
          trackWidth={trackWidth}
          minPercent={minPercent}
          maxPercent={maxPercent}
          activeColor={activeColor}
          isDark={isDark}
          handleMinPan={handleMinPan}
          handleMaxPan={handleMaxPan}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    justifyContent: 'center',
    marginVertical: 8,
    paddingHorizontal: 10,
    width: '100%',
  },
  track: {
    height: 4,
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  activeRange: {
    height: 4,
    borderRadius: 2,
    position: 'absolute',
  },
  handle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    position: 'absolute',
    top: -8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});
