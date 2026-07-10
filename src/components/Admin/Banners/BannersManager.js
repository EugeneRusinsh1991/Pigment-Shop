import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { getBanners, setBanners, resetBanners } from '../../../data/catalogState';
import styles from './BannersStyles';
import { triggerFileInput } from '../../../utils/fileInput';
import { ImageIcon, RefreshIcon, UploadIcon, TrashIcon } from '../../Icons';
import { useTheme } from '../../../context/ThemeContext';

export default function BannersManager() {
  const { t } = useTheme();
  const [bannersList, setBannersList] = useState(() => [...getBanners()]);

  const handleSave = () => {
    // Save to the store
    setBanners(bannersList);
    alert(t('adminBannersSaveSuccess'));
  };

  const handleReset = () => {
    resetBanners();
    setBannersList([...getBanners()]);
    alert(t('adminBannersResetSuccess'));
  };

  const handleUpdateBanner = (index, val) => {
    const updated = [...bannersList];
    updated[index] = val;
    setBannersList(updated);
  };

  const handleDeleteBanner = (index) => {
    const updated = bannersList.filter((_, i) => i !== index);
    setBannersList(updated);
  };

  const handleAddBanner = () => {
    if (bannersList.length >= 3) return;
    setBannersList([...bannersList, '']);
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
            <View style={styles.previewContainer}>
              {banner ? (
                <Image source={{ uri: banner }} style={styles.previewImage} resizeMode="cover" />
              ) : (
                <View style={styles.noImage}>
                  <Text style={styles.noImageText}>{t('adminBannersNoImage')}</Text>
                </View>
              )}
            </View>
            <View style={styles.fieldsContainer}>
              <Text style={styles.bannerLabel}>{t('adminBannersBannerNumber').replace('{index}', index + 1)}</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  value={banner}
                  onChangeText={(v) => handleUpdateBanner(index, v)}
                  placeholder={t('adminBannersImagePlaceholder')}
                  placeholderTextColor="#CBD5E1"
                />
                <TouchableOpacity
                  style={[styles.uploadBtn, { flexDirection: 'row', alignItems: 'center' }]}
                  onPress={() => triggerFileInput(`banner-image-file-input-${index}`, (uri) => handleUpdateBanner(index, uri))}
                  activeOpacity={0.8}
                >
                  <UploadIcon color="#E87A8E" size={14} style={{ marginRight: 6 }} />
                  <Text style={styles.uploadBtnText}>{t('adminBannersUploadBtn')}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={[styles.deleteBtn, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]} onPress={() => handleDeleteBanner(index)}>
                <TrashIcon color="#EF4444" size={14} style={{ marginRight: 6 }} />
                <Text style={styles.deleteBtnText}>{t('adminBannersDeleteBtn')}</Text>
              </TouchableOpacity>
            </View>
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
    </View>
  );
}
