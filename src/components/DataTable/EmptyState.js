import React from 'react';
import GlobalEmptyState from '../EmptyState';

/**
 * Shared EmptyState primitive for tables and lists.
 * Delegates to the unified global EmptyState primitive.
 */
export default function EmptyState({ children, style }) {
  return (
    <GlobalEmptyState style={style}>
      {children}
    </GlobalEmptyState>
  );
}

