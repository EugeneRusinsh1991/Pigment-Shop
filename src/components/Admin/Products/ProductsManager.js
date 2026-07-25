/**
 * ProductsManager.js
 *
 * Products tab: search toolbar + add button + products table + form modal.
 *
 * Mutations flow through adminDomain (the dedicated admin command
 * layer) rather than directly touching the shared catalog state.
 * Read helpers (getAllProducts, searchProducts) remain in adminProductsTransforms.
 */
import { useState } from 'react';
import { TextInput, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { SearchInput } from '../../Search';
import ProductFormModal from './ProductFormModal';
import ProductsFilterBar from './ProductsFilterBar';
import styles from './ProductsStyles';
import ProductsTable from './ProductsTable';
import { useProductsWorkflow } from './useProductsWorkflow';
import { useFormModal } from '../../../hooks/useFormModal';
import AdminSaveFooter from '../shared/AdminSaveFooter';

export default function ProductsManager() {
  const {
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
    handleSaveToFirebase: handleBatchSave,
    isSaving,
    isDirty,
  } = useProductsWorkflow();
  const { t } = useTheme();
  const { isVisible: modalVisible, editingItem: editingProduct, openForCreate: openAdd, openForEdit: openEdit, close: closeModal } = useFormModal();

  const handleSave = (formData) => {
    if (editingProduct) {
      handleUpdate(editingProduct.id, formData);
    } else {
      handleAdd(formData);
    }
    closeModal();
  };

  return (
    <View style={styles.container}>
      <SearchInput
        value={query}
        onChangeText={setQuery}
        placeholder={t('adminProductsSearchPlaceholder')}
        style={styles.toolbar}
      />
      <ProductsFilterBar
        onlyDiscount={onlyDiscount}
        onlyNew={onlyNew}
        onToggleDiscount={() => setOnlyDiscount((v) => !v)}
        onToggleNew={() => setOnlyNew((v) => !v)}
        onAdd={openAdd}
      />
      <ProductsTable
        products={displayedProducts}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        onEdit={openEdit}
      />
      <ProductFormModal
        visible={modalVisible}
        product={editingProduct}
        onSave={handleSave}
        onClose={closeModal}
        onDelete={handleDelete}
      />
      <AdminSaveFooter 
        isDirty={isDirty} 
        isSaving={isSaving} 
        onSave={handleBatchSave} 
      />
    </View>
  );
}
