/**
 * ProductFormModal.js
 *
 * Modal for creating or editing a product.
 * Validates required fields and calls onSave(formData).
 */
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  BrandSkuRow,
  CategoryStockRow,
  DescriptionField,
  FlagsSection,
  ImageField,
  NameField,
  PriceDiscountRow,
} from './ProductFormFields';
import styles from './ProductFormStyles';

const EMPTY_FORM = {
  label: '', description: '', price: '', discountPercent: '', isNew: false,
  brand: '', sku: '', category: 'Другое', stock: '', image: '', active: true,
};

function buildInitialForm(product) {
  if (!product) return { ...EMPTY_FORM };
  return {
    label: product.label ?? '',
    description: product.description ?? '',
    price: String(product.price ?? ''),
    discountPercent: String(product.discountPercent ?? ''),
    isNew: !!product.isNew,
    brand: product.brand ?? '',
    sku: product.sku ?? '',
    category: product.category ?? 'Другое',
    stock: String(product.stock ?? ''),
    image: product.image ?? '',
    active: product.active !== false,
  };
}

function validateForm(form) {
  const errors = {};
  if (!form.label.trim()) errors.label = 'Обязательное поле';
  const price = parseFloat(form.price);
  if (isNaN(price) || price <= 0) errors.price = 'Введите корректную цену';
  return errors;
}

function parseFormToProduct(form) {
  return {
    label: form.label.trim(),
    description: form.description.trim(),
    price: parseFloat(form.price) || 0,
    discountPercent: parseInt(form.discountPercent, 10) || 0,
    isNew: form.isNew,
    brand: form.brand.trim(),
    sku: form.sku.trim(),
    category: form.category,
    stock: parseInt(form.stock, 10) || 0,
    image: form.image.trim(),
    active: form.active,
  };
}

function ModalHeader({ isEdit, onClose }) {
  return (
    <View style={styles.modalHeader}>
      <Text style={styles.modalTitle}>{isEdit ? 'Редактировать товар' : 'Новый товар'}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.modalCloseBtn}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

function ModalFooter({ onCancel, onSave }) {
  return (
    <View style={styles.modalFooter}>
      <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
        <Text style={styles.cancelBtnText}>Отмена</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
        <Text style={styles.saveBtnText}>Сохранить</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ProductFormModal({ visible, product, onSave, onClose }) {
  const [form, setForm] = useState(() => buildInitialForm(product));
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (visible) {
      setForm(buildInitialForm(product));
      setErrors({});
    }
  }, [visible, product]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSave = () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(parseFormToProduct(form));
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <ModalHeader isEdit={!!product} onClose={onClose} />
          <ScrollView style={styles.modalBody}>
            <NameField form={form} onChange={handleChange} errors={errors} />
            <DescriptionField form={form} onChange={handleChange} />
            <PriceDiscountRow form={form} onChange={handleChange} errors={errors} />
            <BrandSkuRow form={form} onChange={handleChange} />
            <CategoryStockRow form={form} onChange={handleChange} />
            <ImageField form={form} onChange={handleChange} />
            <FlagsSection form={form} onChange={handleChange} />
          </ScrollView>
          <ModalFooter onCancel={onClose} onSave={handleSave} />
        </View>
      </View>
    </Modal>
  );
}
