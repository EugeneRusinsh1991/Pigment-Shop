import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import useCardDimensions from '../hooks/useCardDimensions';
import styles from './ProductCardStyles';

const PRODUCT_PLACEHOLDER = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop';

/**
 * ProductBadges Helper Component
 * Renders discount and NEW badges if applicable.
 */
function ProductBadges({ isNew, discountPercent }) {
  const hasBadges = isNew || (discountPercent && discountPercent > 0);
  if (!hasBadges) {
    return null;
  }

  return (
    <View style={styles.badgeContainer}>
      {isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.badgeText}>NEW</Text>
        </View>
      )}
      {discountPercent > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.badgeText}>-{discountPercent}%</Text>
        </View>
      )}
    </View>
  );
}

/**
 * ProductPrice Helper Component
 * Renders main price (and discounted price if discount exists).
 */
function ProductPrice({ price, discountPercent, isDark }) {
  const finalPrice = discountPercent 
    ? Math.round(price * (1 - discountPercent / 100)) 
    : price;
  
  const priceTextStyle = [
    styles.priceText, 
    isDark ? styles.priceTextDark : styles.priceTextLight
  ];

  if (discountPercent > 0) {
    return (
      <View style={styles.priceRow}>
        <Text style={priceTextStyle}>
          ${finalPrice.toLocaleString()}
        </Text>
        <Text style={styles.originalPriceText}>
          ${price?.toLocaleString()}
        </Text>
      </View>
    );
  }

  return (
    <Text style={priceTextStyle}>
      ${price?.toLocaleString()}
    </Text>
  );
}

/**
 * ProductCard Component
 * Renders a product card item with layout dimensions determined by depth and viewport size.
 */
export default function ProductCard({ item, onPress, isDark, depth = 1 }) {
  const { cardWidth, cardHeight, imgContainerHeight } = useCardDimensions(depth, true);

  return (
    <TouchableOpacity
      style={[
        styles.prodCard, 
        { width: cardWidth, height: cardHeight, flex: 0, flexGrow: 0 }
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View 
        style={[
          styles.imageContainer, 
          isDark ? styles.imageContainerDark : styles.imageContainerLight, 
          { height: imgContainerHeight }
        ]}
      >
        <Image source={{ uri: item.image || PRODUCT_PLACEHOLDER }} style={styles.prodImage} resizeMode="cover" />
        <ProductBadges isNew={item.isNew} discountPercent={item.discountPercent} />
      </View>
      <View style={styles.prodInfo}>
        <Text style={styles.brandText}>{item.brand || 'BEAUTY'}</Text>
        <Text 
          style={[
            styles.prodTitle, 
            isDark ? styles.prodTitleDark : styles.prodTitleLight
          ]} 
          numberOfLines={2}
        >
          {item.label}
        </Text>
        <ProductPrice price={item.price} discountPercent={item.discountPercent} isDark={isDark} />
      </View>
    </TouchableOpacity>
  );
}
