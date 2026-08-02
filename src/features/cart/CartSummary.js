import { Link } from 'expo-router';
import { View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Text } from '../../components/ui/Text';
import { hapticTokens } from '../../theme/tokens';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { FieldInput, FieldTextarea } from '../admin/SharedFormComponents';
import styles from './CartViewStyles';

const CHECKOUT_INPUT_FIELDS = [
  { labelKey: 'profileEmail', field: 'email', keyboardType: 'email-address', autoCapitalize: 'none' },
  { labelKey: 'profileFirstName', field: 'firstName' },
  { labelKey: 'profileLastName', field: 'lastName' },
  { labelKey: 'profilePhone', field: 'phone', keyboardType: 'phone-pad' },
  { labelKey: 'profileCity', field: 'city' },
];

export default function CartSummary({ totalItems, totalPrice, isWide, isDark, note, onNoteChange, onCheckout,
  email, firstName, lastName, phone, city,
  onEmailChange, onFirstNameChange, onLastNameChange, onPhoneChange, onCityChange,
}) {
  const { t } = useLanguage();
  const ic = (dark, light) => (isDark ? dark : light);

  const fieldValues = { email, firstName, lastName, phone, city };
  const fieldHandlers = { onEmailChange, onFirstNameChange, onLastNameChange, onPhoneChange, onCityChange };

  const inputFields = CHECKOUT_INPUT_FIELDS.map((fieldConfig) => ({
    labelKey: fieldConfig.labelKey,
    value: fieldValues[fieldConfig.field],
    onChange: fieldHandlers[`on${fieldConfig.field.charAt(0).toUpperCase() + fieldConfig.field.slice(1)}Change`],
    keyboardType: fieldConfig.keyboardType,
    autoCapitalize: fieldConfig.autoCapitalize,
  }));

  return (
    <View
      style={[
        styles.summaryPanel,
        ic(styles.summaryPanelDark, styles.summaryPanelLight),
        isWide ? styles.summaryPanelWide : styles.summaryPanelMobile,
      ]}
    >
      <View style={styles.summaryRow}>
        <Text variant="caption" color="muted">
          {t('cartItemsCount')}
        </Text>
        <Text variant="body1" weight="bold">
          {totalItems}
        </Text>
      </View>

      <View style={styles.summaryDivider} />

      {inputFields.map((field) => (
        <FieldInput
          key={field.labelKey}
          label={`${t(field.labelKey)} *`}
          value={field.value}
          onChangeText={field.onChange}
          placeholder={t(field.labelKey)}
          keyboardType={field.keyboardType}
          autoCapitalize={field.autoCapitalize || 'sentences'}
          isDark={isDark}
          style={styles.inputGroup}
          styles={{
            fieldLabel: [styles.label],
            fieldInput: [styles.input],
            inputContainer: [styles.inputContainer, ic(styles.inputContainerDark, styles.inputContainerLight)],
          }}
        />
      ))}

      <Text variant="caption" color="muted" style={styles.requiredNote}>
        {`${t('profileRequiredNote')}`}
      </Text>

      <View style={styles.summaryDivider} />

      <FieldTextarea
        label={t('cartOrderNote')}
        value={note}
        onChangeText={onNoteChange}
        placeholder={t('cartOrderNotePlaceholder')}
        isDark={isDark}
        numberOfLines={3}
        styles={{
          fieldLabel: [styles.noteLabel],
          fieldTextarea: [styles.noteInput, ic(styles.noteInputDark, styles.noteInputLight)],
        }}
      />

      <View style={styles.summaryDivider} />

      <View style={styles.summaryRow}>
        <Text variant="caption" color="muted">
          {t('cartTotal')}
        </Text>
        <Text variant="h3" weight="bold">
          ${totalPrice.toLocaleString()}
        </Text>
      </View>

      <Link href="/order-confirmation" asChild onPress={(e) => {
        e.preventDefault();
        onCheckout();
      }}>
        <Button
          title={t('cartCheckoutBtn')}
          variant="primary"
          size="lg"
          haptic={hapticTokens.impactMedium}
          style={styles.checkoutBtnSpacing}
        />
      </Link>
    </View>
  );
}
