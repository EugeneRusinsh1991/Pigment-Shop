import { Heading, Text } from '@/components/ui/Text';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { colors, layout, shadows } from '@/theme/tokens';
import { useEffect, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const setElementText = (ref, text) => {
  if (!ref.current) return;
  if (Platform.OS === 'web') {
    ref.current.textContent = text;
  } else if (typeof ref.current.setNativeProps === 'function') {
    ref.current.setNativeProps({ text });
  }
};

// ─── Countdown Timer Component ──────────────────────────────────────────────

export function CountdownTimer({ isDark, showLabel = true }) {
  const { t } = useLanguage();
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
      {showLabel && (
        <Text variant="caption" style={[styles.compactTimerLabel, ic(styles.compactTimerLabelDark, styles.compactTimerLabelLight)]}>
          {t('offerEndsIn')}:
        </Text>
      )}
      <Heading level={2} ref={daysRef} style={[styles.compactTimerValue, ic(styles.compactTimerValueDark, styles.compactTimerValueLight)]}>
        07
      </Heading>
      <Heading level={2} style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
        {'d '}
      </Heading>
      <Heading level={2} ref={hoursRef} style={[styles.compactTimerValue, ic(styles.compactTimerValueDark, styles.compactTimerValueLight)]}>
        00
      </Heading>
      <Heading level={2} style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
        {'h '}
      </Heading>
      <Heading level={2} ref={minutesRef} style={[styles.compactTimerValue, ic(styles.compactTimerValueDark, styles.compactTimerValueLight)]}>
        00
      </Heading>
      <Heading level={2} style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
        {'m '}
      </Heading>
      <Heading level={2} ref={secondsRef} style={[styles.compactTimerValue, ic(styles.compactTimerValueDark, styles.compactTimerValueLight)]}>
        00
      </Heading>
      <Heading level={2} style={[styles.compactTimerUnit, ic(styles.compactTimerUnitDark, styles.compactTimerUnitLight)]}>
        {'s'}
      </Heading>
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
    marginRight: layout.spacing.xs,
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
    marginHorizontal: layout.spacing.lg,
    marginVertical: layout.spacing.sm,
    padding: layout.spacing.lg,
    borderRadius: layout.radii.md,
    borderWidth: layout.borderWidth.thin,
    ...Platform.select({
      web: shadows.cardLight.web,
      default: shadows.cardLight.native,
    }),
    elevation: layout.elevation.sm,
  },
  cardDark: { backgroundColor: colors.secondaryDarkBg, borderColor: colors.secondaryDarkBorder },
  cardLight: { backgroundColor: colors.surfaceLight, borderColor: colors.secondaryLightBorder },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleWrap: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  title: {},
  titleDark: { color: colors.slateMid },
  titleLight: { color: colors.textStrongDark },
  subtitle: { marginTop: layout.spacing.xxs, marginRight: layout.spacing.xl },
  subtitleDark: { color: colors.textDescDark },
  subtitleLight: { color: colors.textSubtleDark },
  arrow: {},
  arrowDark: { color: colors.infoMid },
  arrowLight: { color: colors.purpleMid },

  badge: {
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xxxs,
    borderRadius: layout.radii.sm,
    marginRight: layout.spacing.md,
  },
  badgeText: { color: colors.white },
  accentBlue: { backgroundColor: colors.infoMid },
  accentPurple: { backgroundColor: colors.purpleMid },
});
