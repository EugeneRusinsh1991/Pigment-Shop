import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'expo-router';
import AnimatedButton from './AnimatedButton';
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
        <Text style={[styles.separator, ic(styles.subtextDark, styles.subtextLight)]}>•</Text>
        <Text style={[styles.authorText, ic(styles.subtextDark, styles.subtextLight)]}>Made by Noren Vox ©</Text>
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
    backgroundColor: '#0D0D0D',
    borderTopColor: '#242424',
  },
  footerLight: {
    backgroundColor: '#FAF8F6',
    borderTopColor: '#f1e8e4',
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
    color: '#E31B23',
  },
  logoImage: {
    width: 80,
    height: 17,
  },
  textDark: {
    color: '#FFFFFF',
  },
  textLight: {
    color: '#1C1C1C',
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
    color: '#6B7280',
  },
  subtextLight: {
    color: '#9CA3AF',
  },
});
