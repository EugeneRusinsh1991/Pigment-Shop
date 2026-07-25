import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useCatalog } from '@/context/CatalogContext';
import ProductPage from '@/components/ProductPage';
import PageTransition from '@/components/PageTransition';

export default function ProductRoute() {
  const { isDark } = useTheme();
  const { id } = useLocalSearchParams();
  const { flatList = [] } = useCatalog() || {};
  const product = flatList.find(p => String(p.id) === String(id));

  return (
    <PageTransition trigger={id}>
      <ProductPage product={product} isDark={isDark} showNavigation={true} />
    </PageTransition>
  );
}
