import { Image, View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Link } from 'expo-router';
import { AnimatedButton } from '@/components/ui/Button';
import { layout } from '@/theme/tokens';
import styles from './FooterStyles';
import { useFooterTheme } from './useFooterTheme';

export default function Footer({ isDark: isDarkProp }) {
  const { containerStyle } = useFooterTheme({ isDarkProp });

  return (
    <View style={containerStyle}>
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


