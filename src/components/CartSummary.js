import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import styles from './CartView/CartViewStyles';

export default function CartSummary({ totalItems, totalPrice, isWide, isDark, note, onNoteChange, onCheckout,
  email, firstName, lastName, phone, city,
  onEmailChange, onFirstNameChange, onLastNameChange, onPhoneChange, onCityChange,
}) {
  const { t } = useTheme();
  const ic = (dark, light) => (isDark ? dark : light);

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

      <View style={styles.inputGroup}>
        <Text style={[styles.label, ic(styles.summaryLabelDark, styles.summaryLabelLight)]}>
          {`${t('profileEmail')} *`}
        </Text>
        <View style={[styles.inputContainer, ic(styles.inputContainerDark, styles.inputContainerLight)]}>
          <TextInput
            style={[styles.input, ic(styles.textDark, styles.textLight)]}
            placeholder={t('profileEmail')}
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            value={email}
            onChangeText={onEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, ic(styles.summaryLabelDark, styles.summaryLabelLight)]}>
          {`${t('profileFirstName')} *`}
        </Text>
        <View style={[styles.inputContainer, ic(styles.inputContainerDark, styles.inputContainerLight)]}>
          <TextInput
            style={[styles.input, ic(styles.textDark, styles.textLight)]}
            placeholder={t('profileFirstName')}
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            value={firstName}
            onChangeText={onFirstNameChange}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, ic(styles.summaryLabelDark, styles.summaryLabelLight)]}>
          {`${t('profileLastName')} *`}
        </Text>
        <View style={[styles.inputContainer, ic(styles.inputContainerDark, styles.inputContainerLight)]}>
          <TextInput
            style={[styles.input, ic(styles.textDark, styles.textLight)]}
            placeholder={t('profileLastName')}
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            value={lastName}
            onChangeText={onLastNameChange}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, ic(styles.summaryLabelDark, styles.summaryLabelLight)]}>
          {`${t('profilePhone')} *`}
        </Text>
        <View style={[styles.inputContainer, ic(styles.inputContainerDark, styles.inputContainerLight)]}>
          <TextInput
            style={[styles.input, ic(styles.textDark, styles.textLight)]}
            placeholder={t('profilePhone')}
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            value={phone}
            onChangeText={onPhoneChange}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, ic(styles.summaryLabelDark, styles.summaryLabelLight)]}>
          {`${t('profileCity')} *`}
        </Text>
        <View style={[styles.inputContainer, ic(styles.inputContainerDark, styles.inputContainerLight)]}>
          <TextInput
            style={[styles.input, ic(styles.textDark, styles.textLight)]}
            placeholder={t('profileCity')}
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            value={city}
            onChangeText={onCityChange}
          />
        </View>
      </View>

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

      <TouchableOpacity 
        style={[styles.checkoutBtn, ic(styles.checkoutBtnDark, styles.checkoutBtnLight)]}
        onPress={onCheckout}
      >
        <Text style={[styles.checkoutBtnText, ic(styles.checkoutBtnTextDark, styles.checkoutBtnTextLight)]}>
          {t('cartCheckoutBtn')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
