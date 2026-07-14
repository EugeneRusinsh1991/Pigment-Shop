import { Image, StyleSheet, Text, View } from 'react-native';

export default function Footer({ isDark }) {
  const ic = (dark, light) => (isDark ? dark : light);
  
  return (
    <View style={[styles.footer, ic(styles.footerDark, styles.footerLight)]}>
      <View style={styles.contentRow}>
          <Image source={require('../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
        <View style={[styles.betaBadge, ic(styles.betaBadgeDark, styles.betaBadgeLight)]}>
          <Text style={[styles.betaText, ic(styles.betaTextDark, styles.betaTextLight)]}>Beta</Text>
        </View>
        <Text style={[styles.separator, ic(styles.subtextDark, styles.subtextLight)]}>•</Text>
        <Text style={[styles.authorText, ic(styles.subtextDark, styles.subtextLight)]}>Made by Noren Vox ©</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 16,
    borderTopWidth: 1,
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
    width: 160,
    height: 34,
  },
  betaBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1.5,
    marginLeft: -8,
  },
  betaBadgeDark: {
    backgroundColor: '#1F1315',
    borderColor: '#451A20',
  },
  betaBadgeLight: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  betaText: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 13,
    fontWeight: '700',
  },
  betaTextDark: {
    color: '#E31B23',
  },
  betaTextLight: {
    color: '#E31B23',
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
