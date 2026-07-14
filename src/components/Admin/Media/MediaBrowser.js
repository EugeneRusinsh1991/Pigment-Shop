/**
 * MediaBrowser.js
 *
 * Admin-facing modal for browsing and selecting local media assets.
 * Groups assets by type (Images / GIFs / Videos) and allows single selection.
 *
 * How it stays current:
 *   1. Run `npm run generate-media` in the terminal after adding/removing files.
 *   2. Metro Fast Refresh auto-updates the browser in seconds.
 *   3. Press "Refresh" to manually re-read the (already Fast-Refreshed) manifest.
 *
 * Props:
 *   visible    boolean    – controls modal visibility
 *   onSelect   function   – called with a MediaItem when the user confirms selection
 *   onClose    function   – called when the modal is dismissed without selection
 *   category   string?    – pre-selects a tab ('images' | 'gifs' | 'videos')
 */
import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import { listAllMedia, MEDIA_CATEGORY, isManifestGenerated } from '../../../media';
import {
  OutdatedBanner,
  BrowserHeader,
  BrowserTabs,
  BrowserBody,
  BrowserFooter
} from './MediaBrowserComponents';
import styles from './MediaBrowserStyles';

export default function MediaBrowser({ visible, onSelect, onClose, category }) {
  const [activeTab, setActiveTab] = useState(category ?? MEDIA_CATEGORY.IMAGES);
  const [selectedItem, setSelectedItem] = useState(null);
  const [allMedia, setAllMedia] = useState(() => listAllMedia());
  const [manifestReady, setManifestReady] = useState(() => isManifestGenerated());

  const currentItems = allMedia[activeTab] ?? [];

  function handleRefresh() {
    setAllMedia(listAllMedia());
    setManifestReady(isManifestGenerated());
    setSelectedItem(null);
  }

  function handleConfirm() {
    if (selectedItem) {
      onSelect(selectedItem);
      setSelectedItem(null);
    }
  }

  function handleClose() {
    setSelectedItem(null);
    onClose();
  }

  function handleTabChange(key) {
    setActiveTab(key);
    setSelectedItem(null);
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <BrowserHeader onRefresh={handleRefresh} onClose={handleClose} />
          {!manifestReady && <OutdatedBanner />}
          <BrowserTabs activeTab={activeTab} onTabChange={handleTabChange} />
          <BrowserBody
            currentItems={currentItems}
            manifestReady={manifestReady}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
          />
          <BrowserFooter
            selectedItem={selectedItem}
            onClose={handleClose}
            onConfirm={handleConfirm}
          />
        </View>
      </View>
    </Modal>
  );
}
