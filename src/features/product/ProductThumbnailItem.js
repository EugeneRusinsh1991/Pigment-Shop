import React from 'react';
import { View } from 'react-native';
import MediaRenderer from '../../components/ui/Media/MediaRenderer';
import { AnimatedButton } from '../../components/ui/Button';
import styles from './ProductPageStyles';

export default function ProductThumbnailItem({ uri, index, isActive, onSelect, isDark }) {
  const handlePress = () => {
    if (onSelect) {
      onSelect(index);
    }
  };

  return (
    <AnimatedButton
      style={[
        styles.thumbnailSlot,
        isDark ? styles.thumbnailSlotDark : styles.thumbnailSlotLight,
      ]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`Select product image ${index + 1}`}
    >
      <MediaRenderer uri={uri} style={styles.imageFill} resizeMode="cover" />
      {isActive && <View style={styles.thumbnailActiveIndicator} />}
    </AnimatedButton>
  );
}
