import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useCartContext } from '../context/CartContext';
import { useCatalog } from '../context/CatalogContext';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNavigation } from '../context/NavigationContext';
import useGridLayout from '../hooks/useGridLayout';
import PageNavigation from './PageNavigation';
import { ProductImagePanel } from './ProductPage/ProductImagePanel';
import { ProductInfoPanel } from './ProductPage/ProductInfoPanel';
import styles from './ProductPage/ProductPageStyles';
import ProductReviews from './ProductPage/ProductReviews';
import SharedLayoutWrapper from './SharedLayoutWrapper';

function useProductActions(product) {
  const { addItem } = useCartContext();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  return {
    onAddToCart: (prod, prc, q) => addItem(prod, prc, q),
    isFavorite: isFavorite(product.id),
    onToggleFavorite: toggleFavorite,
  };
}

export default function ProductPage({ product: initialProduct, isDark, showNavigation = true }) {
  const [qty, setQty] = useState(1);
  const { flatList } = useCatalog();
  const product = flatList.find((p) => p.id === initialProduct.id) || initialProduct;
  const { isWide, gridWidth } = useGridLayout();
  const { crumbs, handleCrumbPress, handleBackPress } = useNavigation();
  const { onAddToCart, isFavorite: productIsFavorite, onToggleFavorite } = useProductActions(product);

  const decreaseQty = () => setQty((q) => Math.max(1, q - 1));
  const increaseQty = () => setQty((q) => Math.min(99, q + 1));

  return (
    <SharedLayoutWrapper isDark={isDark}>
      <View style={[styles.root, isDark ? styles.rootDark : styles.rootLight]}>
        <View style={{ alignSelf: 'center', width: gridWidth, maxWidth: '100%' }}>
          {showNavigation && (
            <PageNavigation
              isDark={isDark}
              crumbs={crumbs}
              onCrumbPress={handleCrumbPress}
              onBack={handleBackPress}
              showBack={true}
              showBreadcrumbs={true}
            />
          )}
        </View>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={{ alignSelf: 'center', width: gridWidth, maxWidth: '100%' }}>
            <View style={isWide ? styles.wideRow : styles.narrowStack}>
              <ProductImagePanel
                product={product}
                isWide={isWide}
                isDark={isDark}
                isFavorite={productIsFavorite}
                onToggleFavorite={onToggleFavorite}
              />
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
    </SharedLayoutWrapper>
  );
}
