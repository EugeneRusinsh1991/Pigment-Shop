import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './ProductPageStyles';
import { CartIcon, HeartIcon } from '../Icons';
import { useTheme } from '../../context/ThemeContext';

// ─── Price helpers ────────────────────────────────────────────────────────────

const getSafePrice = (price) => (typeof price === 'number' ? price : 0);

const calcFinalPrice = (price, discountPercent) => {
  const pct = discountPercent || 0;
  return pct > 0 ? Math.round(price * (1 - pct / 100)) : price;
};

// ─── Description / label helpers ──────────────────────────────────────────────

const resolveLocalized = (value, lang, fallback = '') => {
  if (!value) return fallback;
  if (typeof value === 'object') return value[lang] || fallback;
  return value;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

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
    isNew && { key: 'new', style: { backgroundColor: '#E31B23' }, textStyle: { color: '#FFFFFF' }, text: 'NEW' },
    discountPercent > 0 && { key: 'discount', style: { backgroundColor: '#FFFFFF', borderColor: '#E31B23', borderWidth: 1 }, textStyle: { color: '#E31B23' }, text: `-${discountPercent}%` },
  ].filter(Boolean);

  if (badges.length === 0) return null;

  return (
    <View style={{ flexDirection: 'row', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
      {badges.map((b) => (
        <View key={b.key} style={[b.style, { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }]}>
          <Text style={[{ fontSize: 10, fontWeight: 'bold' }, b.textStyle]}>{b.text}</Text>
        </View>
      ))}
    </View>
  );
}

function ProductInfoPrice({ price, discountPercent, tc }) {
  const safePrice = getSafePrice(price);
  const finalPrice = calcFinalPrice(safePrice, discountPercent);
  const hasDiscount = (discountPercent || 0) > 0;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
      <Text style={[styles.priceText, tc]}>${finalPrice.toLocaleString()}</Text>
      {hasDiscount && (
        <Text style={{ fontSize: 14, color: '#94a3b8', textDecorationLine: 'line-through' }}>
          ${safePrice.toLocaleString()}
        </Text>
      )}
    </View>
  );
}

function ProductMetaInfo({ product, tc, dc }) {
  const { t, lang } = useTheme();
  const desc = resolveLocalized(product.description, lang, t('productNoDesc'));
  const label = resolveLocalized(product.label, lang);
  const brand = product.brand || 'BEAUTY';
  const sku = product.sku || 'N/A';
  const stockText = product.inStock !== false ? t('productInStock') : t('productOutOfStock');

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

function ProductActionRow({ product, qty, isDark, isWide, onDecrease, onIncrease, onAddToCart, isFavorite, onToggleFavorite }) {
  const { t } = useTheme();
  const finalPrice = calcFinalPrice(getSafePrice(product.price), product.discountPercent);
  const handleToggle = () => onToggleFavorite && onToggleFavorite(product);

  return (
    <View style={styles.actionRow}>
      <QtySelector qty={qty} isDark={isDark} onDecrease={onDecrease} onIncrease={onIncrease} />
      <TouchableOpacity
        style={[styles.cartBtn, { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
        onPress={() => onAddToCart(product, `$${finalPrice}`, qty)}
      >
        <CartIcon color="#FFFFFF" size={16} />
        <Text style={[styles.cartBtnText, { marginLeft: 6 }]}>{t('productAddToCart')}</Text>
      </TouchableOpacity>
      {isWide && (
        <TouchableOpacity
          style={[styles.favBtn, isDark ? styles.favBtnDark : styles.favBtnLight]}
          onPress={handleToggle}
        >
          <HeartIcon filled={isFavorite} color={isFavorite ? '#E31B23' : (isDark ? '#FFFFFF' : '#1C1C1C')} size={16} />
        </TouchableOpacity>
      )}
    </View>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function ProductInfoPanel({ product, isDark, isWide, qty, onDecrease, onIncrease, onAddToCart, isFavorite, onToggleFavorite }) {
  const { t } = useTheme();
  const tc = isDark ? styles.textDark : styles.textLight;
  const dc = isDark ? styles.descDark : styles.descLight;

  return (
    <View style={[styles.infoArea, isWide && styles.infoAreaWide]}>
      <ProductMetaInfo product={product} isDark={isDark} tc={tc} dc={dc} />
      <ProductActionRow
        product={product} qty={qty} isDark={isDark} isWide={isWide}
        onDecrease={onDecrease} onIncrease={onIncrease} onAddToCart={onAddToCart}
        isFavorite={isFavorite} onToggleFavorite={onToggleFavorite}
      />
      <TouchableOpacity style={styles.goToCartLink}>
        <Text style={styles.goToCartText}>{t('productGoToCart')} →</Text>
      </TouchableOpacity>
    </View>
  );
}
