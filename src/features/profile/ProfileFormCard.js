import { View } from 'react-native';
import { Button } from '../../components/ui/Button';
import Card from '../../components/ui/Card/Card';
import { Text } from '../../components/ui/Text';
import { FieldInput } from '../admin/SharedFormComponents';
import useGridLayout from '../../hooks/useGridLayout';
import { hapticTokens } from '../../theme/tokens';
import styles from './ProfilePageStyles';

function EmailField({ label, email, isDark, selectTheme }) {
  return (
    <FieldInput
      label={label}
      value={email || 'user@example.com'}
      disabled
      isDark={isDark}
      style={styles.inputGroup}
      styles={{
        fieldLabel: [styles.label, selectTheme(styles.textDark, styles.textLight)],
        fieldInput: [styles.input, styles.inputDisabled, selectTheme(styles.textDark, styles.textLight)],
        inputContainer: [styles.inputContainer, selectTheme(styles.inputContainerDark, styles.inputContainerLight), styles.inputDisabled],
      }}
      leftIcon={null}
    />
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
      haptic={hapticTokens.success}
      style={styles.saveBtnMargin}
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
  const { isWide } = useGridLayout();
  const fieldProps = { isDark, selectTheme };
  const fields = buildFieldConfig(t, { firstName, lastName, phone, city }, { setFirstName, setLastName, setPhone, setCity });

  const getField = (key) => fields.find(f => f.key === key);
  const renderField = (key) => {
    const f = getField(key);
    if (!f) return null;
    return (
      <ProfileTextField
        key={f.key}
        {...fieldProps}
        label={f.label}
        placeholder={f.placeholder}
        value={f.value}
        onChangeText={f.onChange}
        keyboardType={f.keyboardType}
      />
    );
  };

  return (
    <Card
      isDark={isDark}
      style={[styles.cardSpecific, selectTheme(styles.cardSpecificDark, styles.cardSpecificLight)]}
    >
      <View style={isWide ? styles.formRow : styles.formRowMobile}>
        <View style={styles.formCol}>
          <EmailField label={t('profileEmail')} email={email} isDark={isDark} selectTheme={selectTheme} />
        </View>
        <View style={styles.formCol}>{renderField('phone')}</View>
      </View>

      <View style={isWide ? styles.formRow : styles.formRowMobile}>
        <View style={styles.formCol}>{renderField('firstName')}</View>
        <View style={styles.formCol}>{renderField('lastName')}</View>
      </View>

      <View style={isWide ? styles.formRow : styles.formRowMobile}>
        <View style={styles.formCol}>{renderField('city')}</View>
      </View>

      <SaveButton saving={saving} loading={loading} onSave={onSave} selectTheme={selectTheme} label={t('profileSaveBtn')} />

      <Text variant="caption" color="muted" style={styles.requiredNote}>
        {t('profileRequiredNote')}
      </Text>
    </Card>
  );
}
