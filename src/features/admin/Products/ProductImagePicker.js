import React, { useState } from 'react';
import { View } from 'react-native';
import { AnimatedButton } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { UploadIcon, TrashIcon } from '@/components/Icons';
import { useLanguage } from '../../../context/LanguageContext';
import { fromMediaRef } from '../../../media';
import MediaRenderer from '@/components/ui/Media/MediaRenderer';
import { triggerFileUpload } from '../../../utils/fileInput';
import MediaBrowser from '../Media/MediaBrowser';
import { colors, motion } from '../../../theme/tokens';
import styles from './ProductFormStyles';

function ProductImageSlot({
  slotKey,
  index,
  value,
  required,
  error,
  onChange,
  onOpenBrowser,
}) {
  const { t } = useLanguage();

  const handleUpload = () => {
    triggerFileUpload(
      `prod-img-${slotKey}`,
      (url) => onChange(slotKey, url),
      { folder: 'products' }
    );
  };

  const handleDelete = () => {
    onChange(slotKey, '');
  };

  const slotTitle = `${t('adminProductsFormImageSlot') || t('adminProductsFormImage')} ${index}${required ? ' *' : ''}`;

  return (
    <View style={[styles.imageSlotCard, error && styles.imageSlotCardError]}>
      <View style={styles.imageSlotHeader}>
        <Text variant="caption" style={styles.imageSlotLabel}>
          {slotTitle}
        </Text>
      </View>

      <AnimatedButton
        style={styles.imageSlotPreview}
        onPress={() => onOpenBrowser(slotKey)}
        activeOpacity={motion.press.activeOpacity}
      >
        {value ? (
          <MediaRenderer uri={value} style={styles.imageSlotPreviewImg} resizeMode="cover" />
        ) : (
          <View style={styles.imageSlotPlaceholder}>
            <Text variant="caption" style={styles.imageSlotPlaceholderText}>
              {t('adminProductsNoImage') || t('adminBannersNoImage')}
            </Text>
          </View>
        )}
      </AnimatedButton>

      <View style={styles.imageSlotActions}>
        <AnimatedButton
          style={styles.imageSlotUploadBtn}
          onPress={handleUpload}
          activeOpacity={motion.press.activeOpacity}
        >
          <UploadIcon color={colors.white} size={12} />
          <Text variant="label" style={styles.imageSlotUploadText}>
            {t('adminBannersUploadBtn')}
          </Text>
        </AnimatedButton>

        {!!value && (
          <AnimatedButton
            style={styles.imageSlotDeleteBtn}
            onPress={handleDelete}
            activeOpacity={motion.press.activeOpacity}
            haptic="warning"
          >
            <TrashIcon color={colors.white} size={12} />
            <Text variant="label" style={styles.imageSlotDeleteText}>
              {t('adminBannersDeleteBtn')}
            </Text>
          </AnimatedButton>
        )}
      </View>

      {error && (
        <Text variant="caption" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
}

export default function ProductImagePicker({ form, onChange, errors = {} }) {
  const [browserOpen, setBrowserOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);

  const handleOpenBrowser = (slotKey) => {
    setActiveSlot(slotKey);
    setBrowserOpen(true);
  };

  const handleMediaSelect = (item) => {
    setBrowserOpen(false);
    if (activeSlot) {
      onChange(activeSlot, fromMediaRef(item.path));
    }
  };

  return (
    <View style={styles.imagePickerContainer}>
      <View style={styles.imageSlotsRow}>
        <ProductImageSlot
          slotKey="image1"
          index={1}
          value={form.image1}
          required
          error={errors.image1}
          onChange={onChange}
          onOpenBrowser={handleOpenBrowser}
        />
        <ProductImageSlot
          slotKey="image2"
          index={2}
          value={form.image2}
          error={errors.image2}
          onChange={onChange}
          onOpenBrowser={handleOpenBrowser}
        />
        <ProductImageSlot
          slotKey="image3"
          index={3}
          value={form.image3}
          error={errors.image3}
          onChange={onChange}
          onOpenBrowser={handleOpenBrowser}
        />
      </View>

      <MediaBrowser
        visible={browserOpen}
        category="images"
        onSelect={handleMediaSelect}
        onClose={() => setBrowserOpen(false)}
      />
    </View>
  );
}
