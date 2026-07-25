import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import {
  resolveLocalizedValue,
  getEffectivePrice,
  getHighlightStyle,
} from './ProductRowComponents';
import { TabletProductRow, DesktopProductRow } from './ProductRowVariants';

export default function ProductRow({ product, index, onEdit }) {
  const { lang } = useTheme();
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
    />
  );
}
