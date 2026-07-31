import { Platform, StyleSheet, Text as RNText, View } from 'react-native';
import { Heading, Text } from '../../components/ui/Text';
import ContactDetailItem from '../../components/ContactDetailItem';
import SocialIconGroup from '../../components/SocialIconGroup';
import { colors, iconTokens, layout } from '../../theme/tokens';

const styles = StyleSheet.create({
  section: {
    gap: layout.spacing.xl,
  },
  detailList: {
    gap: layout.spacing.xs,
  },
  divider: {
    height: layout.borderWidth.thin,
    marginVertical: layout.spacing.md,
  },
  headline: {
    marginBottom: layout.spacing.xs,
  },
  svgInline: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});

function PhoneIcon({ color, size = 18 }) {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox={iconTokens.viewBox} fill={iconTokens.fillNone} stroke={color} strokeWidth={iconTokens.strokeWidth.default} strokeLinecap="round" strokeLinejoin="round" style={styles.svgInline}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }
  return <RNText>{'📞'}</RNText>;
}

function MailIcon({ color, size = 18 }) {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox={iconTokens.viewBox} fill={iconTokens.fillNone} stroke={color} strokeWidth={iconTokens.strokeWidth.default} strokeLinecap="round" strokeLinejoin="round" style={styles.svgInline}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );
  }
  return <RNText>{'✉'}</RNText>;
}

function MapPinIcon({ color, size = 18 }) {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox={iconTokens.viewBox} fill={iconTokens.fillNone} stroke={color} strokeWidth={iconTokens.strokeWidth.default} strokeLinecap="round" strokeLinejoin="round" style={styles.svgInline}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }
  return <RNText>{'📍'}</RNText>;
}

export default function ContactInfoSection({ t, isDark }) {
  const accentColor = colors.accent;
  const borderColor = isDark ? colors.borderDark : colors.borderLight;

  const details = [
    {
      key: 'phone',
      icon: <PhoneIcon color={accentColor} size={18} />,
      label: t('contactPhone'),
      value: t('contactPhoneValue'),
      href: `tel:${t('contactPhoneValue').replace(/\s/g, '')}`,
    },
    {
      key: 'email',
      icon: <MailIcon color={accentColor} size={18} />,
      label: t('contactEmail'),
      value: t('contactEmailValue'),
      href: `mailto:${t('contactEmailValue')}`,
    },
    {
      key: 'address',
      icon: <MapPinIcon color={accentColor} size={18} />,
      label: t('contactAddress'),
      value: t('contactAddressValue'),
    },
  ];

  return (
    <View style={styles.section}>
      <View>
        <Heading level={2} isDark={isDark} style={styles.headline}>
          {t('contactInfoHeadline')}
        </Heading>
        <Text variant="body2" isDark={isDark} color="muted">
          {t('contactInfoDesc')}
        </Text>
      </View>

      <View style={styles.detailList}>
        {details.map((item) => (
          <ContactDetailItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            value={item.value}
            href={item.href}
            isDark={isDark}
          />
        ))}
      </View>

      <View style={[styles.divider, { backgroundColor: borderColor }]} />

      <SocialIconGroup t={t} isDark={isDark} />
    </View>
  );
}
