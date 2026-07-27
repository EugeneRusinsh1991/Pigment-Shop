import { useState } from 'react';

const PAGE_SIZE = 10;

export function useOrdersPagination(orders) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const paginatedOrders = orders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const goToPrevPage = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  };

  return {
    currentPage,
    totalPages,
    paginatedOrders,
    setCurrentPage,
    goToPrevPage,
    goToNextPage,
  };
}
