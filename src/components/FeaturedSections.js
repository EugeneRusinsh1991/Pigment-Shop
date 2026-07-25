import { useEffect, useState, useRef } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

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
      <Text style={[styles.compactTimerLabel, ic(styles.compactTimerLabelDark, styles.compactTimerLabelLight)]}>
        {t('offerEndsIn')}:
      </Text>
      <Text ref={daysRef} style={[styles.compactTimerValue, ic(styles.compactTimerValueDark, styles.compactTimerValueLight)]}>
        07
      </Text>
      <Text style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
        {' D '}
      </Text>
      <Text ref={hoursRef} style={[styles.compactTimerValue, ic(styles.compactTimerValueDark, styles.compactTimerValueLight)]}>
        00
      </Text>
      <Text style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
        {' H '}
      </Text>
      <Text ref={minutesRef} style={[styles.compactTimerValue, ic(styles.compactTimerValueDark, styles.compactTimerValueLight)]}>
        00
      </Text>
      <Text style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
        {' M '}
      </Text>
      <Text ref={secondsRef} style={[styles.compactTimerValue, ic(styles.compactTimerValueDark, styles.compactTimerValueLight)]}>
        00
      </Text>
      <Text style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
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
    fontSize: 13,
    fontWeight: '600',
    marginRight: 6,
  },
  compactTimerLabelDark: { color: '#94a3b8' },
  compactTimerLabelLight: { color: '#64748b' },
  compactTimerValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  compactTimerValueDark: { color: '#E31B23' },
  compactTimerValueLight: { color: '#E31B23' },
  compactTimerUnit: {
    fontSize: 13,
    fontWeight: '600',
  },
  compactTimerUnitDark: { color: '#94a3b8' },
  compactTimerUnitLight: { color: '#64748b' },

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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
    }),
    elevation: 2,
  },
  cardDark: { backgroundColor: '#1e293b', borderColor: '#334155' },
  cardLight: { backgroundColor: '#ffffff', borderColor: '#e2e8f0' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleWrap: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  title: { fontSize: 18, fontWeight: '800', letterSpacing: 0.3 },
  titleDark: { color: '#f1f5f9' },
  titleLight: { color: '#0f172a' },
  subtitle: { fontSize: 13, marginTop: 4, lineHeight: 18, marginRight: 24 },
  subtitleDark: { color: '#94a3b8' },
  subtitleLight: { color: '#64748b' },
  arrow: { fontSize: 24, fontWeight: '300' },
  arrowDark: { color: '#38bdf8' },
  arrowLight: { color: '#7c3aed' },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 10,
  },
  badgeText: { color: '#ffffff', fontSize: 10, fontWeight: '800' },
  accentBlue: { backgroundColor: '#38bdf8' },
  accentPurple: { backgroundColor: '#7c3aed' },
});
