import { Image, View } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '@/components/Text';
import Button, { IconButton } from '@/components/Button';
import { calculateHitSlop } from '@/theme/buttonCommon';
import { layout, typography } from '@/theme/tokens';
import styles from './AppHeaderStyles';

const MOBILE_GAP = -layout.spacing.xs;
const DESKTOP_MARGIN_LEFT = -layout.spacing.xl;

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
          icon={<Text size={typography.sizes.xl} lineHeight={typography.sizes.xl}>☰</Text>}
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
