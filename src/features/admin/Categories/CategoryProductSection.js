import { AnimatedButton } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, layout, motion } from '../../../theme/tokens';
import styles from './CategoryFormStyles';

const getLanguageFallback = (labelObj, lang) => labelObj[lang] || labelObj.ru || labelObj.en;

const getProductLabel = (product, lang) => {
  const label = product?.label;
  if (typeof label === 'object') return getLanguageFallback(label, lang) || product.id;
  return label || product.id;
};

const sec_styles = StyleSheet.create({
  productOptionBase: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
    borderWidth: layout.borderWidth.thin,
    borderRadius: layout.radii.sm,
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.sm,
  },
  productOptionSelected: {
    borderColor: colors.success,
    backgroundColor: colors.successBgSoft,
  },
  productOptionUnselected: {
    borderColor: colors.chipLightInactiveBorder,
    backgroundColor: colors.slateLight,
  },
  productCheckBase: {
    width: 16,
    height: 16,
    borderRadius: layout.radii.full,
    borderWidth: layout.borderWidth.thin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCheckSelected: {
    borderColor: colors.success,
    backgroundColor: colors.success,
  },
  productCheckUnselected: {
    borderColor: colors.slateStrong,
    backgroundColor: colors.white,
  },
  checkText: {
    color: colors.white,
  },
  labelText: {
    color: colors.textLight,
  },
  hintText: {
    color: colors.slateText,
    marginBottom: layout.spacing.sm,
  },
  productGroup: {
    gap: layout.spacing.xs,
  },
  emptyText: {
    color: colors.slateText,
  },
  sectionTop: {
    marginTop: layout.spacing.sm,
  },
  sectionBottom: {
    marginTop: layout.spacing.lg,
  },
});

const getProductOptionStyle = (selected) => [
  sec_styles.productOptionBase,
  selected ? sec_styles.productOptionSelected : sec_styles.productOptionUnselected,
];

const getProductCheckStyle = (selected) => [
  sec_styles.productCheckBase,
  selected ? sec_styles.productCheckSelected : sec_styles.productCheckUnselected,
];

const renderProductOption = (product, selected, toggleProduct, lang) => (
  <AnimatedButton
    key={product.id}
    onPress={() => toggleProduct(product.id)}
    style={[getProductOptionStyle(selected)]}
    activeOpacity={motion.press.activeOpacity}
  >
    <View style={[getProductCheckStyle(selected)]}>
      {selected ? <Text variant="caption" weight="bold" style={sec_styles.checkText}>✓</Text> : null}
    </View>
    <Text variant="body2" style={sec_styles.labelText}>{getProductLabel(product, lang)}</Text>
  </AnimatedButton>
);

const renderProductGroup = ({ titleKey, hintKey, emptyKey, products, selected, toggleProduct, lang, t }) => (
  <View>
    <Text variant="overline" color="desc" style={styles.sectionLabel}>{t(titleKey)}</Text>
    <Text size={12} style={sec_styles.hintText}>
      {t(hintKey)}
    </Text>
    <View style={sec_styles.productGroup}>
      {products.length === 0 ? (
        <Text size={12} style={sec_styles.emptyText}>{t(emptyKey)}</Text>
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
    <View style={sec_styles.sectionTop}>
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

      <View style={sec_styles.sectionBottom}>
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
