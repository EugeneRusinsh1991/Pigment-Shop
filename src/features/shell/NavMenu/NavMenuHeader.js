import { Image, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BackArrowIcon, CrossIcon } from '../../../components/Icons';
import IconButton from '../../../components/IconButton';
import AnimatedButton from '../../../components/AnimatedButton';
import { ACCENT_COLOR } from './constants';
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
        icon={<BackArrowIcon color={isDark ? '#f1f5f9' : '#0f172a'} size={18} />}
      />
      
      {view === 'catalog' || view === 'contact' ? (
        <Text style={[styles.panelTitle, isDark ? styles.textDark : styles.textLight]}>
          {title}
        </Text>
      ) : (
        <AnimatedButton onPress={handleLogoPress}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </AnimatedButton>
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
