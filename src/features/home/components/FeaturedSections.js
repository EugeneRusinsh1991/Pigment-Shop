import { useEffect, useState, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Text } from '@/components/Text';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/theme/tokens';

const setElementText = (ref, text) => {
  if (!ref.current) return;
  if (Platform.OS === 'web') {
    ref.current.textContent = text;
  } else if (typeof ref.current.setNativeProps === 'function') {
    ref.current.setNativeProps({ text });
  }
};

// ─── Countdown Timer Component ──────────────────────────────────────────────

export function CountdownTimer({ isDark }) {
  const { t } = useTheme();
  const daysRef = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  useEffect(() => {
    let secondsLeft = 604800;

    const updateDisplay = () => {
      const days = Math.floor(secondsLeft / (24 * 3600));
      const hours = Math.floor((secondsLeft % (24 * 3600)) / 3600);
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      const pad = (num) => String(num).padStart(2, '0');

      setElementText(daysRef, pad(days));
      setElementText(hoursRef, pad(hours));
      setElementText(minutesRef, pad(minutes));
      setElementText(secondsRef, pad(seconds));
    };

    // Initial update
    updateDisplay();

    const interval = setInterval(() => {
      secondsLeft = secondsLeft > 0 ? secondsLeft - 1 : 604800;
      updateDisplay();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const ic = (dark, light) => (isDark ? dark : light);

  return (
    <View style={styles.compactTimerRow}>
      <Text variant="caption" style={[styles.compactTimerLabel, ic(styles.compactTimerLabelDark, styles.compactTimerLabelLight)]}>
        {t('offerEndsIn')}:
      </Text>
      <Text ref={daysRef} variant="caption" weight="bold" style={[styles.compactTimerValue, ic(styles.compactTimerValueDark, styles.compactTimerValueLight)]}>
        07
      </Text>
      <Text variant="caption" style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
        {' D '}
      </Text>
      <Text ref={hoursRef} variant="caption" weight="bold" style={[styles.compactTimerValue, ic(styles.compactTimerValueDark, styles.compactTimerValueLight)]}>
        00
      </Text>
      <Text variant="caption" style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
        {' H '}
      </Text>
      <Text ref={minutesRef} variant="caption" weight="bold" style={[styles.compactTimerValue, ic(styles.compactTimerValueDark, styles.compactTimerValueLight)]}>
        00
      </Text>
      <Text variant="caption" style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
        {' M '}
      </Text>
      <Text ref={secondsRef} variant="caption" weight="bold" style={[styles.compactTimerValue, ic(styles.compactTimerValueDark, styles.compactTimerValueLight)]}>
        00
      </Text>
      <Text variant="caption" style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
        {' S'}
      </Text>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Timer Styles
  compactTimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactTimerLabel: {
    marginRight: 6,
  },
  compactTimerLabelDark: { color: colors.textDescDark },
  compactTimerLabelLight: { color: colors.textSubtleDark },
  compactTimerValue: {},
  compactTimerValueDark: { color: colors.accent },
  compactTimerValueLight: { color: colors.accent },
  compactTimerUnit: {},
  compactTimerUnitDark: { color: colors.textDescDark },
  compactTimerUnitLight: { color: colors.textSubtleDark },

  // Card Styles
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.06)',
      },
      default: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
    }),
    elevation: 2,
  },
  cardDark: { backgroundColor: colors.secondaryDarkBg, borderColor: colors.secondaryDarkBorder },
  cardLight: { backgroundColor: colors.surfaceLight, borderColor: colors.secondaryLightBorder },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleWrap: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  title: { letterSpacing: 0.3 },
  titleDark: { color: colors.slateMid },
  titleLight: { color: colors.textStrongDark },
  subtitle: { marginTop: 4, marginRight: 24 },
  subtitleDark: { color: colors.textDescDark },
  subtitleLight: { color: colors.textSubtleDark },
  arrow: {},
  arrowDark: { color: colors.infoMid },
  arrowLight: { color: colors.purpleMid },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 10,
  },
  badgeText: { color: colors.white },
  accentBlue: { backgroundColor: colors.infoMid },
  accentPurple: { backgroundColor: colors.purpleMid },
});
