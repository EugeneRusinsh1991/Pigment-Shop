import { Image, View } from 'react-native';
import { Text } from '../../../components/ui/Text/Text';
import { useRouter } from 'expo-router';
import { BackArrowIcon, CrossIcon } from '../../../components/Icons';
import Button, { IconButton } from '../../../components/ui/Button';
import { calculateHitSlop } from '../../../theme/buttonCommon';
import { ACCENT_COLOR } from './constants';
import { colors } from '../../../theme/tokens';
import styles from './NavMenuStyles';

export default function NavMenuHeader({ isDark, onBackClick, onClose, view, title }) {
  const router = useRouter();

  const handleLogoPress = () => {
    if (onClose) onClose();
    router.push('/');
  };

  return (
    <View style={[styles.panelHeader, isDark ? styles.panelHeaderDark : styles.panelHeaderLight]}>
      <IconButton
        onPress={onBackClick}
        style={styles.headerLeftBtn}
        isDark={isDark}
        icon={<BackArrowIcon color={isDark ? colors.slateMid : colors.navTextDark} size={18} />}
      />
      
      {view === 'catalog' || view === 'contact' ? (
        <Text variant="subtitle1" weight="600" style={[styles.panelTitle, isDark ? styles.textDark : styles.textLight]}>
          {title}
        </Text>
      ) : (
        <Button
          variant="unstyled"
          hitSlop={calculateHitSlop(140, 32)}
          accessibilityRole="link"
          onPress={handleLogoPress}
        >
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Button>
      )}

      <IconButton
        onPress={onClose}
        style={styles.closeBtn}
        isDark={isDark}
        icon={<CrossIcon color={ACCENT_COLOR} size={16} />}
      />
    </View>
  );
}
