import { useState, useCallback } from 'react';

/**
 * useSort
 *
 * Custom hook to manage sorting state and trigger sort direction toggle.
 *
 * @param {string} initialField - The initial field to sort by
 * @param {string} initialDirection - The initial sorting direction ('asc' or 'desc')
 */
export default function useSort(initialField = '', initialDirection = 'asc') {
  const [sortField, setSortField] = useState(initialField);
  const [sortDirection, setSortDirection] = useState(initialDirection);

  const handleSort = useCallback((field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  return {
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    handleSort,
  };
}
