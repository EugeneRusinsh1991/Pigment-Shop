/**
 * MediaBrowser.js
 *
 * Admin-facing modal for browsing and selecting local & Cloudinary media assets.
 * Groups assets by type (Images / GIFs / Videos) and allows single selection.
 * Synchronizes live with Cloudinary on open and manual refresh.
 *
 * Props:
 *   visible    boolean    – controls modal visibility
 *   onSelect   function   – called with a MediaItem when the user confirms selection
 *   onClose    function   – called when the modal is dismissed without selection
 *   category   string?    – pre-selects a tab ('images' | 'gifs' | 'videos')
 */
import React, { useState, useEffect } from 'react';
import { listAllMedia, fetchLiveMediaList, MEDIA_CATEGORY, isManifestGenerated } from '../../../media';
import { FormModalLayout } from '../SharedFormComponents';
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      loadMedia();
    }
  }, [visible]);

  async function loadMedia() {
    setIsLoading(true);
    try {
      const media = await fetchLiveMediaList();
      if (media && (media.images?.length || media.gifs?.length || media.videos?.length)) {
        setAllMedia(media);
        setManifestReady(true);
      } else {
        setAllMedia(listAllMedia());
        setManifestReady(isManifestGenerated());
      }
    } catch (err) {
      setAllMedia(listAllMedia());
      setManifestReady(isManifestGenerated());
    } finally {
      setIsLoading(false);
    }
  }

  function handleRefresh() {
    setSelectedItem(null);
    loadMedia();
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

  const modalStyles = {
    modalOverlay: styles.overlay,
    modalCard: styles.card,
  };

  const currentItems = allMedia[activeTab] ?? [];

  return (
    <FormModalLayout
      visible={visible}
      onClose={handleClose}
      styles={modalStyles}
      cardWidth={600}
      footer={
        <BrowserFooter
          selectedItem={selectedItem}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      }
    >
      <BrowserHeader onRefresh={handleRefresh} onClose={handleClose} loading={isLoading} />
      {!manifestReady && !isLoading && <OutdatedBanner />}
      <BrowserTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <BrowserBody
        currentItems={currentItems}
        manifestReady={manifestReady}
        selectedItem={selectedItem}
        onSelectItem={setSelectedItem}
        loading={isLoading}
      />
    </FormModalLayout>
  );
}
