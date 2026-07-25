import { useState, useCallback } from 'react';

/**
 * useSort — canonical sort state hook (reference implementation).
 *
 * Implements the project-standard sort hook interface defined in
 * src/domain/catalogEntityContract.ts (SortState convention).
 *
 * Exposed interface: { sortField, sortDirection, handleSort, setSortField, setSortDirection }
 * - handleSort(field): toggles direction on the active field; resets to 'asc' on a new field.
 *
 * All sort hooks in the project MUST match this interface.
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
