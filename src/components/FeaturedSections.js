import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// ─── Countdown Timer Component ──────────────────────────────────────────────

export function CountdownTimer({ isDark, t }) {
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
    <View style={[styles.timerContainer, ic(styles.timerContainerDark, styles.timerContainerLight)]}>
      <Text style={[styles.timerLabel, ic(styles.timerLabelDark, styles.timerLabelLight)]}>
        {t.offerEndsIn || 'Offer Ends In'}
      </Text>
      <View style={styles.timeRow}>
        <TimeBox value={timeData.days} label={t.days || 'days'} isDark={isDark} />
        <Text style={[styles.colon, ic(styles.colonDark, styles.colonLight)]}>:</Text>
        <TimeBox value={timeData.hours} label={t.hours || 'hours'} isDark={isDark} />
        <Text style={[styles.colon, ic(styles.colonDark, styles.colonLight)]}>:</Text>
        <TimeBox value={timeData.minutes} label={t.mins || 'mins'} isDark={isDark} />
        <Text style={[styles.colon, ic(styles.colonDark, styles.colonLight)]}>:</Text>
        <TimeBox value={timeData.seconds} label={t.secs || 'secs'} isDark={isDark} />
      </View>
    </View>
  );
}

function TimeBox({ value, label, isDark }) {
  const ic = (dark, light) => (isDark ? dark : light);
  return (
    <View style={styles.timeBoxContainer}>
      <View style={[styles.timeBox, ic(styles.timeBoxDark, styles.timeBoxLight)]}>
        <Text style={[styles.timeValue, ic(styles.timeValueDark, styles.timeValueLight)]}>
          {value}
        </Text>
      </View>
      <Text style={[styles.timeLabelSub, ic(styles.timeLabelSubDark, styles.timeLabelSubLight)]}>
        {label}
      </Text>
    </View>
  );
}

// ─── Featured Section Card ──────────────────────────────────────────────────

export function FeaturedCard({ title, subtitle, badge, onPress, isDark, colorTheme }) {
  const ic = (dark, light) => (isDark ? dark : light);
  const themeAccent = colorTheme === 'blue' ? styles.accentBlue : styles.accentPurple;

  return (
    <TouchableOpacity
      style={[styles.card, ic(styles.cardDark, styles.cardLight)]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleWrap}>
          {badge && (
            <View style={[styles.badge, themeAccent]}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
          <Text style={[styles.title, ic(styles.titleDark, styles.titleLight)]}>
            {title}
          </Text>
        </View>
        <Text style={[styles.arrow, ic(styles.arrowDark, styles.arrowLight)]}>›</Text>
      </View>
      <Text style={[styles.subtitle, ic(styles.subtitleDark, styles.subtitleLight)]}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Timer Styles
  timerContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  timerContainerDark: { backgroundColor: '#1e293b', borderColor: '#334155' },
  timerContainerLight: { backgroundColor: '#ffffff', borderColor: '#e2e8f0' },
  timerLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  timerLabelDark: { color: '#64748b' },
  timerLabelLight: { color: '#94a3b8' },
  timeRow: { flexDirection: 'row', alignItems: 'center' },
  colon: { fontSize: 20, fontWeight: '700', marginHorizontal: 6, marginTop: -14 },
  colonDark: { color: '#38bdf8' },
  colonLight: { color: '#7c3aed' },

  timeBoxContainer: { alignItems: 'center' },
  timeBox: {
    width: 46,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  timeBoxDark: { backgroundColor: '#0f172a', borderColor: '#334155' },
  timeBoxLight: { backgroundColor: '#f1f5f9', borderColor: '#e2e8f0' },
  timeValue: { fontSize: 18, fontWeight: '800', letterSpacing: 0.5 },
  timeValueDark: { color: '#38bdf8' },
  timeValueLight: { color: '#7c3aed' },
  timeLabelSub: { fontSize: 9, fontWeight: '600', textTransform: 'uppercase', marginTop: 4, letterSpacing: 0.5 },
  timeLabelSubDark: { color: '#475569' },
  timeLabelSubLight: { color: '#94a3b8' },

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
