import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CrossIcon } from './Icons';
import { ACCENT_COLOR } from './NavMenu/constants';
import LanguageSelector from './NavMenu/LanguageSelector';
import NavItemList from './NavMenu/NavItemList';
import styles from './NavMenu/NavMenuStyles';
import NavUtilActions from './NavMenu/NavUtilActions';

function NavMenuHeader({ isDark, onClose, title }) {
  return (
    <View style={[styles.panelHeader, isDark ? styles.panelHeaderDark : styles.panelHeaderLight]}>
      <Text style={[styles.panelTitle, isDark ? styles.textDark : styles.textLight]}>
        {title}
      </Text>
      <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
        <CrossIcon color={ACCENT_COLOR} size={16} />
      </TouchableOpacity>
    </View>
  );
}

export default function NavMenu({
  visible,
  onClose,
  mainItems,
  categoryItems,
  onSelectItem,
  canGoBack,
  onBack,
  isDark,
  onAdminPress,
  onSelectLanguage,
  lang,
  onToggleTheme,
}) {
  const { t } = useTheme();
  
  const handleSelect = (item) => {
    onSelectItem(item);
    if (!item.children?.length) {
      onClose();
    }
  };

  const showDivider = !!onSelectLanguage;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose}>
        <Pressable
          style={[styles.panel, isDark ? styles.panelDark : styles.panelLight]}
          onPress={(e) => e.stopPropagation()}
        >
          <NavMenuHeader isDark={isDark} onClose={onClose} title={t('navMenuTitle')} />
          <ScrollView style={styles.itemList} showsVerticalScrollIndicator={false}>
            <NavUtilActions isDark={isDark} canGoBack={canGoBack} onBack={onBack} t={t} />
            <NavItemList
              items={mainItems}
              isDark={isDark}
              accentLabels
              onSelect={handleSelect}
            />
            <View style={[styles.sectionSeparator, isDark ? styles.dividerDark : styles.dividerLight]} />
            <Text style={[styles.sectionHeading, isDark ? styles.textDark : styles.textLight]}>
              {t('categories')}
            </Text>
            <NavItemList
              items={categoryItems}
              isDark={isDark}
              onSelect={handleSelect}
            />

            {showDivider && (
              <View style={[styles.divider, isDark ? styles.dividerDark : styles.dividerLight, { marginVertical: 12 }]} />
            )}

            <LanguageSelector
              isDark={isDark}
              lang={lang}
              onSelectLanguage={onSelectLanguage}
              onToggleTheme={onToggleTheme}
            />
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
