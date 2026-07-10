import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './ProductPageStyles';
import { CartIcon, HeartIcon } from '../Icons';
import { useTheme } from '../../context/ThemeContext';

const PRODUCT_PLACEHOLDER = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop';

function getFinalPrice(product) {
  const pct = product.discountPercent || 0;
  return pct > 0 ? Math.round(product.price * (1 - pct / 100)) : product.price;
}

function QtySelector({ qty, isDark, onDecrease, onIncrease }) {
  const tc = isDark ? styles.textDark : styles.textLight;
  return (
    <View style={[styles.qtyRow, isDark ? styles.qtyRowDark : styles.qtyRowLight]}>
      <TouchableOpacity onPress={onDecrease} style={styles.qtyBtn}>
        <Text style={[styles.qtyBtnText, tc]}>−</Text>
      </TouchableOpacity>
      <Text style={[styles.qtyVal, tc]}>{qty}</Text>
      <TouchableOpacity onPress={onIncrease} style={styles.qtyBtn}>
        <Text style={[styles.qtyBtnText, tc]}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProductInfoBadges({ isNew, discountPercent }) {
  const badges = [
    isNew && { key: 'new', style: { backgroundColor: '#7c3aed' }, text: 'NEW' },
    discountPercent > 0 && { key: 'discount', style: { backgroundColor: '#E87A8E' }, text: `-${discountPercent}%` }
  ].filter(Boolean);

  if (badges.length === 0) return null;

  return (
    <View style={{ flexDirection: 'row', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
      {badges.map((b) => (
        <View key={b.key} style={[b.style, { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }]}>
          <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>{b.text}</Text>
        </View>
      ))}
    </View>
  );
}

const getSafePrice = (price) => {
  return typeof price === 'number' ? price : 0;
};

const getFinalPriceValue = (price, discountPercent) => {
  const pct = discountPercent || 0;
  if (pct > 0) {
    return Math.round(price * (1 - pct / 100));
  }
  return price;
};

function ProductInfoPrice({ price, discountPercent, tc }) {
  const pct = discountPercent || 0;
  const safePrice = getSafePrice(price);
  const finalPrice = getFinalPriceValue(safePrice, discountPercent);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
      <Text style={[styles.priceText, tc]}>${finalPrice.toLocaleString()}</Text>
      {pct > 0 && (
        <Text style={{ fontSize: 14, color: '#94a3b8', textDecorationLine: 'line-through' }}>
          ${safePrice.toLocaleString()}
        </Text>
      )}
    </View>
  );
}

const resolveDescription = (desc, lang, fallback) => {
  if (!desc) return fallback;
  if (typeof desc === 'object') return desc[lang] || fallback;
  return desc;
};

function getProductDescription(product, lang, fallbackText) {
  return resolveDescription(product.description, lang, fallbackText);
}

const resolveLabel = (label, lang) => {
  if (!label) return '';
  if (typeof label === 'object') return label[lang] || '';
  return label;
};

function getProductLabel(product, lang) {
  return resolveLabel(product.label, lang);
}

function ProductMetaInfo({ product, isDark, tc, dc }) {
  const { t, lang } = useTheme();
  
  const desc = getProductDescription(product, lang, t('productNoDesc'));
  const label = getProductLabel(product, lang);
  const isInStock = product.inStock !== false;

  const brand = product.brand || 'BEAUTY';
  const sku = product.sku || 'N/A';
  const stockText = isInStock ? t('productInStock') : t('productOutOfStock');

  return (
    <>
      <ProductInfoBadges isNew={product.isNew} discountPercent={product.discountPercent} />
      <Text style={styles.brandText}>{brand}</Text>
      <Text style={[styles.productName, tc]}>{label}</Text>
      <ProductInfoPrice price={product.price} discountPercent={product.discountPercent} tc={tc} />
      <Text style={[styles.description, dc]}>{desc}</Text>
      <Text style={styles.skuText}>{t('productSku')}: {sku}</Text>
      <Text style={styles.stockText}>{stockText}</Text>
    </>
  );
}

function ProductActionRow({ product, qty, isDark, onDecrease, onIncrease, onAddToCart, isFavorite, onToggleFavorite }) {
  const { t } = useTheme();
  const finalPrice = getFinalPrice(product);
  const handleToggle = () => onToggleFavorite && onToggleFavorite(product);
  return (
    <View style={styles.actionRow}>
      <QtySelector qty={qty} isDark={isDark} onDecrease={onDecrease} onIncrease={onIncrease} />
      <TouchableOpacity
        style={[styles.cartBtn, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
        onPress={() => onAddToCart(product, `$${finalPrice}`, qty)}
      >
        <CartIcon color="#FFFFFF" size={16} />
        <Text style={[styles.cartBtnText, { marginLeft: 6 }]}>{t('productAddToCart')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.favBtn, isDark ? styles.favBtnDark : styles.favBtnLight]}
        onPress={handleToggle}
      >
        <HeartIcon filled={isFavorite} color={isFavorite ? '#E87A8E' : (isDark ? '#FFFFFF' : '#1C1C1C')} size={16} />
      </TouchableOpacity>
    </View>
  );
}

export function ProductInfoPanel({ product, isDark, isWide, qty, onDecrease, onIncrease, onAddToCart, isFavorite, onToggleFavorite }) {
  const { t } = useTheme();
  const tc = isDark ? styles.textDark : styles.textLight;
  const dc = isDark ? styles.descDark : styles.descLight;

  return (
    <View style={[styles.infoArea, isWide && styles.infoAreaWide]}>
      <ProductMetaInfo product={product} isDark={isDark} tc={tc} dc={dc} />
      <ProductActionRow
        product={product} qty={qty} isDark={isDark}
        onDecrease={onDecrease} onIncrease={onIncrease} onAddToCart={onAddToCart}
        isFavorite={isFavorite} onToggleFavorite={onToggleFavorite}
      />
      <TouchableOpacity style={styles.goToCartLink}>
        <Text style={styles.goToCartText}>{t('productGoToCart')} →</Text>
      </TouchableOpacity>
    </View>
  );
}

export function ProductImagePanel({ image, isWide }) {
  return (
    <View style={[styles.imageArea, isWide && styles.imageAreaWide]}>
      <Image
        source={{ uri: PRODUCT_PLACEHOLDER }}
        style={styles.prodImage}
        resizeMode="cover"
      />
    </View>
  );
}
