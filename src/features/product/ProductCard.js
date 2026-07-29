import { CartIcon, HeartIcon } from '@/components/Icons';
import React, { useCallback, useMemo } from 'react';
import { Image, View } from 'react-native';
import { IconButton } from '../../components/ui/Button';
import Card from '../../components/ui/Card/Card';
import { Text } from '../../components/ui/Text';
import { getThemedValue, useTheme } from '../../context/ThemeContext';
import useCardDimensions from '../../hooks/useCardDimensions';
import { colors } from '../../theme/tokens';
import { useCartContext } from '../cart/CartContext';
import ProductBadges from './ProductBadges';
import styles from './ProductCardStyles';

import { PRODUCT_PLACEHOLDER } from '../../constants';
import { getLocalizedValue } from '../../utils/localization';
import { getEffectivePrice } from '../../utils/pricing';

const getThemedStyles = (isDark, imgHeight) => {
  const ic = (dark, light) => getThemedValue(isDark, dark, light);
  return {
    prodCard: [styles.prodCard, ic(styles.prodCardDark, styles.prodCardLight)],
    imageContainer: [styles.imageContainer, ic(styles.imageContainerDark, styles.imageContainerLight), { height: imgHeight }],
    prodInfo: [styles.prodInfo, ic(styles.prodInfoDark, styles.prodInfoLight)],
    heartColor: isDark ? colors.white : colors.dark,
  };
};


const ProductPrice = React.memo(function ProductPrice({ price, discountPercent }) {
  if (discountPercent > 0) {
    const finalPrice = getEffectivePrice(price, discountPercent);
    return (
      <View style={styles.priceRow}>
        <Text variant="subtitle1" weight="700">${finalPrice.toLocaleString()}</Text>
        <Text variant="caption" color="desc" style={styles.originalPriceText}>${price.toLocaleString()}</Text>
      </View>
    );
  }

  return <Text variant="subtitle1" weight="700">${price.toLocaleString()}</Text>;
});

function safeStopPropagation(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (e && e.stopPropagation) e.stopPropagation();
}

function getImageSource(item, imgError) {
  if (!item || !item.image || imgError) return { uri: PRODUCT_PLACEHOLDER };
  return { uri: item.image };
}

function getCardStyle(cardHeight, overrideWidth) {
  return [{ minHeight: cardHeight }, overrideWidth ? { width: overrideWidth } : null];
}

const ProductCardInner = React.forwardRef(({ item, isDark, depth = 1, isFavorite, onToggleFavorite, overrideWidth, ...rest }, ref) => {
  const [imgError, setImgError] = React.useState(false);
  const { t, lang } = useTheme();
  const { addItem } = useCartContext();
  const { cardHeight, imgContainerHeight } = useCardDimensions(depth);

  const themed = useMemo(() => getThemedStyles(isDark, imgContainerHeight), [isDark, imgContainerHeight]);
  const heartColor = isFavorite ? colors.accentPinkLight : themed.heartColor;
  const imageSource = getImageSource(item, imgError);

  const handleFavPress = useCallback((e) => {
    safeStopPropagation(e);
    if (onToggleFavorite) onToggleFavorite(item);
  }, [onToggleFavorite, item]);

  const handleCartPress = useCallback((e) => {
    safeStopPropagation(e);
    const effectivePrice = getEffectivePrice(item.price, item.discountPercent);
    addItem(item, effectivePrice, 1);
  }, [addItem, item]);

  return (
    <Card
      ref={ref}
      variant="grid"
      isDark={isDark}
      interactive={true}
      style={[getCardStyle(cardHeight, overrideWidth)]}
      {...rest}
    >
      <View style={[themed.imageContainer]}>
        <Image
          source={imageSource}
          style={styles.prodImage}
          resizeMode="cover"
          onError={() => setImgError(true)}
        />
        <ProductBadges isNew={item.isNew} discountPercent={item.discountPercent} />
        <View style={styles.topOverlayWrapper} pointerEvents="auto">
          <IconButton
            testID="product-fav-button"
            icon={<HeartIcon filled={isFavorite} color={heartColor} size={14} />}
            onPress={handleFavPress}
            size={28}
            variant="glass"
            animated={true}
          />
        </View>
        <View style={styles.bottomOverlayWrapper} pointerEvents="auto">
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
      <View style={[themed.prodInfo]}>
        <Text variant="overline" color="accent" style={styles.brandText}>{item.brand || t('brandFallback')}</Text>
        <Text variant="subtitle2" style={styles.prodTitle} numberOfLines={2}>{getLocalizedValue(item.label, lang)}</Text>
        <ProductPrice price={item.price} discountPercent={item.discountPercent} />
      </View>
    </Card>
  );
});

const ProductCard = React.memo(ProductCardInner);

export default ProductCard;
