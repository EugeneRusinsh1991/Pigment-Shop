/**
 * ProductsManager.js
 *
 * Products tab: search toolbar + add button + products table + form modal.
 *
 * Mutations flow through adminDomain (the dedicated admin command
 * layer) rather than directly touching the shared catalog state.
 * Read helpers (getAllProducts, searchProducts) remain in adminProductsTransforms.
 */
import { useState, useEffect, useMemo } from 'react';
import { View, useWindowDimensions, ScrollView } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { SearchInput } from '@/components/domain/Search';
import ProductFormModal from './ProductFormModal';
import ProductsFilterBar from './ProductsFilterBar';
import styles from './ProductsStyles';
import ProductsTable from './ProductsTable';
import { useProductsWorkflow } from './useProductsWorkflow';
import AdminSaveFooter from '../AdminSaveFooter';
import CatalogPagination from '../../catalog/CatalogPagination';

const PAGE_SIZE = 50;

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
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState('list');
  const [editingProduct, setEditingProduct] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, sortField, sortDirection, onlyDiscount, onlyNew]);

  const totalPages = Math.ceil(displayedProducts.length / PAGE_SIZE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return displayedProducts.slice(start, start + PAGE_SIZE);
  }, [displayedProducts, currentPage]);

  const openAdd = () => {
    setEditingProduct(null);
    setViewMode('create');
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setViewMode('edit');
  };

  const closeForm = () => {
    setEditingProduct(null);
    setViewMode('list');
  };

  const handleSave = (formData) => {
    if (editingProduct) {
      handleUpdate(editingProduct.id, formData);
    } else {
      handleAdd(formData);
    }
    closeForm();
  };

  if (viewMode !== 'list') {
    return (
      <View style={styles.container}>
        <ProductFormModal
          product={editingProduct}
          onSave={handleSave}
          onClose={closeForm}
          onDelete={handleDelete}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { flex: 1 }]}>
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
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        <ProductsTable
          products={paginatedProducts}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onEdit={openEdit}
        />
      </ScrollView>
      {totalPages > 1 && (
        <CatalogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
          onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        />
      )}
      <AdminSaveFooter 
        isDirty={isDirty} 
        isSaving={isSaving} 
        onSave={handleBatchSave} 
      />
    </View>
  );
}
