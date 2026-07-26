import { Image, View } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '@/components/Text';
import Button, { IconButton } from '@/components/Button';
import { calculateHitSlop } from '@/theme/buttonCommon';
import styles from './AppHeaderStyles';

const MOBILE_GAP = -6;
const DESKTOP_MARGIN_LEFT = -24;

function getLogoStyles(isMobile) {
  const mobile = isMobile
    ? { gap: { gap: MOBILE_GAP } }
    : {};

  const desktopLogoStyle = isMobile
    ? {}
    : { marginLeft: DESKTOP_MARGIN_LEFT };

  return {
    leftSec: [styles.leftSec, mobile.gap],
    menuText: [styles.menuBtnText],
    logoText: [styles.logo],
    logoContainer: desktopLogoStyle,
  };
}


export default function AppHeaderLogo({ isDark, appName, isMobile, onMenuPress, theme }) {
  const computedStyles = getLogoStyles(isMobile);
  return (
    <View style={computedStyles.leftSec}>
      {isMobile && (
        <IconButton
          icon={<Text size={24} lineHeight={24}>☰</Text>}
          onPress={onMenuPress}
          size={44}
          variant="transparent"
        />
      )}
      <Link href="/" asChild>
        <Button
          variant="unstyled"
          hitSlop={calculateHitSlop(140, 32)}
          accessibilityRole="link"
        >
          <View style={[styles.logoWrapper, computedStyles.logoContainer]}>
            <Image source={require('../../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
          </View>
        </Button>
      </Link>
    </View>
  );
}
