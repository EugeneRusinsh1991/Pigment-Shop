import { Text, TextInput, TouchableOpacity, View } from 'react-native';
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

function buildFieldConfig(t, values, setters) {
  const { firstName, lastName, phone, city } = values;
  const { setFirstName, setLastName, setPhone, setCity } = setters;
  return [
    { key: 'firstName', labelKey: 'profileFirstName', fallback: 'First Name',  value: firstName,  onChange: setFirstName },
    { key: 'lastName',  labelKey: 'profileLastName',  fallback: 'Last Name',   value: lastName,   onChange: setLastName  },
    { key: 'phone',     labelKey: 'profilePhone',      fallback: 'Phone',       value: phone,      onChange: setPhone, placeholder: '+1 234 567 8900', keyboardType: 'phone-pad' },
    { key: 'city',      labelKey: 'profileCity',       fallback: 'City',        value: city,       onChange: setCity  },
  ].map((f) => ({
    ...f,
    label: `${t(f.labelKey) || f.fallback} *`,
    placeholder: f.placeholder || t(f.labelKey) || f.fallback,
  }));
}

export default function ProfileFormCard({
  email, firstName, lastName, phone, city,
  setFirstName, setLastName, setPhone, setCity,
  saving, loading, onSave,
  isDark, selectTheme, t,
}) {
  const fieldProps = { isDark, selectTheme };
  const fields = buildFieldConfig(t, { firstName, lastName, phone, city }, { setFirstName, setLastName, setPhone, setCity });

  return (
    <View style={[commonStyles.card, selectTheme(commonStyles.cardDark, selectTheme(commonStyles.cardLight)), styles.cardSpecific]}>
      <EmailField label={t('profileEmail')} email={email} selectTheme={selectTheme} />

      {fields.map((f) => (
        <ProfileTextField
          key={f.key}
          {...fieldProps}
          label={f.label}
          placeholder={f.placeholder}
          value={f.value}
          onChangeText={f.onChange}
          keyboardType={f.keyboardType}
        />
      ))}

      <SaveButton saving={saving} loading={loading} onSave={onSave} selectTheme={selectTheme} label={t('profileSaveBtn')} />

      <Text style={[styles.requiredNote, selectTheme(commonStyles.subtextDark, commonStyles.subtextLight)]}>
        {t('profileRequiredNote')}
      </Text>
    </View>
  );
}
