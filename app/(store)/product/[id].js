import { PageTransition } from '@/components/ui/Motion';
import { useTheme } from '@/context/ThemeContext';
import { useCatalog } from '@/features/catalog/CatalogContext';
import ProductPage from '@/features/product/ProductPage';
import { useLocalSearchParams } from 'expo-router';

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
