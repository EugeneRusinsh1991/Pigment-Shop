import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCatalog } from '../context/CatalogContext';
import { getAccountName, useReviewsState } from '../features/product/ProductReviewSubcomponents';
import useGridLayout from './useGridLayout';
import { useProductActions } from './useProductActions';
import { useProfile } from './useProfile';

function resolveProduct(initialProduct, flatList) {
  if (!initialProduct) return null;
  return flatList.find((p) => p.id === initialProduct.id) || initialProduct;
}

export function useProductPageState({ initialProduct, onBack, isFromAllProductsProp }) {
  const { flatList = [] } = useCatalog() || {};
  const { isAuthenticated, user } = useAuth();
  const { profile } = useProfile(user);
  const { isWide, gridWidth } = useGridLayout();
  const router = useRouter();
  const params = useLocalSearchParams();

  const isFromAllProducts = isFromAllProductsProp ?? (params?.from === 'all' || params?.isFromAllProducts === 'true');

  const product = resolveProduct(initialProduct, flatList);
  const { onAddToCart, isFavorite: productIsFavorite, onToggleFavorite, qty, decreaseQty, increaseQty } = useProductActions(product);
  const accountName = getAccountName(user, profile);
  const reviewsState = useReviewsState(product, isAuthenticated, accountName);

  const handleBackPress = useCallback(() => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  }, [onBack, router]);

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
