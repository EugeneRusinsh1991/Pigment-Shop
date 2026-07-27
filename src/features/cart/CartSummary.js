import React from 'react';
import { View } from 'react-native';
import { Text } from '../../components/Text';
import { useTheme } from '../../context/ThemeContext';
import styles from './CartViewStyles';
import { Button } from '../../components/Button';
import { Link } from 'expo-router';
import { FieldInput, FieldTextarea } from '../admin/SharedFormComponents';
export default function CartSummary({ totalItems, totalPrice, isWide, isDark, note, onNoteChange, onCheckout,
  email, firstName, lastName, phone, city,
  onEmailChange, onFirstNameChange, onLastNameChange, onPhoneChange, onCityChange,
}) {
  const { t } = useTheme();
  const ic = (dark, light) => (isDark ? dark : light);

  const inputFields = [
    { labelKey: 'profileEmail', value: email, onChange: onEmailChange, keyboardType: 'email-address', autoCapitalize: 'none' },
    { labelKey: 'profileFirstName', value: firstName, onChange: onFirstNameChange },
    { labelKey: 'profileLastName', value: lastName, onChange: onLastNameChange },
    { labelKey: 'profilePhone', value: phone, onChange: onPhoneChange, keyboardType: 'phone-pad' },
    { labelKey: 'profileCity', value: city, onChange: onCityChange },
  ];

  return (
    <View
      style={[
        styles.summaryPanel,
        ic(styles.summaryPanelDark, styles.summaryPanelLight),
        isWide ? styles.summaryPanelWide : styles.summaryPanelMobile,
      ]}
    >
      <View style={styles.summaryRow}>
        <Text variant="label" color="muted">
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
        <Text variant="label" color="muted">
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
          style={styles.checkoutBtnSpacing}
        />
      </Link>
    </View>
  );
}
