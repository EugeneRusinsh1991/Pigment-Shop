import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { fromMediaRef } from '../../../media';
import MediaRenderer from '../../Media/MediaRenderer';
import { triggerFileInput } from '../../../utils/fileInput';
import MediaBrowser from '../Media/MediaBrowser';
import styles from './BannersStyles';
import { useBannersWorkflow } from './useBannersWorkflow';
import { useDeleteConfirmation } from '../../../hooks/useDeleteConfirmation';
import AdminSaveFooter from '../shared/AdminSaveFooter';

export default function BannersManager() {
  const { t } = useTheme();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const {
    bannersList,
    handleSave,
    handleUpdateBanner,
    handleDeleteBanner,
    handleAddBanner,
    isSaving,
    isDirty,
  } = useBannersWorkflow();
  const [browserOpen, setBrowserOpen] = useState(false);
  const [activeBannerIndex, setActiveBannerIndex] = useState(null);
  const { confirmDelete } = useDeleteConfirmation();

  function openBrowser(index) {
    setActiveBannerIndex(index);
    setBrowserOpen(true);
  }

  function handleMediaSelect(item) {
    setBrowserOpen(false);
    if (activeBannerIndex !== null) {
      handleUpdateBanner(activeBannerIndex, fromMediaRef(item.path));
    }
  }

  const renderBannerItem = (banner, index, isDesktopLayout) => (
    <View key={index} style={isDesktopLayout ? styles.bannerCardDesktop : styles.bannerRow}>
      <TouchableOpacity
        style={isDesktopLayout ? styles.previewContainerDesktop : styles.previewContainer}
        onPress={() => openBrowser(index)}
        activeOpacity={0.85}
      >
        {banner ? (
          <MediaRenderer uri={banner} style={styles.previewImage} resizeMode="cover" />
        ) : (
          <View style={styles.noImage}>
            <Text style={styles.noImageText}>{t('adminBannersNoImage')}</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.actionsCol}>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => triggerFileInput(`banner-image-file-input-${index}`, (uri) => handleUpdateBanner(index, uri))}
          activeOpacity={0.8}
        >
          <Text style={styles.uploadBtnText}>{t('adminBannersUploadBtn')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            confirmDelete({
              title: t('adminBannersDeleteConfirmTitle') || 'Delete Banner',
              message: t('adminBannersDeleteConfirmMsg') || 'Are you sure you want to delete this banner?',
              onConfirm: () => handleDeleteBanner(index)
            });
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.deleteBtnText}>{t('adminBannersDeleteBtn')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isDesktop ? (
        <View style={styles.desktopGrid}>
          {bannersList.map((banner, index) => renderBannerItem(banner, index, true))}

          {bannersList.length < 3 && (
            <TouchableOpacity
              style={styles.addCardDesktop}
              onPress={handleAddBanner}
              activeOpacity={0.8}
            >
              <Text style={styles.addCardBtnText}>{t('adminBannersAddBtn')}</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.card}>
          {bannersList.map((banner, index) => renderBannerItem(banner, index, false))}

          {bannersList.length < 3 && (
            <TouchableOpacity style={styles.addBtn} onPress={handleAddBanner} activeOpacity={0.8}>
              <Text style={styles.addBtnText}>{t('adminBannersAddBtn')}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <AdminSaveFooter 
        isDirty={isDirty} 
        isSaving={isSaving} 
        onSave={handleSave} 
      />

      <MediaBrowser
        visible={browserOpen}
        category="images"
        onSelect={handleMediaSelect}
        onClose={() => setBrowserOpen(false)}
      />
    </View>
  );
}
