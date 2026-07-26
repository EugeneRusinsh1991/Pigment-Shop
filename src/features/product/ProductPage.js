import { useState, useMemo, useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useCartContext } from '../../context/CartContext';
import { useCatalog } from '../../context/CatalogContext';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import useGridLayout from '../../hooks/useGridLayout';
import { PageNavigation } from '@/components/Navigation';
import { ProductImagePanel } from './ProductImagePanel';
import { ProductInfoPanel } from './ProductInfoPanel';
import styles from './ProductPageStyles';
import ProductReviews from './ProductReviews';
import Footer from '../../components/Footer';
import ScrollFadeUp from '../../components/ScrollFadeUp';
import { useTheme } from '../../context/ThemeContext';

function useProductActions(product) {
  const { addItem } = useCartContext();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  return {
    onAddToCart: (prod, q) => addItem(prod, prod?.price, q),
    isFavorite: product ? isFavorite(product.id) : false,
    onToggleFavorite: toggleFavorite,
  };
}

function ProductPageHeader({ showNavigation, gridWidth, isDark, onBack, showBreadcrumbs = true }) {
  if (!showNavigation) return null;
  return (
    <View style={{ alignSelf: 'center', width: gridWidth, maxWidth: '100%' }}>
      <PageNavigation
        isDark={isDark}
        onBack={onBack}
        showBack={true}
        showBreadcrumbs={showBreadcrumbs}
      />
    </View>
  );
}

import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { getAccountName, useReviewsState } from './ProductReviewSubcomponents';

function ProductDetails({ product, isWide, isDark, qty, onDecreaseQty, onIncreaseQty, onAddToCart, isFavorite, onToggleFavorite, reviewsState }) {
  return (
    <View style={isWide ? styles.wideRow : styles.narrowStack}>
      <ProductImagePanel
        product={product}
        isWide={isWide}
        isDark={isDark}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
      />
      <ProductInfoPanel
        product={product}
        isDark={isDark}
        isWide={isWide}
        qty={qty}
        onDecrease={onDecreaseQty}
        onIncrease={onIncreaseQty}
        onAddToCart={onAddToCart}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        reviewsState={reviewsState}
      />
    </View>
  );
}

function resolveProduct(initialProduct, flatList) {
  if (!initialProduct) return null;
  return flatList.find((p) => p.id === initialProduct.id) || initialProduct;
}

function useBackHandler(onBack, router) {
  return useCallback(() => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  }, [onBack, router]);
}

function useProductPageState({ initialProduct, onBack, isFromAllProductsProp }) {
  const [qty, setQty] = useState(1);
  const { flatList = [] } = useCatalog() || {};
  const { isAuthenticated, user } = useAuth();
  const { profile } = useProfile(user);
  const { isWide, gridWidth } = useGridLayout();
  const router = useRouter();
  const params = useLocalSearchParams();

  const isFromAllProducts = isFromAllProductsProp ?? (params?.from === 'all' || params?.isFromAllProducts === 'true');
  const handleBackPress = useBackHandler(onBack, router);

  const product = resolveProduct(initialProduct, flatList);
  const { onAddToCart, isFavorite: productIsFavorite, onToggleFavorite } = useProductActions(product);
  const accountName = getAccountName(user, profile);
  const reviewsState = useReviewsState(product, isAuthenticated, accountName);

  const decreaseQty = useCallback(() => setQty((q) => Math.max(1, q - 1)), []);
  const increaseQty = useCallback(() => setQty((q) => Math.min(99, q + 1)), []);

  return {
    qty,
    product,
    isWide,
    gridWidth,
    isFromAllProducts,
    handleBackPress,
    onAddToCart,
    productIsFavorite,
    onToggleFavorite,
    reviewsState,
    decreaseQty,
    increaseQty,
  };
}

import { SkeletonLoader } from '../../components/Feedback';

export default function ProductPage({ product: initialProduct, isDark, showNavigation = true, onBack, isFromAllProducts: isFromAllProductsProp }) {
  const state = useProductPageState({ initialProduct, onBack, isFromAllProductsProp });

  if (!state.product) {
    return (
      <View style={[styles.root, isDark ? styles.rootDark : styles.rootLight, { padding: 40, alignItems: 'center' }]}>
        <SkeletonLoader count={4} height={40} width={300} />
      </View>
    );
  }

  const rootStyle = [styles.root, isDark ? styles.rootDark : styles.rootLight];
  const containerStyle = { alignSelf: 'center', width: state.gridWidth, maxWidth: '100%', paddingBottom: 24 };

  return (
    <View style={rootStyle}>
      <ProductPageHeader
        showNavigation={showNavigation}
        gridWidth={state.gridWidth}
        isDark={isDark}
        onBack={state.handleBackPress}
        showBreadcrumbs={!state.isFromAllProducts}
      />
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: 0 }]} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <View style={containerStyle}>
            <ScrollFadeUp>
              <ProductDetails
                product={state.product}
                isWide={state.isWide}
                isDark={isDark}
                qty={state.qty}
                onDecreaseQty={state.decreaseQty}
                onIncreaseQty={state.increaseQty}
                onAddToCart={state.onAddToCart}
                isFavorite={state.productIsFavorite}
                onToggleFavorite={state.onToggleFavorite}
                reviewsState={state.reviewsState}
              />
            </ScrollFadeUp>
            <ScrollFadeUp>
              <ProductReviews product={state.product} isDark={isDark} reviewsState={state.reviewsState} />
            </ScrollFadeUp>
          </View>
        </View>
        <View style={{ height: 40 }} />
        <Footer />
      </ScrollView>
    </View>
  );
}
