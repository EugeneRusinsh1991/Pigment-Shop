import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getBanners, subscribe } from '../../../data/catalogState';
import { fromMediaRef, MediaRenderer } from '../../../media';
import { useAdminDomain } from '../../../services/adminDomain';
import { triggerFileInput } from '../../../utils/fileInput';
import { ImageIcon, RefreshIcon, TrashIcon, UploadIcon } from '../../Icons';
import MediaBrowser from '../Media/MediaBrowser';
import styles from './BannersStyles';

export default function BannersManager() {
  const { t } = useTheme();
  const { updateBanners, resetBannersToSeed } = useAdminDomain();
  const [bannersList, setBannersList] = useState(() => [...getBanners()]);
  const [browserOpen, setBrowserOpen] = useState(false);
  const [activeBannerIndex, setActiveBannerIndex] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  // Pick up external state changes (Firestore sync) only when there are no unsaved local edits
  useEffect(() => {
    const unsub = subscribe(() => {
      if (!isDirty) {
        setBannersList([...getBanners()]);
      }
    });
    return unsub;
  }, [isDirty]);

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

  const handleSave = async () => {
    try {
      await updateBanners(bannersList);
      setIsDirty(false);
      alert(t('adminBannersSaveSuccess'));
    } catch (err) {
      console.error(err);
      alert('Failed to save banners: ' + err.message);
    }
  };

  const handleReset = async () => {
    try {
      await resetBannersToSeed();
      setBannersList([...getBanners()]);
      setIsDirty(false);
      alert(t('adminBannersResetSuccess'));
    } catch (err) {
      console.error(err);
      alert('Failed to reset banners: ' + err.message);
    }
  };

  const handleUpdateBanner = (index, val) => {
    const updated = [...bannersList];
    updated[index] = val;
    setBannersList(updated);
    setIsDirty(true);
  };

  const handleDeleteBanner = (index) => {
    const updated = bannersList.filter((_, i) => i !== index);
    setBannersList(updated);
    setIsDirty(true);
  };

  const handleAddBanner = () => {
    if (bannersList.length >= 3) return;
    setBannersList([...bannersList, '']);
    setIsDirty(true);
  };


  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ImageIcon color="#1C1C1C" size={16} />
          <Text style={[styles.toolbarTitle, { marginLeft: 8 }]}>{t('adminBannersTitle')}</Text>
        </View>
        <TouchableOpacity style={[styles.resetBtn, { flexDirection: 'row', alignItems: 'center' }]} onPress={handleReset} activeOpacity={0.8}>
          <RefreshIcon color="#E87A8E" size={14} style={{ marginRight: 6 }} />
          <Text style={styles.resetBtnText}>{t('adminBannersResetBtn')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {bannersList.map((banner, index) => (
          <View key={index} style={styles.bannerRow}>
            <View style={styles.previewTitleRow}>
              <View style={styles.previewContainer}>
                {banner ? (
                  <MediaRenderer uri={banner} style={styles.previewImage} resizeMode="cover" />
                ) : (
                  <View style={styles.noImage}>
                    <Text style={styles.noImageText}>{t('adminBannersNoImage')}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.bannerLabel}>{t('adminBannersBannerNumber').replace('{index}', index + 1)}</Text>
            </View>
            <View style={styles.urlRow}>
              <TextInput
                style={styles.input}
                value={banner}
                onChangeText={(v) => handleUpdateBanner(index, v)}
                placeholder={t('adminBannersImagePlaceholder')}
                placeholderTextColor="#CBD5E1"
              />
            </View>
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.uploadBtn, styles.actionBtn, { flexDirection: 'row', alignItems: 'center' }]}
                onPress={() => triggerFileInput(`banner-image-file-input-${index}`, (uri) => handleUpdateBanner(index, uri))}
                activeOpacity={0.8}
              >
                <UploadIcon color="#E87A8E" size={14} style={{ marginRight: 6 }} />
                <Text style={styles.uploadBtnText}>{t('adminBannersUploadBtn')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.uploadBtn, styles.actionBtn, { flexDirection: 'row', alignItems: 'center' }]}
                onPress={() => openBrowser(index)}
                activeOpacity={0.8}
              >
                <ImageIcon color="#475569" size={14} style={{ marginRight: 6 }} />
                <Text style={styles.uploadBtnText}>Browse</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.deleteBtn, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]} onPress={() => handleDeleteBanner(index)}>
              <TrashIcon color="#EF4444" size={14} style={{ marginRight: 6 }} />
              <Text style={styles.deleteBtnText}>{t('adminBannersDeleteBtn')}</Text>
            </TouchableOpacity>
          </View>
        ))}

        {bannersList.length < 3 && (
          <TouchableOpacity style={styles.addBtn} onPress={handleAddBanner} activeOpacity={0.8}>
            <Text style={styles.addBtnText}>{t('adminBannersAddBtn')}</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
        <Text style={styles.saveBtnText}>{t('adminBannersSaveBtn')}</Text>
      </TouchableOpacity>

      <MediaBrowser
        visible={browserOpen}
        category="images"
        onSelect={handleMediaSelect}
        onClose={() => setBrowserOpen(false)}
      />
    </View>
  );
}
