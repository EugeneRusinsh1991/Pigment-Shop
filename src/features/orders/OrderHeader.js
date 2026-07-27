import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Heading } from '../../components/Text';
import { ScrollFadeUp } from '../../components/Motion';
import { colors, layout } from '../../theme/tokens';

export default function OrderHeader({ isDark, t }) {
  return (
    <ScrollFadeUp style={styles.headerSection}>
      <View style={[styles.checkmarkCircle, isDark ? styles.checkmarkCircleDark : styles.checkmarkCircleLight]}>
        <Text variant="h3" weight="bold" color={isDark ? 'info' : 'success'}>✓</Text>
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
  checkmarkCircle: {
    width: 64,
    height: 64,
    borderRadius: layout.radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: layout.spacing.lg,
  },
  checkmarkCircleDark: {
    backgroundColor: colors.successSoftDarkBg,
  },
  checkmarkCircleLight: {
    backgroundColor: colors.successBgMid,
  },
  title: {
    marginBottom: layout.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 400,
  },
});
