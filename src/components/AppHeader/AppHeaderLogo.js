import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './AppHeaderStyles';

function getLogoStyles(isDark, isMobile) {
  const theme = isDark
    ? { badge: styles.betaBadgeDark, badgeText: styles.betaTextDark }
    : { badge: styles.betaBadgeLight, badgeText: styles.betaTextLight };
  const mobile = isMobile
    ? { gap: { gap: -6 }, logo: { fontSize: 18 }, badge: { paddingHorizontal: 8, paddingVertical: 3 }, badgeText: { fontSize: 11 } }
    : {};

  return {
    leftSec: [styles.leftSec, mobile.gap],
    menuText: [styles.menuBtnText, { fontSize: 24 }],
    logoText: [styles.logo, mobile.logo],
    betaBadge: [styles.betaBadge, theme.badge, mobile.badge],
    betaText: [styles.betaText, theme.badgeText, mobile.badgeText],
  };
}


export default function AppHeaderLogo({ isDark, appName, isMobile, onMenuPress, onHome, theme }) {
  const s = getLogoStyles(isDark, isMobile);
  return (
    <View style={s.leftSec}>
      {isMobile && (
        <TouchableOpacity style={styles.menuBtn} onPress={onMenuPress}>
          <Text style={[s.menuText, theme.textColor]}>☰</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onHome} activeOpacity={0.8}>
        <View style={styles.logoWrapper}>
          <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
          <View style={s.betaBadge}>
            <Text style={s.betaText}>Beta</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
