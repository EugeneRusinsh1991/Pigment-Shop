import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';
import { useCatalog } from '../../context/CatalogContext';
import useGridLayout from '../../hooks/useGridLayout';
import Footer from '../shell/components/Footer';
import { ScrollFadeUp } from '../../components/Motion';
import { Button } from '../../components/Button';
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

  const containerStyle = [
    styles.container,
    isDark ? styles.containerDark : styles.containerLight,
  ];

  const contentWrapperStyle = [
    styles.pageContent,
    {
      alignSelf: 'center',
      width: '100%',
      maxWidth: isWide ? 580 : gridWidth,
    },
  ];

  return (
    <ScrollView
      style={containerStyle}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        <View style={contentWrapperStyle}>
          
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

        </View>
      </View>
      <View style={{ height: 40 }} />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerDark: { backgroundColor: '#0D0D0D' },
  containerLight: { backgroundColor: '#FAF8F6' },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  pageContent: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});

