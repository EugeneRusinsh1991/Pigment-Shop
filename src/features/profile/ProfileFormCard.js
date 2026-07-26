import { Text, View } from 'react-native';
import Card from '../../components/Card';
import styles from './ProfilePageStyles';
import { Button } from '../../components/Button';
import { FieldInput } from '../../components/Admin/SharedFormComponents';

function EmailField({ label, email, selectTheme }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, selectTheme(styles.subtextDark, styles.subtextLight)]}>
        {label}
      </Text>
      <View style={[styles.inputContainer, selectTheme(styles.inputContainerDark, styles.inputContainerLight), styles.inputDisabled]}>
        <Text style={[styles.value, selectTheme(styles.subtextDark, styles.subtextLight)]}>
          {email || 'user@example.com'}
        </Text>
      </View>
    </View>
  );
}

function ProfileTextField({ label, placeholder, value, onChangeText, isDark, selectTheme, keyboardType }) {
  return (
    <FieldInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      isDark={isDark}
      style={styles.inputGroup}
      styles={{
        fieldLabel: [styles.label, selectTheme(styles.textDark, styles.textLight)],
        fieldInput: [styles.input, selectTheme(styles.textDark, styles.textLight)],
        inputContainer: [styles.inputContainer, selectTheme(styles.inputContainerDark, styles.inputContainerLight)],
      }}
      leftIcon={null}
    />
  );
}

function SaveButton({ saving, loading, onSave, label }) {
  return (
    <Button
      title={label}
      onPress={onSave}
      loading={saving}
      disabled={saving || loading}
      variant="primary"
      size="md"
      style={{ marginTop: 6 }}
    />
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
    <Card
      isDark={isDark}
      style={styles.cardSpecific}
    >
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

      <Text style={[styles.requiredNote, isDark ? styles.subtextDark : styles.subtextLight]}>
        {t('profileRequiredNote')}
      </Text>
    </Card>
  );
}
