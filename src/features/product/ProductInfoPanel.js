import React from 'react';
import { View } from 'react-native';
import styles from './ProductPageStyles';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { RegistrationPrompt, ReviewForm } from './ProductReviewSubcomponents';
import { ProductMetaInfo, ProductActionRow } from './ProductInfoSubcomponents';

function ProductReviewSection({ isWide, reviewsState, isDark }) {
  const { isAuthenticated } = useAuth();
  if (!isWide || !reviewsState) return null;

  return (
    <View style={[styles.reviewSection]}>
      {isAuthenticated ? (
        <ReviewForm isDark={isDark} hideHeading showModeToggle {...reviewsState} />
      ) : (
        <RegistrationPrompt isDark={isDark} />
      )}
    </View>
  );
}

export function ProductInfoPanel({
  product,
  isDark,
  isWide,
  qty,
  onDecrease,
  onIncrease,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
  reviewsState,
}) {
  return (
    <View style={[styles.infoArea, isWide && styles.infoAreaWide]}>
      <ProductMetaInfo product={product} />
      <ProductActionRow
        product={product}
        qty={qty}
        isDark={isDark}
        isWide={isWide}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
        onAddToCart={onAddToCart}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
      />
      <ProductReviewSection isWide={isWide} reviewsState={reviewsState} isDark={isDark} />
    </View>
  );
}
