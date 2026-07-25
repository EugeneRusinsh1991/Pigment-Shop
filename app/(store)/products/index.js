import React from 'react';
import { useTheme } from '../../../src/context/ThemeContext';
import CatalogPage from '../../../src/components/CatalogPage';
import PageTransition from '../../../src/components/PageTransition';

export default function ProductsRoute() {
  const { isDark } = useTheme();
  return (
    <PageTransition trigger="products-catalog">
      <CatalogPage isDark={isDark} />
    </PageTransition>
  );
}
