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
import { colors, layout } from '../../theme/tokens';

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
    <ScrollView
      style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.flexOne}>
        <View style={[styles.pageContent, styles.contentWrapper, { maxWidth: isWide ? 580 : gridWidth }]}>
          
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
      <View style={styles.bottomSpacer} />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerDark: { backgroundColor: colors.backgroundDark },
  containerLight: { backgroundColor: colors.backgroundLight },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: layout.spacing.xl,
  },
  pageContent: {
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.lg,
  },
  flexOne: { flex: 1 },
  contentWrapper: { alignSelf: 'center', width: '100%' },
  bottomSpacer: { height: 40 },
});

