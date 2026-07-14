/**
 * useBootstrapStatus.js
 *
 * React hook that subscribes to the app bootstrap coordinator's status.
 *
 * Returns the current bootstrap status ('idle' | 'starting' | 'ready' | 'failed')
 * and any error that occurred during startup.
 *
 * Usage:
 *   const { status, error } = useBootstrapStatus();
 *   if (status !== 'ready' && status !== 'failed') return <Spinner />;
 */
import { useState, useEffect } from 'react';
import { onBootstrapStatusChange, getBootstrapStatus } from './appBootstrap';

export function useBootstrapStatus() {
  const [state, setState] = useState(() => getBootstrapStatus());

  useEffect(() => {
    // Subscribe and get updates; also immediately delivers current status.
    const unsubscribe = onBootstrapStatusChange((status, error) => {
      setState({ status, error });
    });
    return unsubscribe;
  }, []);

  return state;
}
