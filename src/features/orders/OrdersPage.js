import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import AccountLayout from '../profile/components/AccountLayout';
import OrderCard from './components/OrderCard';
import { useOrders } from './useOrders';

import EmptyState from '../../components/domain/DataTable/EmptyState';
import CatalogPagination from '../catalog/CatalogPagination';
import { useOrdersPagination } from '../../hooks/useOrdersPagination';

const PAGE_SIZE = 10;

function OrdersList({ orders, paginatedOrders, expandedOrders, toggleExpand, currentPage, totalPages, goToPrevPage, goToNextPage, isDark, t }) {
  if (orders.length === 0) {
    return (
      <EmptyState>{t('ordersEmpty')}</EmptyState>
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
  const { t } = useLanguage();
  const auth = useAuth();
  const { orders = [] } = useOrders(auth?.user);
  const [expandedOrders, setExpandedOrders] = useState({});
  const { currentPage, totalPages, paginatedOrders, goToPrevPage, goToNextPage } = useOrdersPagination(orders);

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <AccountLayout title={t('ordersTitle')} isDark={isDark} auth={auth}>
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
    </AccountLayout>
  );
}
