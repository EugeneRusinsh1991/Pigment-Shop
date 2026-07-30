import React from 'react';
import { View } from 'react-native';
import ProductThumbnailItem from './ProductThumbnailItem';
import ProductThumbnailEmptySlot from './ProductThumbnailEmptySlot';
import styles from './ProductPageStyles';

const FIXED_SLOT_INDICES = [0, 1, 2];

export default function ProductThumbnails({
  images = [],
  currentIndex = 0,
  onSelectImage,
  isDark,
  containerStyle,
}) {
  return (
    <View style={[styles.thumbnailsRowContainer, containerStyle]}>
      {FIXED_SLOT_INDICES.map((i) => {
        const imageUri = images[i];
        const hasImage = typeof imageUri === 'string' && imageUri.trim().length > 0;

        if (hasImage) {
          return (
            <ProductThumbnailItem
              key={i}
              uri={imageUri}
              index={i}
              isActive={currentIndex === i}
              onSelect={onSelectImage}
              isDark={isDark}
            />
          );
        }

        return (
          <ProductThumbnailEmptySlot
            key={i}
            slotIndex={i}
            isDark={isDark}
          />
        );
      })}
    </View>
  );
}
