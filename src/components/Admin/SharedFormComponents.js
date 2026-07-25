import React from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/tokens';
import { useTheme } from '../../context/ThemeContext';

import FieldError from '../FieldError';

export function FieldInput({ label, value, onChangeText, placeholder, error, keyboardType, styles, style, leftIcon, rightIcon, ...props }) {
  const [isFocused, setIsFocused] = React.useState(false);
  const containerStyle = styles?.fieldGroup || style;
  return (
    <View style={containerStyle}>
      {label ? <Text style={styles?.fieldLabel}>{label}</Text> : null}
      {leftIcon || rightIcon ? (
        <View style={styles?.inputContainer || { flexDirection: 'row', alignItems: 'center' }}>
          {leftIcon}
          <TextInput
            style={[
              styles?.fieldInput,
              isFocused && { borderColor: colors.accentBlue, borderWidth: 1.5 },
              error && styles?.fieldInputError,
            ]}
            value={String(value ?? '')}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={props.placeholderTextColor || colors.slateText}
            keyboardType={keyboardType}
            autoCapitalize="none"
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          {rightIcon}
        </View>
      ) : (
        <TextInput
          style={[
            styles?.fieldInput,
            isFocused && { borderColor: colors.accentBlue, borderWidth: 1.5 },
            error && styles?.fieldInputError,
          ]}
          value={String(value ?? '')}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={props.placeholderTextColor || colors.slateText}
          keyboardType={keyboardType}
          autoCapitalize="none"
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
      )}
      <FieldError error={error} />
    </View>
  );
}

export function FieldTextarea({ label, value, onChangeText, placeholder, numberOfLines = 2, error, styles, style, ...props }) {
  const [isFocused, setIsFocused] = React.useState(false);
  const containerStyle = styles?.fieldGroup || style;
  return (
    <View style={containerStyle}>
      {label ? <Text style={styles?.fieldLabel}>{label}</Text> : null}
      <TextInput
        style={[
          styles?.fieldTextarea,
          isFocused && { borderColor: colors.accentBlue, borderWidth: 1.5 },
          error && styles?.fieldInputError,
        ]}
        value={String(value ?? '')}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={props.placeholderTextColor || colors.slateText}
        multiline
        numberOfLines={numberOfLines}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
      <FieldError error={error} />
    </View>
  );
}

import { CrossIcon } from '@/components/Icons';

import Button from '../Button';
import ChipButton from '../ChipButton';
import IconButton from '../IconButton';

function ModalHeader({ title, onClose, styles }) {
  return (
    <View style={styles.modalHeader}>
      {title ? <Text style={styles.modalTitle}>{title}</Text> : <View />}
      <IconButton
        icon={<CrossIcon color={colors.slateText} size={14} />}
        onPress={onClose}
        variant="transparent"
        size="sm"
      />
    </View>
  );
}

function ModalFooter({ onCancel, onSave, styles, footerLeft }) {
  const { t } = useTheme();
  return (
    <View style={styles.modalFooter}>
      {footerLeft ?? <View />}
      <View style={styles.modalFooterRight ?? { flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Button
          title={t('btnCancelLabel')}
          onPress={onCancel}
          variant="secondary"
          size="md"
        />
        <Button
          title={t('btnSaveLabel')}
          onPress={onSave}
          variant="success"
          size="md"
        />
      </View>
    </View>
  );
}

export function FormModalLayout({ visible, title, onClose, onSave, styles, cardWidth, children, footerLeft, footer }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalCard, cardWidth ? { width: cardWidth } : null]}>
          <ModalHeader title={title} onClose={onClose} styles={styles} />
          <ScrollView style={styles.modalBody} keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
          {footer ?? <ModalFooter onCancel={onClose} onSave={onSave} styles={styles} footerLeft={footerLeft} />}
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
          <ChipButton
            key={item.code}
            label={item.label}
            active={isActive}
            variant="rect"
            onPress={() => onChange(item.code)}
          />
        );
      })}
    </View>
  );
}
