import { useState, useCallback, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

function getDefaultTitle(isError) {
  return isError ? 'Error' : 'Success';
}

function resolveAlertTitle(title, fallbackKey, isError, t) {
  if (title) return title;
  const translated = t(fallbackKey);
  if (translated) return translated;
  return getDefaultTitle(isError);
}

/**
 * A canonical hook for handling CRUD data orchestration.
 * Supports both "Direct Fetch" (e.g., Users/Orders) and "Draft" (e.g., Products/Categories) models.
 */
export function useCrudWorkflow({
  loadFn,
  draftData,
  isDirty: externalIsDirty,
  saveFn,
  successMessageTitle,
  errorMessageTitle,
}) {
  const { t } = useTheme();
  const { showToast } = useToast();
  
  const [internalData, setInternalData] = useState([]);
  const [loading, setLoading] = useState(!!loadFn && !draftData);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = useCallback(async () => {
    if (!loadFn) return;
    setLoading(true);
    setError(null);
    try {
      const res = await loadFn();
      if (!res.success) throw new Error(res.error);
      setInternalData(res.data || []);
    } catch (err) {
      console.error('[useCrudWorkflow] Fetch error:', err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [loadFn]);

  useEffect(() => {
    if (loadFn) {
      fetchData();
    }
  }, [fetchData]);

  const handleSave = useCallback(async () => {
    if (!saveFn) return;
    
    setIsSaving(true);
    try {
      const res = await saveFn();
      if (!res.success) throw new Error(res.error);
      const title = resolveAlertTitle(successMessageTitle, 'adminCategoriesSuccessTitle', false, t);
      if (showToast) {
        showToast(title, 'success');
      }
    } catch (err) {
      console.error('[useCrudWorkflow] Save error:', err);
      const title = resolveAlertTitle(errorMessageTitle, 'adminCategoriesErrorTitle', true, t);
      const msg = err.message ? `${title}: ${err.message}` : title;
      if (showToast) {
        showToast(msg, 'error');
      }
    } finally {
      setIsSaving(false);
    }
  }, [saveFn, successMessageTitle, errorMessageTitle, t, showToast]);

  const data = draftData !== undefined ? draftData : internalData;
  const isDirty = externalIsDirty !== undefined ? externalIsDirty : false;

  return {
    data,
    loading,
    error,
    isDirty,
    isSaving,
    handleSave,
    refresh: fetchData,
    setInternalData,
  };
}
