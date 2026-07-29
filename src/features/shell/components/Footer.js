import { Image, StyleSheet, View } from 'react-native';
import { Text } from '@/components/Text';
import { useTheme } from '@/context/ThemeContext';
import { Link } from 'expo-router';
import { AnimatedButton } from '@/components/Button';
import { colors, layout } from '@/theme/tokens';

export default function Footer() {
  const { isDark } = useTheme();
  const ic = (dark, light) => (isDark ? dark : light);
  
  return (
    <View style={[styles.footer, ic(styles.footerDark, styles.footerLight)]}>
      <View style={styles.contentRow}>
        <Link href="/" asChild>
          <AnimatedButton hitSlop={{ top: layout.spacing.md, bottom: layout.spacing.md, left: layout.spacing.md, right: layout.spacing.md }}>
            <Image source={require('../../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
          </AnimatedButton>
        </Link>
        <Text variant="caption" color="muted" style={styles.separator}>•</Text>
        <Text variant="caption" color="muted" style={styles.authorText}>Made by Noren Vox ©</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingTop: layout.spacing.xs,
    paddingBottom: layout.spacing.xxs,
    paddingHorizontal: layout.spacing.lg,
    borderTopWidth: layout.borderWidth.none,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerDark: {
    backgroundColor: colors.backgroundDark,
    borderTopColor: colors.borderDarkAlt,
  },
  footerLight: {
    backgroundColor: colors.backgroundLight,
    borderTopColor: colors.borderLightAlt,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    columnGap: layout.spacing.sm,
    rowGap: layout.spacing.xxs,
  },
  brandText: {
    color: colors.accent,
  },
  logoImage: {
    width: 80,
    height: 17,
  },
  textDark: {
    color: colors.textDark,
  },
  textLight: {
    color: colors.textLight,
  },
  separator: {
    marginHorizontal: layout.spacing.xxs / 2,
  },
  authorText: {},
  subtextDark: {
    color: colors.textMutedLight,
  },
  subtextLight: {
    color: colors.textSubtleLight,
  },
});

