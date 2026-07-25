import { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
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
    const confirmSecond = () => {
      const msg2 = "This action is irreversible. The category and all nested subcategories, groups, and products will be permanently deleted.";
      if (typeof window !== 'undefined' && window.confirm) {
        if (window.confirm(msg2)) {
          removeCategory(id);
        }
      } else {
        Alert.alert(
          "Warning",
          msg2,
          [
            { text: "Cancel", style: "cancel" },
            { text: "Delete permanently", style: "destructive", onPress: () => removeCategory(id) }
          ]
        );
      }
    };

    const msg1 = "Do you want to delete this category?";
    if (typeof window !== 'undefined' && window.confirm) {
      if (window.confirm(msg1)) {
        confirmSecond();
      }
    } else {
      Alert.alert(
        "Confirm Deletion",
        msg1,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", onPress: confirmSecond }
        ]
      );
    }
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
