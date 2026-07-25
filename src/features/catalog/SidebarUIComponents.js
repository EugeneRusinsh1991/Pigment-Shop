import { Text, View } from 'react-native';
import { CheckIcon } from '../../components/Icons';
import Button, { AnimatedButton } from '../../components/Button';
import { colors } from '../../theme/tokens';
import styles from './CatalogFilterSidebarStyles';
import { FieldInput } from '../../components/Admin/SharedFormComponents';

export function SectionTitle({ label, isDark, isPrice }) {
  return (
    <Text style={[isPrice ? styles.sectionTitlePrice : styles.sectionTitle, isDark ? styles.textDark : styles.textLight]}>
      {label}
    </Text>
  );
}

export function Checkbox({ checked, label, onToggle, isDark, testID }) {
  return (
    <AnimatedButton testID={testID || `filter-checkbox-${label}`} style={styles.checkRow} onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checkboxActive, { justifyContent: 'center', alignItems: 'center' }]}>
        {checked && <CheckIcon color={colors.white} size={10} />}
      </View>
      <Text style={[styles.checkLabel, isDark ? styles.textDark : styles.textLight]}>
        {label}
      </Text>
    </AnimatedButton>
  );
}

export function PriceInputs({ priceMin, priceMax, onMinChange, onMaxChange, isDark, t }) {
  const placeholderColor = isDark ? colors.textMutedDark : colors.textMutedLight;
  return (
    <View style={styles.priceColumn}>
      <FieldInput
        testID="filter-price-min"
        label={t('catalogPriceMin')}
        style={styles.priceFieldRow}
        styles={{
          fieldLabel: [styles.priceFieldLabel, isDark ? styles.textDark : styles.textLight],
          fieldInput: [styles.priceInput, isDark ? styles.inputDark : styles.inputLight],
        }}
        placeholder="0"
        placeholderTextColor={placeholderColor}
        keyboardType="numeric"
        value={priceMin}
        onChangeText={onMinChange}
      />
      <FieldInput
        testID="filter-price-max"
        label={t('catalogPriceMax')}
        style={styles.priceFieldRow}
        styles={{
          fieldLabel: [styles.priceFieldLabel, isDark ? styles.textDark : styles.textLight],
          fieldInput: [styles.priceInput, isDark ? styles.inputDark : styles.inputLight],
        }}
        placeholder="5000"
        placeholderTextColor={placeholderColor}
        keyboardType="numeric"
        value={priceMax}
        onChangeText={onMaxChange}
      />
    </View>
  );
}

export function ResetButton({ onReset, label }) {
  return (
    <Button
      testID="filter-reset-button"
      title={label}
      onPress={onReset}
      variant="primary"
      size="md"
      style={{ marginTop: 12, width: '100%' }}
    />
  );
}

export function ApplyButton({ onApply, label }) {
  return (
    <Button
      title={label}
      onPress={onApply}
      variant="accent"
      size="md"
      style={{ marginTop: 16, width: '100%' }}
    />
  );
}
