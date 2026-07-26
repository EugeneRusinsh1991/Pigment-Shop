import { getEmptyStateStyle } from './EmptyState/EmptyStateStyles';

export function getFeedbackStyle(options = {}) {
  return {
    emptyState: typeof getEmptyStateStyle === 'function' ? getEmptyStateStyle(options) : {},
  };
}
