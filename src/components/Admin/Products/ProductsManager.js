/**
 * ProductsManager.js
 *
 * Products tab: search toolbar + add button + products table + form modal.
 *
 * Mutations flow through adminDomain (the dedicated admin command
 * layer) rather than directly touching the shared catalog state.
 * Read helpers (getAllProducts, searchProducts) remain in adminProductsService.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import useSort from '../../../hooks/useSort';
import { useAdminDomain } from '../../../services/adminDomain';
import { getAllProducts, searchProducts } from '../../../services/adminProductsService';
import { SearchIcon } from '../../Icons';
import ProductFormModal from './ProductFormModal';
import ProductsFilterBar from './ProductsFilterBar';
import { applyFilters, applySort } from './productsSortFilter';
import styles from './ProductsStyles';
import ProductsTable from './ProductsTable';

function SearchToolbar({ query, onChangeQuery, onAdd }) {
  const { t } = useTheme();
  return (
    <View style={styles.toolbar}>
      <View style={styles.searchInputWrap}>
        <SearchIcon color="#CBD5E1" size={16} style={{ marginRight: 8 }} />
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
  const { addProduct, updateProduct, removeProduct, persistProducts } = useAdminDomain();
  const [products, setProducts] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const [query, setQuery] = useState('');
  const { sortField, setSortField, sortDirection, setSortDirection, handleSort } = useSort('');
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);

  const refresh = useCallback((q) => {
    setProducts(q ? searchProducts(q) : getAllProducts());
  }, []);

  useEffect(() => { refresh(query); }, [query, refresh]);

  const handleAdd = useCallback((formData) => {
    addProduct(formData);
    refresh(query);
    setIsDirty(true);
  }, [query, refresh]);

  const handleUpdate = useCallback((id, formData) => {
    updateProduct(id, formData);
    refresh(query);
    setIsDirty(true);
  }, [query, refresh]);

  const handleDelete = useCallback((id) => {
    removeProduct(id);
    refresh(query);
    setIsDirty(true);
  }, [query, refresh]);

  const { t } = useTheme();
  const handleSaveToFirebase = useCallback(async () => {
    try {
      await persistProducts(products);
      setIsDirty(false);
      if (typeof window !== 'undefined' && window.alert) {
        window.alert(t('adminProductsSaveSuccess'));
      } else {
        // React Native Alert fallback
        // eslint-disable-next-line no-undef
        Alert.alert(t('adminCategoriesSuccessTitle'), t('adminProductsSaveSuccess'));
      }
    } catch (err) {
      console.error('Failed to save products to Firebase:', err);
      if (typeof window !== 'undefined' && window.alert) {
        window.alert(t('adminProductsSaveError') + ': ' + err.message);
      } else {
        // eslint-disable-next-line no-undef
        Alert.alert(t('cartErrorTitle'), t('adminProductsSaveError') + ': ' + err.message);
      }
    }
  }, [products, persistProducts, t]);

  const displayedProducts = useMemo(() => {
    const filtered = applyFilters(products, { onlyDiscount, onlyNew });
    return applySort(filtered, sortField, sortDirection);
  }, [products, sortField, sortDirection, onlyDiscount, onlyNew]);

  return {
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
    handleSaveToFirebase,
    isDirty,
  };
}

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
    handleSaveToFirebase,
    isDirty,
  } = useProductsState();
  const { t } = useTheme();
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
      <ProductsFilterBar
        onlyDiscount={onlyDiscount}
        onlyNew={onlyNew}
        onToggleDiscount={() => setOnlyDiscount((v) => !v)}
        onToggleNew={() => setOnlyNew((v) => !v)}
      />
      <ProductsTable
        products={displayedProducts}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
      <ProductFormModal
        visible={modalVisible}
        product={editingProduct}
        onSave={handleSave}
        onClose={closeModal}
      />
      {isDirty && (
        <TouchableOpacity style={[styles.saveBtn, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }]} onPress={handleSaveToFirebase} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>{t('adminProductsSaveBtn')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
