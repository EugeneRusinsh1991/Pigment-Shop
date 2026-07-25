import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { Image, Text, View, StyleSheet, Platform } from 'react-native';
import { useTheme, getThemedValue } from '../../context/ThemeContext';
import useCardDimensions from '../../hooks/useCardDimensions';
import { HeartIcon, CartIcon } from '@/components/Icons';
import styles from './ProductCardStyles';
import IconButton from '../../components/IconButton';
import ProductBadges from './ProductBadges';
import BaseCard from '../../components/BaseCard';
import { useCartContext } from '../../context/CartContext';
import { colors } from '../../theme/tokens';

import { PRODUCT_PLACEHOLDER } from '../../constants';
import { getLocalizedValue } from '../../utils/localization';
import { getEffectivePrice } from '../../utils/pricing';

const getThemedStyles = (isDark, imgHeight) => {
  const ic = (dark, light) => getThemedValue(isDark, dark, light);
  return {
    prodCard: [styles.prodCard, ic(styles.prodCardDark, styles.prodCardLight)],
    imageContainer: [styles.imageContainer, ic(styles.imageContainerDark, styles.imageContainerLight), { height: imgHeight }],
    prodTitle: [styles.prodTitle, ic(styles.prodTitleDark, styles.prodTitleLight)],
    prodInfo: [styles.prodInfo, ic(styles.prodInfoDark, styles.prodInfoLight)],
    heartColor: isDark ? colors.white : colors.dark,
  };
};


const ProductPrice = React.memo(function ProductPrice({ price, discountPercent, isDark }) {
  const pStyle = [styles.priceText, isDark ? styles.priceTextDark : styles.priceTextLight];

  if (discountPercent > 0) {
    const finalPrice = getEffectivePrice(price, discountPercent);
    return (
      <View style={styles.priceRow}>
        <Text style={pStyle}>${finalPrice.toLocaleString()}</Text>
        <Text style={styles.originalPriceText}>${price.toLocaleString()}</Text>
      </View>
    );
  }

  return <Text style={pStyle}>${price.toLocaleString()}</Text>;
});

const ProductCardInner = React.forwardRef(({ item, isDark, depth = 1, isFavorite, onToggleFavorite, overrideWidth, ...rest }, ref) => {
  const { t, lang } = useTheme();
  const { addItem } = useCartContext();
  const { imgContainerHeight } = useCardDimensions(depth);

  const themed = useMemo(() => getThemedStyles(isDark, imgContainerHeight), [isDark, imgContainerHeight]);
  const heartColor = isFavorite ? colors.accentPinkLight : themed.heartColor;

  const handleFavPress = useCallback((e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    onToggleFavorite?.(item);
  }, [onToggleFavorite, item]);

  const handleCartPress = useCallback((e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const effectivePrice = getEffectivePrice(item.price, item.discountPercent);
    addItem(item, effectivePrice, 1);
  }, [addItem, item]);

  return (
    <BaseCard
      ref={ref}
      isDark={isDark}
      interactive={true}
      useDimensions={true}
      depth={depth}
      overrideWidth={overrideWidth}
      lightBgColor={colors.productCardLight}
      {...rest}
    >
      <View style={themed.imageContainer}>
        <Image source={{ uri: item.image || PRODUCT_PLACEHOLDER }} style={styles.prodImage} resizeMode="cover" />
        <ProductBadges isNew={item.isNew} discountPercent={item.discountPercent} />
        <View style={styles.topOverlayWrapper}>
          <IconButton
            testID="product-fav-button"
            icon={<HeartIcon filled={isFavorite} color={heartColor} size={14} />}
            onPress={handleFavPress}
            size={28}
            variant="glass"
            animated={true}
          />
        </View>
        <View style={styles.bottomOverlayWrapper}>
          <IconButton
            testID="product-cart-button"
            icon={<CartIcon color={colors.white} size={14} />}
            onPress={handleCartPress}
            size={28}
            variant="solid"
            animated={true}
            style={styles.cartBtnSolidStyle}
          />
        </View>
      </View>
      <View style={themed.prodInfo}>
        <Text style={styles.brandText}>{item.brand || t('brandFallback')}</Text>
        <Text style={themed.prodTitle} numberOfLines={2}>{getLocalizedValue(item.label, lang)}</Text>
        <ProductPrice price={item.price} discountPercent={item.discountPercent} isDark={isDark} />
      </View>
    </BaseCard>
  );
});

const ProductCard = React.memo(ProductCardInner);

export default ProductCard;
