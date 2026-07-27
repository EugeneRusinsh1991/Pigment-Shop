import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCatalog } from '../context/CatalogContext';
import { getAccountName, useReviewsState } from '../features/product/ProductReviewSubcomponents';
import { useProfile } from '../features/profile/useProfile';
import useGridLayout from './useGridLayout';
import { useProductActions } from './useProductActions';

function resolveProduct(initialProduct, flatList) {
  if (!initialProduct) return null;
  return flatList.find((p) => p.id === initialProduct.id) || initialProduct;
}

/**
 * Hook for managing product page state including actions, reviews, and navigation.
 * 
 * @param {Object} params - Hook parameters
 * @param {Object} params.initialProduct - Initial product data
 * @param {Function} params.onBack - Custom back navigation handler
 * @param {boolean} params.isFromAllProductsProp - Whether navigation came from all products page
 * @returns {Object} Product page state and handlers
 * @returns {number} returns.qty - Current quantity selection
 * @returns {Object} returns.product - Resolved product from catalog
 * @returns {boolean} returns.isWide - Whether screen is wide layout
 * @returns {number} returns.gridWidth - Grid width for layout
 * @returns {boolean} returns.isFromAllProducts - Navigation source flag
 * @returns {Function} returns.handleBackPress - Back navigation handler
 * @returns {Function} returns.onAddToCart - Add to cart handler
 * @returns {boolean} returns.productIsFavorite - Favorite status
 * @returns {Function} returns.onToggleFavorite - Toggle favorite handler
 * @returns {Object} returns.reviewsState - Reviews and questions state
 * @returns {Function} returns.decreaseQty - Decrease quantity handler
 * @returns {Function} returns.increaseQty - Increase quantity handler
 */
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
