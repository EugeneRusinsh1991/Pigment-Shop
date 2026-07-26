import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Heading } from '../../components/Text';
import ScrollFadeUp from '../../components/ScrollFadeUp';

export default function OrderHeader({ isDark, t }) {
  return (
    <ScrollFadeUp style={styles.headerSection}>
      <View style={[styles.checkmarkCircle, isDark ? styles.checkmarkCircleDark : styles.checkmarkCircleLight]}>
        <Text variant="title" weight="heavy" color={isDark ? 'info' : 'success'}>✓</Text>
      </View>
      <Heading level={2} style={styles.title}>
        {t('orderConfirmationThankYou')}
      </Heading>
      <Text variant="body" color="muted" style={styles.subtitle}>
        {t('cartSuccessMsg')}
      </Text>
    </ScrollFadeUp>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    textAlign: 'center',
  },
  checkmarkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  checkmarkCircleDark: {
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
  },
  checkmarkCircleLight: {
    backgroundColor: '#D1FAE5',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 400,
  },
});
