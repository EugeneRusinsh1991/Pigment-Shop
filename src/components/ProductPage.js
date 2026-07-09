import React, { useState } from 'react';
import { ScrollView, useWindowDimensions, View, TouchableOpacity, Text } from 'react-native';
import styles from './ProductPage/ProductPageStyles';
import ProductImagePanel from './ProductPage/ProductImagePanel';
import ProductInfoPanel from './ProductPage/ProductInfoPanel';
import ProductReviews from './ProductPage/ProductReviews';
import Breadcrumb from './Breadcrumb';

export default function ProductPage({ product, isDark, crumbs, onCrumbPress, onBack, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth >= 768;

  const decreaseQty = () => setQty((q) => Math.max(1, q - 1));
  const increaseQty = () => setQty((q) => Math.min(99, q + 1));

  const productCrumbs = [...crumbs, { label: product.label }];
  const tc = isDark ? styles.textDark : styles.textLight;
  const ph = isWide ? 32 : 16;

  const cols = isWide ? 4 : 2;
  const cardWidth = 250;
  const gridWidth = cols * (cardWidth + 16);

  return (
    <View style={[styles.root, isDark ? styles.rootDark : styles.rootLight]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: 'center', width: gridWidth, maxWidth: '100%' }}>
          <View style={{ paddingHorizontal: ph, paddingTop: 16 }}>
            <Breadcrumb stack={productCrumbs} onPress={onCrumbPress} isDark={isDark} />
          </View>

          <TouchableOpacity 
            style={{ paddingHorizontal: ph, paddingTop: 8, paddingBottom: 8, alignSelf: 'flex-start' }} 
            onPress={onBack} 
            activeOpacity={0.7}
          >
            <Text style={[{ fontSize: 14, fontWeight: '500' }, tc]}>‹ Назад</Text>
          </TouchableOpacity>

          <View style={isWide ? styles.wideRow : styles.narrowStack}>
            <ProductImagePanel image={product.image} isWide={isWide} />
            <ProductInfoPanel
              product={product}
              isDark={isDark}
              isWide={isWide}
              qty={qty}
              onDecrease={decreaseQty}
              onIncrease={increaseQty}
              onAddToCart={onAddToCart}
            />
          </View>
          <ProductReviews product={product} isDark={isDark} />
        </View>
      </ScrollView>
    </View>
  );
}
