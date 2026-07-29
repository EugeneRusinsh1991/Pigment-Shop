/**
 * PriceRangeSlider.js
 *
 * A custom React Native double-handle range slider.
 * Uses PanResponder and relative dx to calculate value shifts dynamically,
 * which ensures complete compatibility across Web and Mobile targets.
 */
import { useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import useSliderPanResponders from '../../hooks/usePriceRangeSlider';
import { colors, layout } from '../../theme/tokens';

function SliderTrackContent({ trackWidth, minPercent, maxPercent, activeColor, isDark, handleMinPan, handleMaxPan }) {
  if (trackWidth <= 0) return null;
  const bg = isDark ? colors.dark : colors.white;

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

  const activeColor = colors.accent;
  const inactiveColor = isDark ? colors.borderDark : colors.warmNeutralSoft;

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
    marginVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.xs,
    width: '100%',
  },
  track: {
    height: 4,
    borderRadius: layout.radii.xxxs,
    position: 'relative',
    justifyContent: 'center',
  },
  activeRange: {
    height: 4,
    borderRadius: layout.radii.xxxs,
    position: 'absolute',
  },
  handle: {
    width: 20,
    height: 20,
    borderRadius: layout.radii.full,
    borderWidth: layout.borderWidth.thick,
    position: 'absolute',
    top: -8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});
