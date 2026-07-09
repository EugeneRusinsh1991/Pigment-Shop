import React from 'react';
import { Image, View } from 'react-native';
import styles from './ProductPageStyles';

export const PRODUCT_PLACEHOLDER = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop';

export default function ProductImagePanel({ image, isWide }) {
  return (
    <View style={[styles.imageArea, isWide && styles.imageAreaWide]}>
      <Image
        source={{ uri: PRODUCT_PLACEHOLDER }}
        style={styles.prodImage}
        resizeMode="cover"
      />
    </View>
  );
}
