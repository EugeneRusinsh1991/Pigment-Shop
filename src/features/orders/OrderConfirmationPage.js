import React, { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';
import { useCatalog } from '../../context/CatalogContext';
import useGridLayout from '../../hooks/useGridLayout';
import { ScrollFadeUp } from '../../components/Motion';
import { Button } from '../../components/Button';
import PageScrollLayout from '../../components/PageScrollLayout';
import OrderHeader from './OrderHeader';
import OrderDetailsCard from './OrderDetailsCard';

export default function OrderConfirmationPage({ isDark, params }) {
  const { t, lang } = useTheme();
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
