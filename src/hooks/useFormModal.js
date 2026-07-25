import { useState, useCallback } from 'react';

/**
 * A generic hook for managing "Create vs Edit" modal visibility state.
 */
export function useFormModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const openForCreate = useCallback(() => {
    setEditingItem(null);
    setIsVisible(true);
  }, []);

  const openForEdit = useCallback((item) => {
    setEditingItem(item);
    setIsVisible(true);
  }, []);

  const close = useCallback(() => {
    setIsVisible(false);
    setEditingItem(null);
  }, []);

  const isEditMode = editingItem !== null;

  return {
    isVisible,
    editingItem,
    isEditMode,
    openForCreate,
    openForEdit,
    close,
  };
}
