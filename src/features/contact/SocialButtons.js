import React from 'react';
import { Platform, Text, Linking } from 'react-native';
import styles from './ContactPageStyles';
import Button from '../../components/Button';
import ScrollFadeUp from '../../components/ScrollFadeUp';
import { colors } from '../../theme/tokens';

const INSTAGRAM_URL = 'https://instagram.com';
const TELEGRAM_URL = 'https://t.me';

function InstagramIcon({ color, size = 20 }) {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
      </svg>
    );
  }
  return <Text style={{ color, fontSize: size }}>📷</Text>;
}

function TelegramIcon({ color, size = 20 }) {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    );
  }
  return <Text style={{ color, fontSize: size }}>✈️</Text>;
}

function getSocialItemStyle(isMobile, contentWidth) {
  const maxWidth = isMobile ? contentWidth : 500;
  return { alignSelf: 'center', width: '100%', maxWidth };
}

export default function SocialButtons({ t, isMobile, contentWidth, ic, isDark }) {
  const socialRowStyle = [
    styles.socialRow,
    isMobile && { alignSelf: 'center', width: '100%', maxWidth: contentWidth }
  ];

  const socialItemStyle = getSocialItemStyle(isMobile, contentWidth);
  const buttonTheme = {
    borderColor: isDark ? colors.borderDark : colors.borderLight,
    backgroundColor: isDark ? colors.surfaceDark : colors.surfaceLight,
  };

  return (
    <ScrollFadeUp style={socialRowStyle}>
      <Button
        title={t('contactUsInstagram')}
        onPress={() => Linking.openURL(INSTAGRAM_URL)}
        variant="outline"
        size="lg"
        leftIcon={<InstagramIcon color={colors.instagramPink} size={18} />}
        style={[socialItemStyle, buttonTheme]}
        textStyle={{ color: colors.instagramPink, fontSize: 15, fontWeight: '500' }}
      />

      <Button
        title={t('contactUsTelegram')}
        onPress={() => Linking.openURL(TELEGRAM_URL)}
        variant="outline"
        size="lg"
        leftIcon={<TelegramIcon color={colors.telegramBlue} size={18} />}
        style={[socialItemStyle, buttonTheme]}
        textStyle={{ color: colors.telegramBlue, fontSize: 15, fontWeight: '500' }}
      />
    </ScrollFadeUp>
  );
}
