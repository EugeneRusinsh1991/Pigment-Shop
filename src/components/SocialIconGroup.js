import { Linking, Platform, StyleSheet, View } from 'react-native';
import { Button } from './ui/Button';
import { colors, iconTokens, layout } from '../theme/tokens';
import { Text as RNText } from 'react-native';

const styles = StyleSheet.create({
  group: {
    flexDirection: 'column',
    gap: layout.spacing.md,
    width: '100%',
  },
  svgInline: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});

function InstagramIcon({ color, size = 20 }) {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox={iconTokens.viewBox} fill={iconTokens.fillNone} stroke={color} strokeWidth={iconTokens.strokeWidth.default} strokeLinecap="round" strokeLinejoin="round" style={styles.svgInline}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
      </svg>
    );
  }
  return <RNText>{'📷'}</RNText>;
}

function TelegramIcon({ color, size = 20 }) {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox={iconTokens.viewBox} fill={iconTokens.fillNone} stroke={color} strokeWidth={iconTokens.strokeWidth.default} strokeLinecap="round" strokeLinejoin="round" style={styles.svgInline}>
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    );
  }
  return <RNText>{'✈️'}</RNText>;
}

const CHANNELS = [
  {
    key: 'instagram',
    labelKey: 'contactUsInstagram',
    url: 'https://instagram.com',
    icon: (isDark) => <InstagramIcon color={colors.instagramPink} size={18} />,
    color: colors.instagramPink,
  },
  {
    key: 'telegram',
    labelKey: 'contactUsTelegram',
    url: 'https://t.me',
    icon: (isDark) => <TelegramIcon color={colors.telegramBlue} size={18} />,
    color: colors.telegramBlue,
  },
];

export default function SocialIconGroup({ t, isDark, style }) {
  const borderColor = isDark ? colors.borderDark : colors.borderLight;
  const backgroundColor = isDark ? colors.surfaceDark : colors.surfaceLight;

  return (
    <View style={[styles.group, style]}>
      {CHANNELS.map((channel) => (
        <Button
          key={channel.key}
          title={t(channel.labelKey)}
          onPress={() => Linking.openURL(channel.url)}
          variant="outline"
          size="lg"
          leftIcon={channel.icon(isDark)}
          style={{ borderColor, backgroundColor }}
          textStyle={{ color: channel.color }}
        />
      ))}
    </View>
  );
}
