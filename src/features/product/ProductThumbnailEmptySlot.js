import React from 'react';
import { View } from 'react-native';
import styles from './ProductPageStyles';
import { ImageIcon } from '../../components/Icons';
import { colors } from '../../theme/tokens';

export default function ProductThumbnailEmptySlot({ slotIndex, isDark }) {
  const iconColor = isDark ? colors.secondaryDarkText : colors.secondaryLightText;

  return (
    <View
      style={[
        styles.thumbnailSlot,
        isDark ? styles.thumbnailSlotDark : styles.thumbnailSlotLight,
        styles.thumbnailEmptySlot,
        isDark ? styles.thumbnailEmptySlotDark : styles.thumbnailEmptySlotLight,
      ]}
      pointerEvents="none"
      accessibilityLabel={`Empty image slot ${slotIndex + 1}`}
    >
      <ImageIcon color={iconColor} size={20} opacity={0.4} />
    </View>
  );
}
