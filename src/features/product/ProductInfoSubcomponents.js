import React, { useRef } from 'react';
import { Animated, View, Platform } from 'react-native';
import { Text, Heading } from '../../components/Text';
import { CartIcon, HeartIcon } from '@/components/Icons';
import { useTheme } from '../../context/ThemeContext';
import { useCartContext } from '../../context/CartContext';
import { Link } from 'expo-router';
import { Button } from '../../components/Button';
import { IconButton } from '../../components/Button';
import { AnimatedButton } from '../../components/Button';
import { getLocalizedValue } from '../../utils/localization';
import { colors } from '../../theme/tokens';
import styles from './ProductPageStyles';

export const getSafePrice = (price) => (typeof price === 'number' ? price : 0);

export const calcFinalPrice = (price, discountPercent) => {
  const pct = discountPercent || 0;
  return pct > 0 ? Math.round(price * (1 - pct / 100)) : price;
};

export function QtySelector({ qty, isDark, onDecrease, onIncrease }) {
  return (
    <View style={[styles.qtyRow, isDark ? styles.qtyRowDark : styles.qtyRowLight]}>
      <IconButton
        testID="product-qty-minus"
        icon={<Text size={18} weight="500">−</Text>}
        onPress={onDecrease}
        size="sm"
        variant="transparent"
      />
      <Text variant="body2" weight="bold" style={styles.qtyVal}>{qty}</Text>
      <IconButton
        testID="product-qty-plus"
        icon={<Text size={18} weight="500">+</Text>}
        onPress={onIncrease}
        size="sm"
        variant="transparent"
      />
    </View>
  );
}

export function ProductInfoPrice({ price, discountPercent }) {
  const safePrice = getSafePrice(price);
  const finalPrice = calcFinalPrice(safePrice, discountPercent);
  const hasDiscount = (discountPercent || 0) > 0;

  return (
    <View style={[styles.priceRowContainer]}>
      <Text variant="h3" weight="700" style={styles.priceText}>${finalPrice.toLocaleString()}</Text>
      {hasDiscount && (
        <Text variant="body2" color="desc" style={[styles.originalPriceText]}>
          ${safePrice.toLocaleString()}
        </Text>
      )}
    </View>
  );
}

export function ProductMetaInfo({ product }) {
  const { t, lang } = useTheme();
  const desc = getLocalizedValue(product.description, lang, t('productNoDesc'));
  const label = getLocalizedValue(product.label, lang);
  const brand = product.brand || 'BEAUTY';
  const sku = product.sku || 'N/A';
  const stockText = product.inStock !== false ? t('productInStock') : t('productOutOfStock');

  return (
    <>
      <Text variant="overline" color="accent" style={styles.brandText}>{brand}</Text>
      <Heading level={2} style={styles.productName}>{label}</Heading>
      <ProductInfoPrice price={product.price} discountPercent={product.discountPercent} />
      <Text variant="body2" color="desc" style={styles.description}>{desc}</Text>
      <Text variant="caption" color="muted" style={styles.skuText}>{t('productSku')}: {sku}</Text>
      <Text variant="caption" weight="600" style={styles.stockText}>{stockText}</Text>
    </>
  );
}

function getHeartColor(isFavorite, isDark) {
  if (isFavorite) return colors.accent;
  return isDark ? colors.white : colors.dark;
}

export function CartButton({ isInCart, isWide, finalPrice, qty, product, onAddToCart, t }) {
  const handlePress = () => {
    if (!isInCart) onAddToCart({ ...product, price: finalPrice }, qty);
  };

  const title = isInCart ? t('productGoToCart') : t('productAddToCart');

  const btn = (
    <Button
      testID="product-detail-cart-button"
      title={title}
      onPress={isInCart ? undefined : handlePress}
      variant={isInCart ? 'accent' : 'primary'}
      size="lg"
      leftIcon={<CartIcon color={colors.white} size={16} />}
      style={[isWide ? styles.cartBtnWide : styles.flex1]}
    />
  );

  return isInCart ? <Link href="/cart" asChild>{btn}</Link> : btn;
}

function useIsProductInCart(productId) {
  const cartCtx = useCartContext();
  const cartItems = cartCtx?.cartItems ?? cartCtx?.items ?? [];
  if (!Array.isArray(cartItems)) return false;
  return cartItems.some((i) => i?.id === productId);
}

export function ProductActionRow({ product, qty, isDark, isWide, onDecrease, onIncrease, onAddToCart, isFavorite, onToggleFavorite }) {
  const { t } = useTheme();
  const isInCart = useIsProductInCart(product?.id);
  const finalPrice = calcFinalPrice(getSafePrice(product?.price), product?.discountPercent);
  const heartColor = getHeartColor(isFavorite, isDark);

  const handleToggle = () => onToggleFavorite?.(product);

  return (
    <View style={[styles.actionRow, !isWide && styles.actionRowMobile]}>
      <QtySelector qty={qty} isDark={isDark} onDecrease={onDecrease} onIncrease={onIncrease} />
      <CartButton
        isInCart={isInCart}
        isWide={isWide}
        finalPrice={finalPrice}
        qty={qty}
        product={product}
        onAddToCart={onAddToCart}
        t={t}
      />
      <IconButton
        testID="product-detail-fav-button"
        icon={<HeartIcon filled={isFavorite} color={heartColor} size={16} />}
        onPress={handleToggle}
        size={48}
        variant="outline"
        animated={true}
        style={[styles.actionFavBtn]}
      />
    </View>
  );
}
