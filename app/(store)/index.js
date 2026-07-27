import { PageTransition } from '@\/components\/Motion';
import CatalogView from '@/features/catalog/CatalogView';
import { useCatalogRootData } from '@/features/catalog/useCatalogViewData';

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
