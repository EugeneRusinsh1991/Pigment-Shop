import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import commonStyles from '../theme/commonStyles';
import styles from './ProfilePageStyles';

const getPlaceholderColor = (isDark) => (isDark ? '#888' : '#aaa');

function EmailField({ label, email, selectTheme }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, selectTheme(commonStyles.subtextDark, commonStyles.subtextLight)]}>
        {label}
      </Text>
      <View style={[styles.inputContainer, selectTheme(styles.inputContainerDark, styles.inputContainerLight), styles.inputDisabled]}>
        <Text style={[styles.value, selectTheme(commonStyles.subtextDark, commonStyles.subtextLight)]}>
          {email || 'user@example.com'}
        </Text>
      </View>
    </View>
  );
}

function ProfileTextField({ label, placeholder, value, onChangeText, isDark, selectTheme, keyboardType }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, selectTheme(commonStyles.textDark, commonStyles.textLight)]}>
        {label}
      </Text>
      <View style={[styles.inputContainer, selectTheme(styles.inputContainerDark, styles.inputContainerLight)]}>
        <TextInput
          style={[styles.input, selectTheme(commonStyles.textDark, commonStyles.textLight)]}
          placeholder={placeholder}
          placeholderTextColor={getPlaceholderColor(isDark)}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
}

function SaveButton({ saving, loading, onSave, selectTheme, label }) {
  const isDisabled = saving || loading;
  return (
    <TouchableOpacity
      style={[styles.saveBtn, selectTheme(styles.saveBtnDark, styles.saveBtnLight), isDisabled && styles.saveBtnDisabled]}
      onPress={onSave}
      disabled={isDisabled}
    >
      <Text style={[styles.saveBtnText, selectTheme(styles.saveBtnTextDark, styles.saveBtnTextLight)]}>
        {saving ? '...' : label}
      </Text>
    </TouchableOpacity>
  );
}

export default function ProfileFormCard({
  email, firstName, lastName, phone,
  setFirstName, setLastName, setPhone,
  saving, loading, onSave,
  isDark, selectTheme, t,
}) {
  const fieldProps = { isDark, selectTheme };
  return (
    <View style={[commonStyles.card, selectTheme(commonStyles.cardDark, commonStyles.cardLight), styles.cardSpecific]}>
      <EmailField label={t('profileEmail')} email={email} selectTheme={selectTheme} />

      <ProfileTextField {...fieldProps} label={t('profileFirstName') || 'First Name'} placeholder={t('profileFirstName') || 'First Name'} value={firstName} onChangeText={setFirstName} />
      <ProfileTextField {...fieldProps} label={t('profileLastName') || 'Last Name'} placeholder={t('profileLastName') || 'Last Name'} value={lastName} onChangeText={setLastName} />
      <ProfileTextField {...fieldProps} label={t('profilePhone') || 'Phone'} placeholder="+1 234 567 8900" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <SaveButton saving={saving} loading={loading} onSave={onSave} selectTheme={selectTheme} label={t('profileSaveBtn')} />
    </View>
  );
}
