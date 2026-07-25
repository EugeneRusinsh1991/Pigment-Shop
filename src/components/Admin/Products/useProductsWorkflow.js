import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import useSort from '../../../hooks/useSort';
import { useAdminDrafts, useAdminActions } from '../../../services/adminDomain';
import { searchProducts } from '../../../services/adminProductsTransforms';
import { applyFilters, applySort } from './productsSortFilter';
import { useCrudWorkflow } from '../../../hooks/useCrudWorkflow';

export function useProductsWorkflow() {
  const { draftProducts, isDirty, addProduct, updateProduct, removeProduct } = useAdminDrafts();
  const { saveDrafts } = useAdminActions();
  const [query, setQuery] = useState('');
  const { sortField, setSortField, sortDirection, setSortDirection, handleSort } = useSort('');
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const { t } = useTheme();

  const handleAdd = useCallback((formData) => {
    addProduct(formData);
  }, [addProduct]);

  const handleUpdate = useCallback((id, formData) => {
    updateProduct(id, formData);
  }, [updateProduct]);

  const handleDelete = useCallback((id) => {
    removeProduct(id);
  }, [removeProduct]);

  const { isSaving, handleSave } = useCrudWorkflow({
    draftData: draftProducts,
    isDirty,
    saveFn: saveDrafts,
    successMessageTitle: t('adminProductsSaveSuccess'),
    errorMessageTitle: t('adminProductsSaveError'),
  });

  const displayedProducts = useMemo(() => {
    const searched = searchProducts(draftProducts, query);
    const filtered = applyFilters(searched, { onlyDiscount, onlyNew });
    return applySort(filtered, sortField, sortDirection);
  }, [draftProducts, query, sortField, sortDirection, onlyDiscount, onlyNew]);

  return {
    displayedProducts,
    query,
    setQuery,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    onlyDiscount,
    setOnlyDiscount,
    onlyNew,
    setOnlyNew,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleSort,
    handleSaveToFirebase: handleSave, // Keep old name for backward compatibility or rename? Better rename in consumer too.
    isSaving,
    isDirty,
  };
}
