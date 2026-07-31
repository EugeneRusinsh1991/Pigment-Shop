import React from 'react';
import EmptyState from '../EmptyState/EmptyState';
import { colors, layout } from '../../../../theme/tokens';
import { useLanguage } from '../../../../context/LanguageContext';

function ErrorBoundaryContent({ title, description, error, resetError }) {
  const { t } = useLanguage();

  return (
    <EmptyState
      title={title || t('errorOccurred')}
      description={
        description ||
        (error?.message ? String(error.message) : t('errorDefaultMsg'))
      }
      actionLabel={t('tryAgain')}
      onAction={resetError}
    />
  );
}

/**
 * ErrorBoundary
 *
 * React class component that catches render-phase errors in its child tree.
 * Renders a fallback UI (defaults to EmptyState with a retry button).
 *
 * Props:
 *   fallback   — ReactNode | ({ error, resetError }) => ReactNode
 *   onReset    — () => void   (called when resetError fires)
 *   onError    — (error, errorInfo) => void
 *   title      — string
 *   description — string
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const { fallback, title, description } = this.props;

    if (typeof fallback === 'function') {
      return fallback({ error: this.state.error, resetError: this.resetError });
    }

    if (fallback) {
      return fallback;
    }

    return (
      <ErrorBoundaryContent
        title={title}
        description={description}
        error={this.state.error}
        resetError={this.resetError}
      />
    );
  }
}

const styles = {
  retryButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: colors.accent,
    borderRadius: layout.radii.sm,
  },
  retryText: {
    color: colors.white,
  },
};
