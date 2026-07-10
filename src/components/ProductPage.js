import React, { useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import styles from './ProductPage/ProductPageStyles';
import ProductReviews from './ProductPage/ProductReviews';
import { useCartContext } from '../context/CartContext';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { useCatalog } from '../context/CatalogContext';
import { ProductInfoPanel, ProductImagePanel } from './ProductPage/ProductInfoPanel';

export default function ProductPage({ product: initialProduct, isDark }) {
  const [qty, setQty] = useState(1);
  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth >= 768;
  const { flatList } = useCatalog();
  const product = flatList.find((p) => p.id === initialProduct.id) || initialProduct;
  const { addItem } = useCartContext();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const { setShowCart: navSetShowCart } = useNavigation();

  const onAddToCart = (prod, prc, q) => { addItem(prod, prc, q); navSetShowCart(true); };
  const productIsFavorite = isFavorite(product.id);
  const onToggleFavorite = toggleFavorite;

  const decreaseQty = () => setQty((q) => Math.max(1, q - 1));
  const increaseQty = () => setQty((q) => Math.min(99, q + 1));

  const cols = isWide ? 4 : 2;
  const cardWidth = 250;
  const gridWidth = cols * (cardWidth + 16);

  return (
    <View style={[styles.root, isDark ? styles.rootDark : styles.rootLight]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: 'center', width: gridWidth, maxWidth: '100%' }}>
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
              isFavorite={productIsFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          </View>
          <ProductReviews product={product} isDark={isDark} />
        </View>
      </ScrollView>
    </View>
  );
}
