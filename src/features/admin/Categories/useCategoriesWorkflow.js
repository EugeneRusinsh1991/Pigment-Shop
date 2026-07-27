import { useCallback, useMemo } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useAdminDrafts, useAdminActions } from '../../../services/adminDomain';
import { getCategoryTree } from '../../../services/adminCategoriesTransforms';
import { useCrudWorkflow } from '../../../hooks/useCrudWorkflow';

export function useCategoriesWorkflow() {
  const { draftCategories, isDirty, addCategory, updateCategory, removeCategory } = useAdminDrafts();
  const { saveDrafts } = useAdminActions();

  const tree = useMemo(() => getCategoryTree(draftCategories), [draftCategories]);

  const handleAdd = useCallback((data) => {
    addCategory(data);
  }, [addCategory]);

  const handleUpdate = useCallback((id, data) => {
    updateCategory(id, data);
  }, [updateCategory]);

  const { t } = useTheme();

  const handleDelete = useCallback((id) => {
    removeCategory(id);
  }, [removeCategory]);

  const { isSaving, handleSave } = useCrudWorkflow({
    draftData: draftCategories,
    isDirty,
    saveFn: saveDrafts,
    successMessageTitle: t('adminCategoriesSuccessTitle'),
    errorMessageTitle: t('adminCategoriesErrorTitle'),
  });

  return { 
    tree, 
    allCategories: draftCategories, 
    handleAdd, 
    handleUpdate, 
    handleDelete, 
    handleSaveToFirebase: handleSave, 
    isSaving,
    isDirty 
  };
}
