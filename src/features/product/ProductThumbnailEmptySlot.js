import React from 'react';
import { View } from 'react-native';
import styles from './ProductPageStyles';

export default function ProductThumbnailEmptySlot({ slotIndex, isDark }) {
  return (
    <View
      style={[
        styles.thumbnailSlot,
        isDark ? styles.thumbnailSlotDark : styles.thumbnailSlotLight,
        { pointerEvents: 'none' },
      ]}
      accessibilityLabel={`Empty image slot ${slotIndex + 1}`}
    />
  );
}

