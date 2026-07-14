/**
 * PriceRangeSlider.js
 *
 * A custom React Native double-handle range slider.
 * Uses PanResponder and relative dx to calculate value shifts dynamically,
 * which ensures complete compatibility across Web and Mobile targets.
 */
import React, { useState, useRef } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';

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

  trackWidthRef.current = trackWidth;
  minRef.current = minValue;
  maxRef.current = maxValue;

  const startVal = useRef(0);

  const getPercent = (value) => {
    if (maxLimit === minLimit) return 0;
    return (value - minLimit) / (maxLimit - minLimit);
  };

  const getValue = (percent) => {
    return Math.round(minLimit + percent * (maxLimit - minLimit));
  };

  const minPercent = getPercent(minValue);
  const maxPercent = getPercent(maxValue);

  const handleMinPan = useRef(
    PanResponder.create({
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
    })
  ).current;

  const handleMaxPan = useRef(
    PanResponder.create({
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
    })
  ).current;

  const activeColor = '#E31B23';
  const inactiveColor = isDark ? '#242424' : '#e5d8d3';

  return (
    <View style={styles.container}>
      <View
        style={[styles.track, { backgroundColor: inactiveColor }]}
        onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
      >
        {trackWidth > 0 && (
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
        )}
        {trackWidth > 0 && (
          <>
            <View
              {...handleMinPan.panHandlers}
              style={[
                styles.handle,
                {
                  left: trackWidth * minPercent - 10,
                  borderColor: activeColor,
                  backgroundColor: isDark ? '#1C1C1C' : '#FFFFFF',
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
                  backgroundColor: isDark ? '#1C1C1C' : '#FFFFFF',
                },
              ]}
            />
          </>
        )}
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
    maxWidth: '100%',
    alignSelf: 'flex-start',
  },
  track: {
    height: 4,
    borderRadius: 2,
    position: 'relative',
  },
  activeRange: {
    position: 'absolute',
    height: '100%',
    borderRadius: 2,
  },
  handle: {
    position: 'absolute',
    top: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
    // @ts-ignore
    cursor: 'pointer',
  },
});
