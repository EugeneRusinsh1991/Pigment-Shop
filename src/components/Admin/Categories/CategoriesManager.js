/**
 * CategoriesManager.js
 *
 * Categories tab: toolbar + add button + collapsible category tree + form modal.
 */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { getCategories, subscribe } from '../../../data/catalogState';
import { persistCategories } from '../../../services/adminCatalogBoundary';
import {
  addCategory,
  getCategoryTree,
  removeCategory,
  updateCategory,
} from '../../../services/adminCategoriesService';
import CategoryFormModal from './CategoryFormModal';
import CategoryTree from './CategoryTree';
import styles from './CategoriesStyles';

function useCategoriesState() {
  const [allCategories, setAllCategories] = useState(getCategories());
  const [isDirty, setIsDirty] = useState(false);

  // Auto-update from store only if there are no unsaved local changes
  useEffect(() => {
    const unsub = subscribe(() => {
      if (!isDirty) {
        setAllCategories(getCategories());
      }
    });
    return unsub;
  }, [isDirty]);

  const tree = useMemo(() => getCategoryTree(allCategories), [allCategories]);

  const handleAdd = useCallback((data) => {
    const next = addCategory(data, allCategories);
    if (next) { setAllCategories(next); setIsDirty(true); }
  }, [allCategories]);

  const handleUpdate = useCallback((id, data) => {
    const next = updateCategory(id, data, allCategories);
    if (next) { setAllCategories(next); setIsDirty(true); }
  }, [allCategories]);

  const handleDelete = useCallback((id) => {
    const next = removeCategory(id, allCategories);
    setAllCategories(next);
    setIsDirty(true);
  }, [allCategories]);

  const { t } = useTheme();
  const handleSaveToFirebase = useCallback(async () => {
    try {
      await persistCategories(allCategories);
      setIsDirty(false);
      if (typeof window !== 'undefined' && window.alert) {
        window.alert(t('adminCategoriesSaveSuccess'));
      } else {
        Alert.alert(t('adminCategoriesSuccessTitle'), t('adminCategoriesSaveSuccess'));
      }
    } catch (err) {
      console.error('Failed to save to Firebase:', err);
      if (typeof window !== 'undefined' && window.alert) {
        window.alert(t('adminCategoriesSaveError') + ': ' + err.message);
      } else {
        Alert.alert(t('cartErrorTitle'), t('adminCategoriesSaveError') + ': ' + err.message);
      }
    }
  }, [allCategories, t]);

  return { tree, allCategories, handleAdd, handleUpdate, handleDelete, handleSaveToFirebase, isDirty };
}

function Toolbar({ onAdd }) {
  const { t } = useTheme();
  return (
    <View style={styles.toolbar}>
      <Text style={styles.toolbarTitle}>🗂️ {t('adminCategoriesTitle')}</Text>
      <TouchableOpacity style={styles.addBtn} onPress={onAdd} activeOpacity={0.85}>
        <Text style={styles.addBtnText}>{t('adminCategoriesAddBtn')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CategoriesManager() {
  const { tree, allCategories, handleAdd, handleUpdate, handleDelete, handleSaveToFirebase, isDirty } = useCategoriesState();
  const { t } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [presetParentId, setPresetParentId] = useState(null);

  const openAdd = () => { setEditingCategory(null); setPresetParentId(null); setModalVisible(true); };

  const openAddChild = (parentCategory) => {
    setEditingCategory(null);
    setPresetParentId(parentCategory.id);
    setModalVisible(true);
  };

  const openEdit = (cat) => { setEditingCategory(cat); setPresetParentId(null); setModalVisible(true); };
  const closeModal = () => { setModalVisible(false); setPresetParentId(null); };

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
      <Toolbar onAdd={openAdd} />
      <CategoryTree
        tree={tree}
        onEdit={openEdit}
        onAddChild={openAddChild}
        onDelete={handleDelete}
      />
      {isDirty && (
        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveToFirebase} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>{t('adminCategoriesSaveBtn')}</Text>
        </TouchableOpacity>
      )}
      <CategoryFormModal
        visible={modalVisible}
        category={editingCategory}
        categories={allCategories}
        presetParentId={presetParentId}
        onSave={handleSave}
        onClose={closeModal}
      />
    </View>
  );
}
