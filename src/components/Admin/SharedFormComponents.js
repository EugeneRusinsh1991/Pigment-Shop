import React from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, layout } from '../../theme/tokens';
import { useTheme } from '../../context/ThemeContext';

import FieldError from '../FieldError';

function FieldLabelRow({ label, labelIcon, styles }) {
  if (!label && !labelIcon) return null;
  return (
    <View style={styles?.labelRow || { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
      {labelIcon}
      {label ? <Text style={styles?.fieldLabel}>{label}</Text> : null}
    </View>
  );
}

function FieldTextInputCore({ isFocused, setIsFocused, value, onChangeText, placeholder, error, keyboardType, styles, inputStyle, extraStyle, ...props }) {
  return (
    <TextInput
      testID={props.testID}
      dataSet={{ testid: props.testID }}
      style={[
        styles?.fieldInput,
        inputStyle,
        extraStyle,
        isFocused && { borderColor: colors.accentBlue, borderWidth: 1.5 },
        error && styles?.fieldInputError,
      ]}
      value={String(value ?? '')}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={props.placeholderTextColor || colors.slateText}
      keyboardType={keyboardType}
      autoCapitalize="none"
      onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
      {...props}
    />
  );
}

export function FieldInput({ label, labelIcon, value, onChangeText, placeholder, error, keyboardType, styles, style, inputStyle, leftIcon, rightIcon, ...props }) {
  const [isFocused, setIsFocused] = React.useState(false);
  const sharedInputProps = { isFocused, setIsFocused, value, onChangeText, placeholder, error, keyboardType, styles, inputStyle, ...props };
  return (
    <View style={styles?.fieldGroup || style}>
      <FieldLabelRow label={label} labelIcon={labelIcon} styles={styles} />
      {leftIcon || rightIcon ? (
        <View style={styles?.inputContainer || { flexDirection: 'row', alignItems: 'center' }}>
          {leftIcon}
          <FieldTextInputCore {...sharedInputProps} />
          {rightIcon}
        </View>
      ) : (
        <FieldTextInputCore {...sharedInputProps} />
      )}
      <FieldError error={error} />
    </View>
  );
}

export function FieldTextarea({ label, labelIcon, value, onChangeText, placeholder, numberOfLines = 2, error, styles, style, inputStyle, ...props }) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={styles?.fieldGroup || style}>
      <FieldLabelRow label={label} labelIcon={labelIcon} styles={styles} />
      <FieldTextInputCore
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        error={error}
        styles={{ fieldInput: styles?.fieldTextarea, fieldInputError: styles?.fieldInputError }}
        inputStyle={inputStyle}
        multiline
        numberOfLines={numberOfLines}
        {...props}
      />
      <FieldError error={error} />
    </View>
  );
}

import { CrossIcon } from '@/components/Icons';

import { Button, IconButton } from '../Button';

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
      <View style={[styles.modalOverlay, { zIndex: layout.zIndices.modal }]}>
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

export { LanguageTabs } from './LanguageTabs';
