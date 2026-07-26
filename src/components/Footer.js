import { Image, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'expo-router';
import { AnimatedButton } from './Button';
import { colors } from '../theme/tokens';

export default function Footer() {
  const { isDark } = useTheme();
  const ic = (dark, light) => (isDark ? dark : light);
  
  return (
    <View style={[styles.footer, ic(styles.footerDark, styles.footerLight)]}>
      <View style={styles.contentRow}>
        <Link href="/" asChild>
          <AnimatedButton hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Image source={require('../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
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
    paddingTop: 5,
    paddingBottom: 3,
    paddingHorizontal: 16,
    borderTopWidth: 0,
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
    columnGap: 8,
    rowGap: 4,
  },
  brandText: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 10,
    marginHorizontal: 2,
  },
  authorText: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 11,
  },
  subtextDark: {
    color: colors.textMutedLight,
  },
  subtextLight: {
    color: colors.textSubtleLight,
  },
});
