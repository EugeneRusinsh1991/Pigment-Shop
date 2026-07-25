import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import CatalogPage from '@/components/CatalogPage';
import PageTransition from '@/components/PageTransition';

export default function ProductsRoute() {
  const { isDark } = useTheme();
  return (
    <PageTransition trigger="products-catalog">
      <CatalogPage isDark={isDark} />
    </PageTransition>
  );
}
