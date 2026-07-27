import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Text/Text';
import { Link } from 'expo-router';
import Button, { IconButton } from '@/components/Button';
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
        icon={<Text variant="body1" style={[styles.menuBtnText, theme?.textColor]}>☰</Text>}
        onPress={onMenuPress}
        size="md"
        variant="transparent"
      />
      <Link href="/" asChild>
        <Button
          variant="ghost"
          size="sm"
          title={t('navHome')}
          style={styles.navLink}
          textStyle={[styles.navLinkText, theme.subtextColor]}
        />
      </Link>
      <Link href="/catalog" asChild>
        <Button
          variant="ghost"
          size="sm"
          title={t('navCatalog')}
          style={styles.navLink}
          textStyle={[styles.navLinkText, theme.textColor]}
        />
      </Link>
      <Link href="/products" asChild>
        <Button
          variant="ghost"
          size="sm"
          title={t('navAllProducts')}
          style={styles.navLink}
          textStyle={[styles.navLinkText, theme.textColor]}
        />
      </Link>
      <Link href="/contact" asChild>
        <Button
          variant="ghost"
          size="sm"
          title={t('navContactUs')}
          style={styles.navLink}
          textStyle={[styles.navLinkText, theme.textColor]}
        />
      </Link>
    </View>
  );
}
