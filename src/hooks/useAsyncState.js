import { useState, useCallback, useRef } from 'react';
import { UI_STATES } from '../constants/uiStates';

const defaultEmptyChecker = (data) => {
  if (Array.isArray(data)) return data.length === 0;
  if (data && typeof data === 'object') return Object.keys(data).length === 0;
  return !data;
};

/**
 * useAsyncState
 *
 * Manages async data fetching with deterministic 4-state transitions:
 * idle → loading → (error | empty | data)
 *
 * @param {Function} asyncFn - The async function to execute.
 * @param {Object} options
 * @param {any} options.initialData - Initial data value.
 * @param {boolean} options.immediate - If true, execute on mount.
 * @param {Function} options.onError - Optional callback on error (e.g. handleError from useErrorHandler).
 * @param {Function} options.emptyChecker - Custom fn to determine empty state.
 */
export function useAsyncState(asyncFn, options = {}) {
  const {
    initialData = null,
    onError = null,
    emptyChecker = defaultEmptyChecker,
  } = options;

  const [state, setState] = useState(UI_STATES.IDLE);
  const [data, setDataRaw] = useState(initialData);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  // Track mounted state
  useState(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  });

  const execute = useCallback(async (...args) => {
    if (!isMounted.current) return;
    setState(UI_STATES.LOADING);
    setError(null);

    try {
      const result = await asyncFn(...args);
      if (!isMounted.current) return;

      const nextState = emptyChecker(result) ? UI_STATES.EMPTY : UI_STATES.DATA;
      setDataRaw(result);
      setState(nextState);
      return result;
    } catch (err) {
      if (!isMounted.current) return;
      setError(err);
      setState(UI_STATES.ERROR);
      if (onError) onError(err);
    }
  }, [asyncFn, emptyChecker, onError]);

  const reset = useCallback(() => {
    if (!isMounted.current) return;
    setState(UI_STATES.IDLE);
    setDataRaw(initialData);
    setError(null);
  }, [initialData]);

  const setData = useCallback((updater) => {
    if (!isMounted.current) return;
    setDataRaw((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setState(emptyChecker(next) ? UI_STATES.EMPTY : UI_STATES.DATA);
      return next;
    });
  }, [emptyChecker]);

  return {
    state,
    data,
    error,
    isLoading: state === UI_STATES.LOADING,
    isError: state === UI_STATES.ERROR,
    isEmpty: state === UI_STATES.EMPTY,
    isSuccess: state === UI_STATES.DATA,
    execute,
    reset,
    setData,
  };
}
