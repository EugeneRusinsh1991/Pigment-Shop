import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { ScrollFadeUp } from '../../components/ui/Motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import useGridLayout from '../../hooks/useGridLayout';
import { useCatalog } from '../catalog/CatalogContext';
import PageScrollLayout from '../shell/PageScrollLayout';
import OrderDetailsCard from './OrderDetailsCard';
import OrderHeader from './OrderHeader';

export default function OrderConfirmationPage({ isDark, params }) {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const { flatList } = useCatalog();
  const { isWide, gridWidth } = useGridLayout();

  // Redirect if accessed without valid parameters
  useEffect(() => {
    if (!params || !params.orderId) {
      router.replace('/orders');
    }
  }, [params, router]);

  if (!params || !params.orderId) {
    return null;
  }

  const { orderId, items = [], totalPrice = 0 } = params;

  return (
    <PageScrollLayout isDark={isDark} maxWidth={isWide ? 580 : gridWidth}>
      {/* Success Checkmark Indicator */}
      <OrderHeader isDark={isDark} t={t} />

      {/* Order Details Card */}
      <OrderDetailsCard
        isDark={isDark}
        orderId={orderId}
        items={items}
        totalPrice={totalPrice}
        flatList={flatList}
        lang={lang}
        t={t}
      />

      {/* OK Button */}
      <ScrollFadeUp>
        <Button
          title={t('btnOk')}
          onPress={() => router.push('/orders')}
          variant="primary"
          size="lg"
        />
      </ScrollFadeUp>
    </PageScrollLayout>
  );
}
