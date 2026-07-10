import React from 'react';
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './NavMenu/NavMenuStyles';
import NavItemList from './NavMenu/NavItemList';
import { useTheme } from '../context/ThemeContext';

function NavPanelHeader({ isDark, onClose, t }) {
  return (
    <View style={[styles.panelHeader, isDark ? styles.panelHeaderDark : styles.panelHeaderLight]}>
      <Text style={[styles.panelTitle, isDark ? styles.textDark : styles.textLight]}>
        {t('navMenuTitle')}
      </Text>
      <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
        <Text style={[styles.closeIcon, isDark ? styles.accentDark : styles.accentLight]}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

function NavUtilActions({ isDark, canGoBack, onBack, onHome, t }) {
  const rowStyle = [styles.utilRow, isDark ? styles.utilRowDark : styles.utilRowLight];
  const labelStyle = [styles.utilLabel, isDark ? styles.accentDark : styles.accentLight];

  return (
    <>
      {canGoBack && (
        <TouchableOpacity style={rowStyle} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.utilIcon}>‹</Text>
          <Text style={labelStyle}>{t('btnBack')}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={rowStyle} onPress={onHome} activeOpacity={0.7}>
        <Text style={styles.utilIcon}>🏠</Text>
        <Text style={labelStyle}>{t('btnHome')}</Text>
      </TouchableOpacity>
    </>
  );
}

/**
 * NavMenu — slide-in navigation panel displayed over existing content.
 */
export default function NavMenu({ visible, onClose, items, onSelectItem, canGoBack, onBack, onHome, isDark }) {
  const { t } = useTheme();
  const handleSelect = (item) => { 
    onSelectItem(item); 
    if (!item.children?.length) {
      onClose();
    }
  };
  const handleBack = () => { onBack(); };
  const handleHome = () => { onHome(); };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose}>
        <Pressable
          style={[styles.panel, isDark ? styles.panelDark : styles.panelLight]}
          onPress={(e) => e.stopPropagation()}
        >
          <NavPanelHeader isDark={isDark} onClose={onClose} t={t} />
          <ScrollView style={styles.itemList} showsVerticalScrollIndicator={false}>
            <NavUtilActions isDark={isDark} canGoBack={canGoBack} onBack={handleBack} onHome={handleHome} t={t} />
            <NavItemList items={items} isDark={isDark} onSelect={handleSelect} />
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

