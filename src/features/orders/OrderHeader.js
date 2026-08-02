import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Heading } from '../../components/ui/Text';
import { ScrollFadeUp } from '../../components/ui/Motion';
import { colors, layout, primitives } from '../../theme/tokens';
import { CheckIcon } from '../../components/Icons/ControlIcons';

export default function OrderHeader({ isDark, t }) {
  return (
    <ScrollFadeUp style={styles.headerSection}>
      <View style={[styles.checkmarkOuter, isDark ? styles.checkmarkOuterDark : styles.checkmarkOuterLight]}>
        <View style={[styles.checkmarkCircle, isDark ? styles.checkmarkCircleDark : styles.checkmarkCircleLight]}>
          <CheckIcon size={28} color={isDark ? primitives.green[400] : primitives.green[600]} />
        </View>
      </View>
      <Heading level={2} style={styles.title}>
        {t('orderConfirmationThankYou')}
      </Heading>
      <Text variant="body1" color="muted" style={styles.subtitle}>
        {t('cartSuccessMsg')}
      </Text>
    </ScrollFadeUp>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: layout.spacing.xl,
    textAlign: 'center',
  },
  checkmarkOuter: {
    width: 76,
    height: 76,
    borderRadius: layout.radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: layout.spacing.lg,
    padding: layout.spacing.xxs,
  },
  checkmarkOuterLight: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  checkmarkOuterDark: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  checkmarkCircle: {
    width: 60,
    height: 60,
    borderRadius: layout.radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: layout.borderWidth.thin,
  },
  checkmarkCircleDark: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  checkmarkCircleLight: {
    backgroundColor: primitives.green[100],
    borderColor: primitives.green[200],
  },
  title: {
    marginBottom: layout.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 420,
  },
});

