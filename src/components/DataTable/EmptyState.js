import React from 'react';
import { EmptyState as GlobalEmptyState } from '../Feedback';

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

