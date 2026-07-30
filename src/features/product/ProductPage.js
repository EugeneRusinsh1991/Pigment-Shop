import { PageNavigation } from '@/components/domain/Navigation';
import { View } from 'react-native';
import { SkeletonLoader, ProductDetailSkeleton } from '../../components/ui/Feedback';
import { ScrollFadeUp } from '../../components/ui/Motion';
import { useProductPageState } from '../../hooks/useProductPageState';

import { ProductImagePanel } from './ProductImagePanel';
import { ProductInfoPanel } from './ProductInfoPanel';
import styles from './ProductPageStyles';
import ProductReviews from './ProductReviews';

function ProductPageHeader({ showNavigation, gridWidth, isDark, onBack, showBreadcrumbs = true }) {
  if (!showNavigation) return null;
  return (
    <View style={[styles.pageHeaderContainer, { width: gridWidth }]}>
      <PageNavigation
        isDark={isDark}
        onBack={onBack}
        showBack={true}
        showBreadcrumbs={showBreadcrumbs}
      />
    </View>
  );
}

function ProductDetails({ product, isWide, isDark, qty, onDecreaseQty, onIncreaseQty, onAddToCart, isFavorite, onToggleFavorite, reviewsState }) {
  return (
    <View style={[isWide ? styles.wideRow : styles.narrowStack]}>
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


export default function ProductPage({ product: initialProduct, isDark, showNavigation = true, onBack, isFromAllProducts: isFromAllProductsProp }) {
  const state = useProductPageState({ initialProduct, onBack, isFromAllProductsProp });

  if (!state.product) {
    return (
      <View style={[styles.root, isDark ? styles.rootDark : styles.rootLight, styles.loadingRoot]}>
        <ProductDetailSkeleton />
      </View>
    );
  }

  return (
    <View style={[styles.root, isDark ? styles.rootDark : styles.rootLight]}>
      <ProductPageHeader
        showNavigation={showNavigation}
        gridWidth={state.gridWidth}
        isDark={isDark}
        onBack={state.handleBackPress}
        showBreadcrumbs={true}
      />
      <View style={[styles.flex1]}>
        <View style={[styles.pageBodyContainer, { width: state.gridWidth }]}>
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
    </View>
  );
}
