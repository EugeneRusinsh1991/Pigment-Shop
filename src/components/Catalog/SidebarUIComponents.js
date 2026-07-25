import { Text, TextInput, View } from 'react-native';
import { CheckIcon } from '../../components/Icons';
import AnimatedButton from '../AnimatedButton';
import { colors } from '../../theme/tokens';
import styles from './CatalogFilterSidebarStyles';

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
  const inputStyle = [styles.priceInput, isDark ? styles.inputDark : styles.inputLight];
  const placeholderColor = isDark ? colors.textMutedDark : colors.textMutedLight;
  return (
    <View style={styles.priceColumn}>
      <View style={styles.priceFieldRow}>
        <Text style={[styles.priceFieldLabel, isDark ? styles.textDark : styles.textLight]}>{t('catalogPriceMin')}</Text>
        <TextInput
          testID="filter-price-min"
          style={inputStyle}
          placeholder="0"
          placeholderTextColor={placeholderColor}
          keyboardType="numeric"
          value={priceMin}
          onChangeText={onMinChange}
        />
      </View>
      <View style={styles.priceFieldRow}>
        <Text style={[styles.priceFieldLabel, isDark ? styles.textDark : styles.textLight]}>{t('catalogPriceMax')}</Text>
        <TextInput
          testID="filter-price-max"
          style={inputStyle}
          placeholder="5000"
          placeholderTextColor={placeholderColor}
          keyboardType="numeric"
          value={priceMax}
          onChangeText={onMaxChange}
        />
      </View>
    </View>
  );
}

export function ResetButton({ onReset, label }) {
  return (
    <AnimatedButton testID="filter-reset-button" style={styles.resetBtn} onPress={onReset}>
      <Text style={styles.resetText}>
        {label}
      </Text>
    </AnimatedButton>
  );
}

export function ApplyButton({ onApply, label }) {
  return (
    <AnimatedButton style={styles.applyBtn} onPress={onApply}>
      <Text style={styles.applyBtnText}>
        {label}
      </Text>
    </AnimatedButton>
  );
}
