import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './ProductPageStyles';

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

/**
 * ProductInfoBadges Helper Component
 * Renders badges like NEW and discount.
 */
function ProductInfoBadges({ isNew, discountPercent }) {
  const hasBadges = isNew || (discountPercent && discountPercent > 0);
  if (!hasBadges) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
      {isNew && (
        <View style={{ backgroundColor: '#7c3aed', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>NEW</Text>
        </View>
      )}
      {discountPercent > 0 && (
        <View style={{ backgroundColor: '#E87A8E', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>-{discountPercent}%</Text>
        </View>
      )}
    </View>
  );
}

/**
 * ProductInfoPrice Helper Component
 * Renders price and original price if discount exists.
 */
function ProductInfoPrice({ price, discountPercent, tc }) {
  const finalPrice = discountPercent 
    ? Math.round(price * (1 - discountPercent / 100)) 
    : price;

  if (discountPercent > 0) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
        <Text style={[styles.priceText, tc]}>${finalPrice.toLocaleString()}</Text>
        <Text style={{ fontSize: 14, color: '#94a3b8', textDecorationLine: 'line-through' }}>
          ${price?.toLocaleString()}
        </Text>
      </View>
    );
  }

  return (
    <Text style={[styles.priceText, tc]}>${price?.toLocaleString()}</Text>
  );
}

function ProductMetaInfo({ product, isDark, tc, dc }) {
  const desc = product.description || 'Высококачественные материалы для профессионалов бьюти-сферы.';

  return (
    <>
      <ProductInfoBadges isNew={product.isNew} discountPercent={product.discountPercent} />
      <Text style={styles.brandText}>{product.brand || 'BEAUTY'}</Text>
      <Text style={[styles.productName, tc]}>{product.label}</Text>
      <ProductInfoPrice price={product.price} discountPercent={product.discountPercent} tc={tc} />
      <Text style={[styles.description, dc]}>{desc}</Text>
      <Text style={styles.skuText}>Артикул: {product.sku || 'N/A'}</Text>
      <Text style={styles.stockText}>В наличии</Text>
    </>
  );
}

function ProductActionRow({ product, qty, isDark, onDecrease, onIncrease, onAddToCart }) {
  const finalPrice = product.discountPercent ? Math.round(product.price * (1 - product.discountPercent / 100)) : product.price;
  return (
    <View style={styles.actionRow}>
      <QtySelector qty={qty} isDark={isDark} onDecrease={onDecrease} onIncrease={onIncrease} />
      <TouchableOpacity
        style={styles.cartBtn}
        onPress={() => onAddToCart(product, `$${finalPrice}`, qty)}
      >
        <Text style={styles.cartBtnText}>🛒 В корзину</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ProductInfoPanel({ product, isDark, isWide, qty, onDecrease, onIncrease, onAddToCart }) {
  const tc = isDark ? styles.textDark : styles.textLight;
  const dc = isDark ? styles.descDark : styles.descLight;

  return (
    <View style={[styles.infoArea, isWide && styles.infoAreaWide]}>
      <ProductMetaInfo product={product} isDark={isDark} tc={tc} dc={dc} />
      <ProductActionRow
        product={product} qty={qty} isDark={isDark}
        onDecrease={onDecrease} onIncrease={onIncrease} onAddToCart={onAddToCart}
      />
      <TouchableOpacity style={styles.goToCartLink}>
        <Text style={styles.goToCartText}>Перейти в корзину →</Text>
      </TouchableOpacity>
    </View>
  );
}
