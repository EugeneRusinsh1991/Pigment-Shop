import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import styles from './CartViewStyles';
import { Button } from '../../components/Button';
import { Link } from 'expo-router';
import { FieldInput, FieldTextarea } from '../../components/Admin/SharedFormComponents';
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
        <Text style={[styles.summaryLabel, ic(styles.summaryLabelDark, styles.summaryLabelLight)]}>
          {t('cartItemsCount')}
        </Text>
        <Text style={[styles.summaryValue, ic(styles.summaryValueDark, styles.summaryValueLight)]}>
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
          placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
          keyboardType={field.keyboardType}
          autoCapitalize={field.autoCapitalize || 'sentences'}
          style={styles.inputGroup}
          styles={{
            fieldLabel: [styles.label, ic(styles.summaryLabelDark, styles.summaryLabelLight)],
            fieldInput: [styles.input, ic(styles.textDark, styles.textLight)],
            inputContainer: [styles.inputContainer, ic(styles.inputContainerDark, styles.inputContainerLight)],
          }}
        />
      ))}

      <Text style={[styles.requiredNote, ic(styles.summaryLabelDark, styles.summaryLabelLight)]}>
        {`${t('profileRequiredNote')}`}
      </Text>

      <View style={styles.summaryDivider} />

      <FieldTextarea
        label={t('cartOrderNote')}
        value={note}
        onChangeText={onNoteChange}
        placeholder={t('cartOrderNotePlaceholder')}
        placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
        numberOfLines={3}
        styles={{
          fieldLabel: [styles.noteLabel, ic(styles.summaryLabelDark, styles.summaryLabelLight)],
          fieldTextarea: [styles.noteInput, ic(styles.noteInputDark, styles.noteInputLight)],
        }}
      />

      <View style={styles.summaryDivider} />

      <View style={styles.summaryRow}>
        <Text style={[styles.totalLabel, ic(styles.totalLabelDark, styles.totalLabelLight)]}>
          {t('cartTotal')}
        </Text>
        <Text style={[styles.totalPrice, ic(styles.totalPriceDark, styles.totalPriceLight)]}>
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
          style={{ marginTop: 12 }}
        />
      </Link>
    </View>
  );
}
