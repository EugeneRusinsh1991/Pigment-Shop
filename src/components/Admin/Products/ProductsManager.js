/**
 * ProductsManager.js
 *
 * Products tab: search toolbar + add button + products table + form modal.
 *
 * Mutations flow through adminCatalogBoundary (the dedicated admin command
 * layer) rather than directly touching the shared catalog state.
 * Read helpers (getAllProducts, searchProducts) remain in adminProductsService.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getAllProducts, searchProducts } from '../../../services/adminProductsService';
import {
  addProduct,
  updateProduct,
  removeProduct,
} from '../../../services/adminCatalogBoundary';
import ProductFormModal from './ProductFormModal';
import ProductsTable from './ProductsTable';
import styles from './ProductsStyles';
import { useTheme } from '../../../context/ThemeContext';

function SearchToolbar({ query, onChangeQuery, onAdd }) {
  const { t } = useTheme();
  return (
    <View style={styles.toolbar}>
      <View style={styles.searchInputWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={onChangeQuery}
          placeholder={t('adminProductsSearchPlaceholder')}
          placeholderTextColor="#CBD5E1"
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={onAdd} activeOpacity={0.85}>
        <Text style={styles.addBtnText}>{t('adminProductsAddBtn')}</Text>
      </TouchableOpacity>
    </View>
  );
}

function useProductsState() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  const refresh = useCallback((q) => {
    setProducts(q ? searchProducts(q) : getAllProducts());
  }, []);

  useEffect(() => { refresh(query); }, [query, refresh]);

  const handleAdd = useCallback((formData) => {
    addProduct(formData);
    refresh(query);
  }, [query, refresh]);

  const handleUpdate = useCallback((id, formData) => {
    updateProduct(id, formData);
    refresh(query);
  }, [query, refresh]);

  const handleDelete = useCallback((id) => {
    removeProduct(id);
    refresh(query);
  }, [query, refresh]);

  return { products, query, setQuery, handleAdd, handleUpdate, handleDelete };
}

export default function ProductsManager() {
  const { products, query, setQuery, handleAdd, handleUpdate, handleDelete } = useProductsState();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const openAdd = () => { setEditingProduct(null); setModalVisible(true); };
  const openEdit = (product) => { setEditingProduct(product); setModalVisible(true); };
  const closeModal = () => setModalVisible(false);

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
      <SearchToolbar query={query} onChangeQuery={setQuery} onAdd={openAdd} />
      <ProductsTable products={products} onEdit={openEdit} onDelete={handleDelete} />
      <ProductFormModal
        visible={modalVisible}
        product={editingProduct}
        onSave={handleSave}
        onClose={closeModal}
      />
    </View>
  );
}
