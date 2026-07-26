import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Heading } from '../../components/Text';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useOrders } from '../../hooks/useOrders';
import useGridLayout from '../../hooks/useGridLayout';
import OrderCard from './components/OrderCard';
import styles from './OrdersPageStyles';
import Footer from '../shell/components/Footer';
import { ScrollFadeUp } from '../../components/Motion';

import CatalogPagination from '../catalog/CatalogPagination';
import EmptyState from '../../components/DataTable/EmptyState';

const PAGE_SIZE = 10;

function OrdersList({ orders, paginatedOrders, expandedOrders, toggleExpand, currentPage, totalPages, setCurrentPage, isDark, t }) {
  if (orders.length === 0) {
    return (
      <ScrollFadeUp>
        <EmptyState>{t('ordersEmpty')}</EmptyState>
      </ScrollFadeUp>
    );
  }

  const getStyle = (dark, light) => (isDark ? dark : light);

  return (
    <>
      {paginatedOrders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          isDark={isDark}
          isExpanded={!!expandedOrders[order.id]}
          onToggle={() => toggleExpand(order.id)}
          getStyle={getStyle}
        />
      ))}

      {orders.length > PAGE_SIZE && (
        <CatalogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
          onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          isDark={isDark}
        />
      )}
    </>
  );
}

export default function OrdersPage({ isDark }) {
  const { t } = useTheme();
  const { user } = useAuth();
  const { orders = [] } = useOrders(user);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { isWide, gridWidth } = useGridLayout();

  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const paginatedOrders = orders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <ScrollView 
      style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.flexOne}>
        <View style={[styles.pageContent, styles.contentWrapper, { maxWidth: isWide ? 580 : gridWidth }]}>
          <ScrollFadeUp>
            <Heading level={1} style={styles.title} isDark={isDark}>
              {t('ordersTitle')}
            </Heading>
          </ScrollFadeUp>
          
          <OrdersList
            orders={orders}
            paginatedOrders={paginatedOrders}
            expandedOrders={expandedOrders}
            toggleExpand={toggleExpand}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            isDark={isDark}
            t={t}
          />
        </View>
      </View>
      <View style={styles.bottomSpacer} />
      <Footer />
    </ScrollView>
  );
}
