import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import styles from './CartView/CartViewStyles';
import Button from './Button';
import { Link } from 'expo-router';
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
        <View style={styles.inputGroup} key={field.labelKey}>
          <Text style={[styles.label, ic(styles.summaryLabelDark, styles.summaryLabelLight)]}>
            {`${t(field.labelKey)} *`}
          </Text>
          <View style={[styles.inputContainer, ic(styles.inputContainerDark, styles.inputContainerLight)]}>
            <TextInput
              style={[styles.input, ic(styles.textDark, styles.textLight)]}
              placeholder={t(field.labelKey)}
              placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
              value={field.value}
              onChangeText={field.onChange}
              keyboardType={field.keyboardType}
              autoCapitalize={field.autoCapitalize || 'sentences'}
            />
          </View>
        </View>
      ))}

      <Text style={[styles.requiredNote, ic(styles.summaryLabelDark, styles.summaryLabelLight)]}>
        {`${t('profileRequiredNote')}`}
      </Text>

      <View style={styles.summaryDivider} />

      <Text style={[styles.noteLabel, ic(styles.summaryLabelDark, styles.summaryLabelLight)]}>
        {t('cartOrderNote')}
      </Text>
      <TextInput
        style={[styles.noteInput, ic(styles.noteInputDark, styles.noteInputLight)]}
        value={note}
        onChangeText={onNoteChange}
        placeholder={t('cartOrderNotePlaceholder')}
        placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
        multiline
        numberOfLines={3}
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
