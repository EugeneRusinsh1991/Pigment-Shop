import { useState, useCallback } from 'react';
import { useWindowDimensions } from 'react-native';
import { layout } from '../../../theme/tokens';

export function useDataTable({
  sortField: externalSortField,
  sortDirection: externalSortDirection = 'asc',
  onSort: externalOnSort,
  keyExtractor = (item, index) => item?.id ?? index,
  customBreakpoint,
} = {}) {
  const { width } = useWindowDimensions();
  const breakpoint = customBreakpoint ?? layout.breakpoints.mobile;
  const isMobile = width < breakpoint;

  const [internalSortField, setInternalSortField] = useState(externalSortField);
  const [internalSortDirection, setInternalSortDirection] = useState(externalSortDirection);

  const sortField = externalSortField !== undefined ? externalSortField : internalSortField;
  const sortDirection = externalSortDirection !== undefined ? externalSortDirection : internalSortDirection;

  const handleSort = useCallback(
    (key) => {
      if (externalOnSort) {
        externalOnSort(key);
        return;
      }

      if (sortField === key) {
        setInternalSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setInternalSortField(key);
        setInternalSortDirection('asc');
      }
    },
    [externalOnSort, sortField]
  );

  const getItemKey = useCallback(
    (item, index) => {
      if (typeof keyExtractor === 'function') {
        return keyExtractor(item, index);
      }
      return item?.id ?? index;
    },
    [keyExtractor]
  );

  return {
    isMobile,
    sortField,
    sortDirection,
    handleSort,
    getItemKey,
  };
}

export default useDataTable;
