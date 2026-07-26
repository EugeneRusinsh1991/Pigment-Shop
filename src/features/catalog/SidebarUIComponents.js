import { Text, View } from 'react-native';
import Button from '../../components/Button';
import { Flag } from '../../components/Flag';
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
    <View style={styles.checkRow}>
      <Flag
        testID={testID || `filter-checkbox-${label}`}
        variant="chip"
        checked={!!checked}
        onChange={onToggle}
        isDark={isDark}
      >
        {label}
      </Flag>
    </View>
  );
}

export function PriceInputs({ priceMin, priceMax, onMinChange, onMaxChange, isDark, t }) {
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
        keyboardType="numeric"
        value={priceMin}
        onChangeText={onMinChange}
        isDark={isDark}
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
        keyboardType="numeric"
        value={priceMax}
        onChangeText={onMaxChange}
        isDark={isDark}
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
