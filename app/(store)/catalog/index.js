import React from 'react';
import { useCatalogRootData } from '@/hooks/useCatalogViewData';
import CatalogView from '@/features/catalog/CatalogView';
import { PageTransition } from '@\/components\/Motion';

export default function CatalogRootRoute() {
  const { isDark, isWide, depth, currentLevel, items, crumbs } = useCatalogRootData();

  return (
    <PageTransition trigger="catalog-root">
      <CatalogView
        isDark={isDark}
        isWide={isWide}
        depth={depth}
        currentLevel={currentLevel}
        items={items}
        crumbs={crumbs}
        showCategoryGrid={true}
        showSectionTitle={true}
        showPromotionalSections={false}
        showHeroBanner={false}
        showNavigation={true}
      />
    </PageTransition>
  );
}
