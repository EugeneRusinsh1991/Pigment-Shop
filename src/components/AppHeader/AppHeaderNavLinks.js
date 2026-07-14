import { Text, TouchableOpacity, View } from 'react-native';
import styles from './AppHeaderStyles';

export default function AppHeaderNavLinks({
  isMobile,
  onMenuPress,
  onHome,
  onCatalogPress,
  onAllProductsPress,
  theme,
  t,
}) {
  if (isMobile) return null;

  return (
    <View style={styles.centerSec}>
      <TouchableOpacity style={styles.menuBtn} onPress={onMenuPress}>
        <Text style={[styles.menuBtnText, theme.textColor]}>☰</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navLink} onPress={onHome}>
        <Text style={[styles.navLinkText, theme.subtextColor]}>{t('navHome')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navLink} onPress={onCatalogPress}>
        <Text style={[styles.navLinkText, theme.textColor]}>{t('navCatalog')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navLink} onPress={onAllProductsPress}>
        <Text style={[styles.navLinkText, theme.textColor]}>{t('navAllProducts')}</Text>
      </TouchableOpacity>
    </View>
  );
}
