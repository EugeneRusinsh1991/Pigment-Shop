import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// ─── Countdown Timer Component ──────────────────────────────────────────────

export function CountdownTimer({ isDark }) {
  const { t } = useTheme();
  // 7 days in seconds = 7 * 24 * 60 * 60 = 604,800
  const [secondsLeft, setSecondsLeft] = useState(604800);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 604800));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const days = Math.floor(secondsLeft / (24 * 3600));
    const hours = Math.floor((secondsLeft % (24 * 3600)) / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    const pad = (num) => String(num).padStart(2, '0');

    return {
      days: pad(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
    };
  };

  const timeData = formatTime();
  const ic = (dark, light) => (isDark ? dark : light);

  return (
    <View style={styles.compactTimerRow}>
      <Text style={[styles.compactTimerLabel, ic(styles.compactTimerLabelDark, styles.compactTimerLabelLight)]}>
        {t('offerEndsIn')}:
      </Text>
      <Text style={[styles.compactTimerValue, ic(styles.compactTimerValueDark, styles.compactTimerValueLight)]}>
        {timeData.days}
        <Text style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
          {t('days')}{' '}
        </Text>
        {timeData.hours}
        <Text style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
          {t('hours')}{' '}
        </Text>
        {timeData.minutes}
        <Text style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
          {t('mins')}{' '}
        </Text>
        {timeData.seconds}
        <Text style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
          {t('secs')}
        </Text>
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
  compactTimerValueDark: { color: '#38bdf8' },
  compactTimerValueLight: { color: '#7c3aed' },
  compactTimerUnit: {
    fontSize: 11,
    fontWeight: '500',
  },
  compactTimerUnitDark: { color: '#64748b' },
  compactTimerUnitLight: { color: '#94a3b8' },

  // Card Styles
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
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
