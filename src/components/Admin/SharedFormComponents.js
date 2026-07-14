import React from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export function FieldInput({ label, value, onChangeText, placeholder, error, keyboardType, styles }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.fieldInput, error && styles.fieldInputError]}
        value={String(value ?? '')}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#CBD5E1"
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export function FieldTextarea({ label, value, onChangeText, placeholder, numberOfLines = 2, styles }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.fieldTextarea}
        value={String(value ?? '')}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#CBD5E1"
        multiline
        numberOfLines={numberOfLines}
      />
    </View>
  );
}

import { CrossIcon } from '../Icons';

function ModalHeader({ title, onClose, styles }) {
  return (
    <View style={styles.modalHeader}>
      <Text style={styles.modalTitle}>{title}</Text>
      <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
        <CrossIcon color="#94A3B8" size={14} />
      </TouchableOpacity>
    </View>
  );
}

function ModalFooter({ onCancel, onSave, styles }) {
  const { t } = useTheme();
  return (
    <View style={styles.modalFooter}>
      <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
        <Text style={styles.cancelBtnText}>{t('btnCancelLabel')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
        <Text style={styles.saveBtnText}>{t('btnSaveLabel')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export function FormModalLayout({ visible, title, onClose, onSave, styles, cardWidth, children }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalCard, cardWidth ? { width: cardWidth } : null]}>
          <ModalHeader title={title} onClose={onClose} styles={styles} />
          <ScrollView style={styles.modalBody}>
            {children}
          </ScrollView>
          <ModalFooter onCancel={onClose} onSave={onSave} styles={styles} />
        </View>
      </View>
    </Modal>
  );
}

const LANGUAGES = [
  { code: 'uk', label: 'UA' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
];

export function LanguageTabs({ activeLang, onChange }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
      {LANGUAGES.map((item) => {
        const isActive = activeLang === item.code;
        return (
          <TouchableOpacity
            key={item.code}
            style={[
              {
                paddingVertical: 6,
                paddingHorizontal: 16,
                borderRadius: 6,
                backgroundColor: isActive ? '#1C1C1C' : '#F1F5F9',
                borderWidth: 1,
                borderColor: isActive ? '#1C1C1C' : '#E2E8F0',
              }
            ]}
            onPress={() => onChange(item.code)}
          >
            <Text style={{ fontSize: 13, fontWeight: '600', color: isActive ? '#FFFFFF' : '#475569' }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
