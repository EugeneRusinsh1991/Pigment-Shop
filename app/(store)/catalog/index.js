import React from 'react';
import { useCatalogRootData } from '../../../src/hooks/useCatalogViewData';
import CatalogView from '../../../src/components/CatalogView';
import PageTransition from '../../../src/components/PageTransition';

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
