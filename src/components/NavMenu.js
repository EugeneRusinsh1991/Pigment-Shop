import React from 'react';
import { Modal, Pressable, ScrollView } from 'react-native';
import styles from './NavMenu/NavMenuStyles';
import NavPanelHeader from './NavMenu/NavPanelHeader';
import NavUtilActions from './NavMenu/NavUtilActions';
import NavItemList from './NavMenu/NavItemList';

/**
 * NavMenu — slide-in navigation panel displayed over existing content.
 */
export default function NavMenu({ visible, onClose, items, onSelectItem, canGoBack, onBack, onHome, isDark }) {
  const handleSelect = (item) => { onSelectItem(item); onClose(); };
  const handleBack = () => { onBack(); onClose(); };
  const handleHome = () => { onHome(); onClose(); };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose}>
        <Pressable
          style={[styles.panel, isDark ? styles.panelDark : styles.panelLight]}
          onPress={(e) => e.stopPropagation()}
        >
          <NavPanelHeader isDark={isDark} onClose={onClose} />
          <ScrollView style={styles.itemList} showsVerticalScrollIndicator={false}>
            <NavUtilActions isDark={isDark} canGoBack={canGoBack} onBack={handleBack} onHome={handleHome} />
            <NavItemList items={items} isDark={isDark} onSelect={handleSelect} />
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
