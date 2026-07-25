import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { IconButton } from '@/components/Button';
import { AnimatedButton } from '@/components/Button';
import { useLanguage } from '../../../context/LanguageContext';
import styles from './AppHeaderStyles';

export default function AppHeaderNavLinks({
  isMobile,
  onMenuPress,
  onHome,
  onCatalogPress,
  onAllProductsPress,
  onContactPress,
  theme,
  t: propT,
}) {
  const { t: langT } = useLanguage();
  const t = propT || langT;
  if (isMobile) return null;

  return (
    <View style={styles.centerSec}>
      <IconButton
        icon={<Text style={[styles.menuBtnText, theme?.textColor]}>☰</Text>}
        onPress={onMenuPress}
        size="md"
        variant="transparent"
      />
      <Link href="/" asChild>
        <AnimatedButton style={styles.navLink}>
          <Text style={[styles.navLinkText, theme.subtextColor]}>{t('navHome')}</Text>
        </AnimatedButton>
      </Link>
      <Link href="/catalog" asChild>
        <AnimatedButton style={styles.navLink}>
          <Text style={[styles.navLinkText, theme.textColor]}>{t('navCatalog')}</Text>
        </AnimatedButton>
      </Link>
      <Link href="/products" asChild>
        <AnimatedButton style={styles.navLink}>
          <Text style={[styles.navLinkText, theme.textColor]}>{t('navAllProducts')}</Text>
        </AnimatedButton>
      </Link>
      <Link href="/contact" asChild>
        <AnimatedButton style={styles.navLink}>
          <Text style={[styles.navLinkText, theme.textColor]}>{t('navContactUs')}</Text>
        </AnimatedButton>
      </Link>
    </View>
  );
}
