import React from 'react';
import { useCatalogRootData } from '@/hooks/useCatalogViewData';
import CatalogView from '@/features/catalog/CatalogView';
import PageTransition from '@/components/PageTransition';

export default function HomeRoute() {
  const { isDark, isWide, depth, currentLevel, items, crumbs } = useCatalogRootData();

  return (
    <PageTransition trigger="home">
      <CatalogView
        isDark={isDark}
        isWide={isWide}
        depth={depth}
        currentLevel={currentLevel}
        items={items}
        crumbs={crumbs}
        showCategoryGrid={false}
        showSectionTitle={false}
        showPromotionalSections={true}
        showHeroBanner={true}
        showNavigation={false}
      />
    </PageTransition>
  );
}
