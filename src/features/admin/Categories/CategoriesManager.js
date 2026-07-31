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
import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { useCatalog } from '../../catalog/CatalogContext';
import AdminSaveFooter from '../AdminSaveFooter';
import styles from './CategoriesStyles';
import CategoryFormModal from './CategoryFormModal';
import CategoryTree from './CategoryTree';
import { useCategoriesWorkflow } from './useCategoriesWorkflow';

export default function CategoriesManager() {
  const { tree, allCategories, handleAdd, handleUpdate, handleDelete, handleSaveToFirebase: handleBatchSave, isSaving, isDirty } = useCategoriesWorkflow();
  const { flatList: products } = useCatalog();
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState('list');
  const [editingCategory, setEditingCategory] = useState(null);
  const [presetParentId, setPresetParentId] = useState(null);

  const handleOpenAdd = () => {
    setPresetParentId(null);
    setEditingCategory(null);
    setViewMode('create');
  };

  const handleOpenAddChild = (parentCategory) => {
    setPresetParentId(parentCategory.id);
    setEditingCategory(null);
    setViewMode('create');
  };

  const handleOpenEdit = (cat) => {
    setPresetParentId(null);
    setEditingCategory(cat);
    setViewMode('edit');
  };

  const handleCloseForm = () => {
    setPresetParentId(null);
    setEditingCategory(null);
    setViewMode('list');
  };

  const handleSave = (formData) => {
    if (editingCategory) {
      handleUpdate(editingCategory.id, formData);
    } else {
      handleAdd(formData);
    }
    handleCloseForm();
  };

  if (viewMode !== 'list') {
    return (
      <View style={styles.container}>
        <CategoryFormModal
          category={editingCategory}
          categories={allCategories}
          presetParentId={presetParentId}
          onSave={handleSave}
          onClose={handleCloseForm}
          onDelete={handleDelete}
          onAddChild={handleOpenAddChild}
          products={products}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        <CategoryTree
          tree={tree}
          onEdit={handleOpenEdit}
          onAdd={handleOpenAdd}
          products={products}
        />
      </ScrollView>
      <AdminSaveFooter 
        isDirty={isDirty} 
        isSaving={isSaving} 
        onSave={handleBatchSave} 
      />
    </View>
  );
}
