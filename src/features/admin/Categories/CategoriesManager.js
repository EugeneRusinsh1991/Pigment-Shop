/**
 * CategoriesManager.js
 *
 * Categories tab: toolbar + add button + collapsible category tree + form modal.
 *
 * All mutations flow through adminDomain (persistCategories).
 * Local staging changes use the pure transform helpers from adminCategoriesTransforms.
 * The catalogState subscription is kept to pick up external changes (e.g. from
 * catalogSync when Firestore updates) only while there are no unsaved local edits.
 */
import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useCatalog } from '../../../context/CatalogContext';
import CategoryFormModal from './CategoryFormModal';
import CategoryTree from './CategoryTree';
import styles from './CategoriesStyles';
import { useCategoriesWorkflow } from './useCategoriesWorkflow';
import { useFormModal } from '../../../hooks/useFormModal';
import AdminSaveFooter from '../AdminSaveFooter';

export default function CategoriesManager() {
  const { tree, allCategories, handleAdd, handleUpdate, handleDelete, handleSaveToFirebase: handleBatchSave, isSaving, isDirty } = useCategoriesWorkflow();
  const { flatList: products } = useCatalog();
  const { t } = useTheme();
  const { isVisible: modalVisible, editingItem: editingCategory, openForCreate: openAdd, openForEdit: openEdit, close: closeModal } = useFormModal();
  const [presetParentId, setPresetParentId] = useState(null);

  const handleOpenAdd = () => { setPresetParentId(null); openAdd(); };
  const handleOpenAddChild = (parentCategory) => { setPresetParentId(parentCategory.id); openAdd(); };
  const handleOpenEdit = (cat) => { setPresetParentId(null); openEdit(cat); };
  const handleCloseModal = () => { setPresetParentId(null); closeModal(); };

  const handleSave = (formData) => {
    if (editingCategory) {
      handleUpdate(editingCategory.id, formData);
    } else {
      handleAdd(formData);
    }
    closeModal();
  };

  return (
    <View style={styles.container}>
      <CategoryTree
        tree={tree}
        onEdit={handleOpenEdit}
        onAdd={handleOpenAdd}
        products={products}
      />
      <AdminSaveFooter 
        isDirty={isDirty} 
        isSaving={isSaving} 
        onSave={handleBatchSave} 
      />
      <CategoryFormModal
        visible={modalVisible}
        category={editingCategory}
        categories={allCategories}
        presetParentId={presetParentId}
        onSave={handleSave}
        onClose={handleCloseModal}
        onDelete={handleDelete}
        onAddChild={handleOpenAddChild}
        products={products}
      />
    </View>
  );
}
