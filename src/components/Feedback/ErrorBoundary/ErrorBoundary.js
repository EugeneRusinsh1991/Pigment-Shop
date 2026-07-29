import React from 'react';
import EmptyState from '../EmptyState/EmptyState';

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
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    const { onError } = this.props;
    console.error('[ErrorBoundary]', error, errorInfo);
    if (onError) onError(error, errorInfo);
  }

  resetError() {
    const { onReset } = this.props;
    this.setState({ hasError: false, error: null });
    if (onReset) onReset();
  }

  render() {
    const { hasError, error } = this.state;
    const {
      fallback,
      children,
      title = 'Something went wrong',
      description = 'An unexpected error occurred. Please try again.',
    } = this.props;

    if (!hasError) return children;

    if (fallback) {
      return typeof fallback === 'function'
        ? fallback({ error, resetError: this.resetError })
        : fallback;
    }

    const { Text: RNText, TouchableOpacity, StyleSheet } = require('react-native');

    const retryAction = (
      <TouchableOpacity onPress={this.resetError} style={styles.retryButton}>
        <RNText style={styles.retryText}>Try Again</RNText>
      </TouchableOpacity>
    );

    return (
      <EmptyState
        title={title}
        description={description}
        action={retryAction}
      />
    );
  }
}

const styles = {
  retryButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#E91E8C',
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
};
