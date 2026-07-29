import { useState } from 'react';
import { Modal, View, useWindowDimensions } from 'react-native';
import { Text } from '@/components/ui/Text';
import { AnimatedButton } from '@/components/ui/Button';
import { useTheme } from '../../../context/ThemeContext';
import { fromMediaRef } from '../../../media';
import MediaRenderer from '@/components/ui/Media/MediaRenderer';
import { triggerFileInput } from '../../../utils/fileInput';
import MediaBrowser from '../Media/MediaBrowser';
import styles from './BannersStyles';
import { motion } from '../../../theme/tokens';
import { useBannersWorkflow } from './useBannersWorkflow';
import { useDeleteConfirmation } from '../../../hooks/useDeleteConfirmation';
import AdminSaveFooter from '../AdminSaveFooter';

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
  const { confirmDelete, confirmationDialog } = useDeleteConfirmation();

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
      <AnimatedButton
        style={isDesktopLayout ? styles.previewContainerDesktop : styles.previewContainer}
        onPress={() => openBrowser(index)}
        activeOpacity={motion.press.activeOpacity}
      >
        {banner ? (
          <MediaRenderer uri={banner} style={styles.previewImage} resizeMode="cover" />
        ) : (
          <View style={styles.noImage}>
            <Text style={styles.noImageText}>{t('adminBannersNoImage')}</Text>
          </View>
        )}
      </AnimatedButton>

      <View style={styles.actionsCol}>
        <AnimatedButton
          style={styles.uploadBtn}
          onPress={() => triggerFileInput(`banner-image-file-input-${index}`, (uri) => handleUpdateBanner(index, uri))}
          activeOpacity={motion.press.activeOpacity}
        >
          <Text style={styles.uploadBtnText}>{t('adminBannersUploadBtn')}</Text>
        </AnimatedButton>

        <AnimatedButton
          style={styles.deleteBtn}
          onPress={() => {
            confirmDelete({
              title: t('adminBannersDeleteConfirmTitle') || 'Delete Banner',
              message: t('adminBannersDeleteConfirmMsg') || 'Are you sure you want to delete this banner?',
              onConfirm: () => handleDeleteBanner(index)
            });
          }}
          activeOpacity={motion.press.activeOpacity}
        >
          <Text style={styles.deleteBtnText}>{t('adminBannersDeleteBtn')}</Text>
        </AnimatedButton>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isDesktop ? (
        <View style={styles.desktopGrid}>
          {bannersList.map((banner, index) => renderBannerItem(banner, index, true))}

          {bannersList.length < 3 && (
            <AnimatedButton
              style={styles.addCardDesktop}
              onPress={handleAddBanner}
              activeOpacity={motion.press.activeOpacity}
            >
              <Text variant="body2" weight="semibold" style={styles.addCardBtnText}>{t('adminBannersAddBtn')}</Text>
            </AnimatedButton>
          )}
        </View>
      ) : (
        <View style={styles.card}>
          {bannersList.map((banner, index) => renderBannerItem(banner, index, false))}

          {bannersList.length < 3 && (
            <AnimatedButton style={styles.addBtn} onPress={handleAddBanner} activeOpacity={motion.press.activeOpacity}>
              <Text variant="body2" weight="semibold" style={styles.addBtnText}>{t('adminBannersAddBtn')}</Text>
            </AnimatedButton>
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

      {confirmationDialog}
    </View>
  );
}
