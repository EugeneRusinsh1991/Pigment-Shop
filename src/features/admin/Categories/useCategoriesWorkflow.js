import { useCallback, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { getCategoryTree } from '../../../services/adminCategoriesTransforms';
import { useAdminActions, useAdminDrafts } from '../../../services/adminDomain';
import { useCrudWorkflow } from '../useCrudWorkflow';

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

  const { t } = useLanguage();

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
