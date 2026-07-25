import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './CategoryFormStyles';

const getLanguageFallback = (labelObj, lang) => labelObj[lang] || labelObj.ru || labelObj.en;

const getProductLabel = (product, lang) => {
  const label = product?.label;
  if (typeof label === 'object') return getLanguageFallback(label, lang) || product.id;
  return label || product.id;
};

const getProductOptionStyle = (selected) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  borderWidth: 1,
  borderColor: selected ? '#16A34A' : '#E2E8F0',
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 10,
  backgroundColor: selected ? '#ECFDF5' : '#F8FAFC',
});

const getProductCheckStyle = (selected) => ({
  width: 16,
  height: 16,
  borderRadius: 999,
  borderWidth: 1,
  borderColor: selected ? '#16A34A' : '#CBD5E1',
  backgroundColor: selected ? '#16A34A' : '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
});

const renderProductOption = (product, selected, toggleProduct, lang) => (
  <TouchableOpacity
    key={product.id}
    onPress={() => toggleProduct(product.id)}
    style={getProductOptionStyle(selected)}
    activeOpacity={0.8}
  >
    <View style={getProductCheckStyle(selected)}>
      {selected ? <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>✓</Text> : null}
    </View>
    <Text style={{ fontSize: 13, color: '#1F2937' }}>{getProductLabel(product, lang)}</Text>
  </TouchableOpacity>
);

const renderProductGroup = ({ titleKey, hintKey, emptyKey, products, selected, toggleProduct, lang, t }) => (
  <View>
    <Text style={styles.sectionLabel}>{t(titleKey)}</Text>
    <Text style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>
      {t(hintKey)}
    </Text>
    <View style={{ gap: 6 }}>
      {products.length === 0 ? (
        <Text style={{ fontSize: 12, color: '#64748B' }}>{t(emptyKey)}</Text>
      ) : products.map((product) => renderProductOption(product, selected, toggleProduct, lang))}
    </View>
  </View>
);

export function useCategoryProducts(categories, categoryId, formProductIds, products, handleChange) {
  const selectedProductIds = formProductIds || [];

  const blockedProductIds = useMemo(() => {
    return new Set(
      (categories || [])
        .filter((cat) => cat.type === 'product_holder' && cat.id !== categoryId)
        .flatMap((cat) => cat.productIds || [])
        .filter(Boolean),
    );
  }, [categories, categoryId]);

  const assignedProducts = useMemo(
    () => (products || []).filter((product) => selectedProductIds.includes(product.id)),
    [products, selectedProductIds]
  );

  const unassignedProducts = useMemo(
    () => (products || []).filter((product) => !blockedProductIds.has(product.id) && !selectedProductIds.includes(product.id)),
    [products, blockedProductIds, selectedProductIds]
  );

  const toggleProduct = (productId) => {
    const next = selectedProductIds.includes(productId)
      ? selectedProductIds.filter((id) => id !== productId)
      : [...selectedProductIds, productId];
    handleChange('productIds', next);
  };

  return { assignedProducts, unassignedProducts, toggleProduct };
}

export function CategoryProductSection({ assignedProducts, unassignedProducts, toggleProduct, lang, t }) {
  return (
    <View style={{ marginTop: 8 }}>
      {renderProductGroup({
        titleKey: 'adminCategoriesFormAssignedProducts',
        hintKey: 'adminCategoriesFormAssignedProductsHint',
        emptyKey: 'adminCategoriesFormNoAssignedProducts',
        products: assignedProducts,
        selected: true,
        toggleProduct,
        lang,
        t,
      })}

      <View style={{ marginTop: 16 }}>
        {renderProductGroup({
          titleKey: 'adminCategoriesFormUnassignedProducts',
          hintKey: 'adminCategoriesFormUnassignedProductsHint',
          emptyKey: 'adminCategoriesFormNoUnassignedProducts',
          products: unassignedProducts,
          selected: false,
          toggleProduct,
          lang,
          t,
        })}
      </View>
    </View>
  );
}
