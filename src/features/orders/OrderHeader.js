import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScrollFadeUp from '../../components/ScrollFadeUp';
import commonStyles from '../../theme/commonStyles';

export default function OrderHeader({ isDark, t }) {
  const textStyle = isDark ? commonStyles.textDark : commonStyles.textLight;
  const subtextStyle = isDark ? commonStyles.subtextDark : commonStyles.subtextLight;

  return (
    <ScrollFadeUp style={styles.headerSection}>
      <View style={[styles.checkmarkCircle, isDark ? styles.checkmarkCircleDark : styles.checkmarkCircleLight]}>
        <Text style={[styles.checkmarkIcon, isDark ? { color: '#34D399' } : { color: '#059669' }]}>✓</Text>
      </View>
      <Text style={[styles.title, textStyle]}>
        {t('orderConfirmationThankYou')}
      </Text>
      <Text style={[styles.subtitle, subtextStyle]}>
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
  checkmarkIcon: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    maxWidth: 400,
    lineHeight: 20,
  },
});
