import { CartIcon, HeartIcon } from '@/components/Icons';
import { Link } from 'expo-router';
import { View } from 'react-native';
import { Button, IconButton } from '../../components/ui/Button';
import { Heading, Text } from '../../components/ui/Text';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/tokens';
import { getLocalizedValue } from '../../utils/localization';
import { useCartContext } from '../cart/CartContext';
import styles from './ProductPageStyles';

const getSafePrice = (price) => (typeof price === 'number' ? price : 0);

const calcFinalPrice = (price, discountPercent) => {
  const pct = discountPercent || 0;
  return pct > 0 ? Math.round(price * (1 - pct / 100)) : price;
};

function QtySelector({ qty, isDark, onDecrease, onIncrease }) {
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

function ProductInfoPrice({ price, discountPercent }) {
  const safePrice = getSafePrice(price);
  const finalPrice = calcFinalPrice(safePrice, discountPercent);
  const hasDiscount = (discountPercent || 0) > 0;

  return (
    <View style={[styles.priceRowContainer]}>
      <Text variant="h2" weight="700" style={styles.priceText}>${finalPrice.toLocaleString()}</Text>
      {hasDiscount && (
        <Text variant="body2" color="desc" style={[styles.originalPriceText]}>
          ${safePrice.toLocaleString()}
        </Text>
      )}
    </View>
  );
}

export function ProductMetaInfo({ product }) {
  const { t, lang } = useLanguage();
  const desc = getLocalizedValue(product.description, lang, t('productNoDesc'));
  const label = getLocalizedValue(product.label, lang);
  const brand = product.brand || 'BEAUTY';
  const sku = product.sku || 'N/A';
  const stockText = product.inStock !== false ? t('productInStock') : t('productOutOfStock');

  return (
    <>
      <Text variant="overline" color="accent" style={styles.brandText}>{brand}</Text>
      <Text variant="display" style={styles.productName}>{label}</Text>
      <ProductInfoPrice price={product.price} discountPercent={product.discountPercent} />
      <Text variant="body1" color="desc" style={styles.description}>{desc}</Text>
      <Text variant="caption" color="muted" style={styles.skuText}>{t('productSku')}: {sku}</Text>
      <Text variant="caption" weight="600" style={styles.stockText}>{stockText}</Text>
    </>
  );
}

function getHeartColor(isFavorite, isDark) {
  if (isFavorite) return colors.accent;
  return isDark ? colors.white : colors.dark;
}

function CartButton({ isInCart, isWide, finalPrice, qty, product, onAddToCart, t }) {
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
      style={isWide ? styles.cartBtnWide : styles.flex1}
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
  const { t } = useLanguage();
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
        size="lg"
        variant="outline"
        animated={true}
        style={[styles.actionFavBtn]}
      />
    </View>
  );
}
