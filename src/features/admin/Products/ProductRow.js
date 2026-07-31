import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import {
  resolveLocalizedValue,
  getEffectivePrice,
  getHighlightStyle,
} from './ProductRowComponents';
import { TabletProductRow, DesktopProductRow } from './ProductRowVariants';

export default function ProductRow({ product, index, onEdit, onDelete }) {
  const { lang } = useLanguage();
  const { width } = useWindowDimensions();
  const label = resolveLocalizedValue(product.label, lang);
  const effectivePrice = getEffectivePrice(product.price, product.discountPercent);
  const highlightStyle = getHighlightStyle(product.isNew, product.discountPercent);

  const isTablet = width >= 768 && width < 1024;

  if (isTablet) {
    return (
      <TabletProductRow
        product={product}
        index={index}
        label={label}
        effectivePrice={effectivePrice}
        highlightStyle={highlightStyle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  }

  return (
    <DesktopProductRow
      product={product}
      index={index}
      label={label}
      effectivePrice={effectivePrice}
      highlightStyle={highlightStyle}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

