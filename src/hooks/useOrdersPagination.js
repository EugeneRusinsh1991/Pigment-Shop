import { useState } from 'react';

const PAGE_SIZE = 10;

/**
 * Hook for paginating orders list.
 * 
 * @param {Array} orders - Complete list of orders to paginate
 * @returns {Object} Pagination state and controls
 * @returns {number} returns.currentPage - Current page number (1-indexed)
 * @returns {number} returns.totalPages - Total number of pages
 * @returns {Array} returns.paginatedOrders - Orders for current page
 * @returns {Function} returns.setCurrentPage - Function to set current page
 * @returns {Function} returns.goToPrevPage - Navigate to previous page
 * @returns {Function} returns.goToNextPage - Navigate to next page
 */
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
