import { useState } from 'react';
import { ScrollFadeUp } from '../../components/Motion';
import { Heading } from '../../components/Text';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import useGridLayout from '../../hooks/useGridLayout';
import PageScrollLayout from '../shell/PageScrollLayout';
import OrderCard from './components/OrderCard';
import styles from './OrdersPageStyles';
import { useOrders } from './useOrders';

import EmptyState from '../../components/DataTable/EmptyState';
import CatalogPagination from '../catalog/CatalogPagination';

const PAGE_SIZE = 10;

function OrdersList({ orders, paginatedOrders, expandedOrders, toggleExpand, currentPage, totalPages, goToPrevPage, goToNextPage, isDark, t }) {
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
          onPrev={goToPrevPage}
          onNext={goToNextPage}
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
  const { isWide, gridWidth } = useGridLayout();
  const { currentPage, totalPages, paginatedOrders, goToPrevPage, goToNextPage } = useOrdersPagination(orders);

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <PageScrollLayout isDark={isDark} maxWidth={isWide ? 580 : gridWidth}>
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
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        isDark={isDark}
        t={t}
      />
    </PageScrollLayout>
  );
}
