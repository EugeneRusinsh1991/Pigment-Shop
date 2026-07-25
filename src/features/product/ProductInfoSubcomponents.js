import React, { useRef } from 'react';
import { Animated, Text, View, Platform } from 'react-native';
import { CartIcon, HeartIcon } from '@/components/Icons';
import { useTheme } from '../../context/ThemeContext';
import { useCartContext } from '../../context/CartContext';
import { Link } from 'expo-router';
import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import AnimatedButton from '../../components/AnimatedButton';
import { getLocalizedValue } from '../../utils/localization';
import { colors } from '../../theme/tokens';
import styles from './ProductPageStyles';

export const getSafePrice = (price) => (typeof price === 'number' ? price : 0);

export const calcFinalPrice = (price, discountPercent) => {
  const pct = discountPercent || 0;
  return pct > 0 ? Math.round(price * (1 - pct / 100)) : price;
};

export function QtySelector({ qty, isDark, onDecrease, onIncrease }) {
  const tc = isDark ? styles.textDark : styles.textLight;

  return (
    <View style={[styles.qtyRow, isDark ? styles.qtyRowDark : styles.qtyRowLight]}>
      <AnimatedButton testID="product-qty-minus" onPress={onDecrease} style={styles.qtyBtn}>
        <Text style={[styles.qtyBtnText, tc]}>−</Text>
      </AnimatedButton>
      <Text style={[styles.qtyVal, tc]}>{qty}</Text>
      <AnimatedButton testID="product-qty-plus" onPress={onIncrease} style={styles.qtyBtn}>
        <Text style={[styles.qtyBtnText, tc]}>+</Text>
      </AnimatedButton>
    </View>
  );
}

export function ProductInfoPrice({ price, discountPercent, tc }) {
  const safePrice = getSafePrice(price);
  const finalPrice = calcFinalPrice(safePrice, discountPercent);
  const hasDiscount = (discountPercent || 0) > 0;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
      <Text style={[styles.priceText, tc]}>${finalPrice.toLocaleString()}</Text>
      {hasDiscount && (
        <Text style={{ fontSize: 14, color: colors.secondaryDarkText, textDecorationLine: 'line-through' }}>
          ${safePrice.toLocaleString()}
        </Text>
      )}
    </View>
  );
}

export function ProductMetaInfo({ product, tc, dc }) {
  const { t, lang } = useTheme();
  const desc = getLocalizedValue(product.description, lang, t('productNoDesc'));
  const label = getLocalizedValue(product.label, lang);
  const brand = product.brand || 'BEAUTY';
  const sku = product.sku || 'N/A';
  const stockText = product.inStock !== false ? t('productInStock') : t('productOutOfStock');

  return (
    <>
      <Text style={styles.brandText}>{brand}</Text>
      <Text style={[styles.productName, tc]}>{label}</Text>
      <ProductInfoPrice price={product.price} discountPercent={product.discountPercent} tc={tc} />
      <Text style={[styles.description, dc]}>{desc}</Text>
      <Text style={styles.skuText}>{t('productSku')}: {sku}</Text>
      <Text style={styles.stockText}>{stockText}</Text>
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
      leftIcon={<CartIcon color="#FFFFFF" size={16} />}
      style={isWide ? styles.cartBtnWide : { flex: 1 }}
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

  const actionRowStyle = [styles.actionRow, !isWide && styles.actionRowMobile];
  const handleToggle = () => onToggleFavorite?.(product);

  return (
    <View style={actionRowStyle}>
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
        style={{ marginLeft: 8 }}
      />
    </View>
  );
}
