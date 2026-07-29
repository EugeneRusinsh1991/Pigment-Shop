// @audit-keep
import { emptyStateStyles } from './EmptyState';
import { fieldErrorStyles } from './InlineError';
import { skeletonStyles } from './Skeleton';
import { toastStyles } from './Toast';

export function getFeedbackStyle(options = {}) {
  return {
    emptyState: emptyStateStyles,
    fieldError: fieldErrorStyles,
    skeleton: skeletonStyles,
    toast: toastStyles,
  };
}
