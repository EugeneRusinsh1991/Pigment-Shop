import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './SearchBarStyles';
import { useTheme } from '../../context/ThemeContext';

const MAX_RESULTS = 20;

const getItemLabel = (item, lang) => {
  const label = item?.label;
  if (!label) return '';
  if (typeof label === 'object') return label[lang] || '';
  return label;
};

const getResultRowStyles = (isDark) => ({
  row: [styles.resultRow, isDark ? styles.resultRowDark : styles.resultRowLight],
  label: [styles.resultLabel, isDark ? styles.resultLabelDark : styles.resultLabelLight],
  chevron: [styles.resultChevron, isDark ? styles.mutedDark : styles.mutedLight]
});

function ResultRow({ item, isDark, onPress }) {
  const { lang } = useTheme();
  const label = getItemLabel(item, lang);
  const rowStyles = getResultRowStyles(isDark);

  return (
    <TouchableOpacity
      style={rowStyles.row}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.resultIcon}>{item.icon}</Text>
      <Text style={rowStyles.label} numberOfLines={1}>
        {label}
      </Text>
      <Text style={rowStyles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

export default function SearchDropdown({ results, isDark, onSelect }) {
  const { t } = useTheme();
  return (
    <View style={[styles.dropdown, isDark ? styles.dropdownDark : styles.dropdownLight]}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} style={styles.resultScroll}>
        {results.slice(0, MAX_RESULTS).map((item) => (
          <ResultRow key={item.id} item={item} isDark={isDark} onPress={() => onSelect(item)} />
        ))}
        {results.length > MAX_RESULTS && (
          <Text style={[styles.moreHint, isDark ? styles.moreHintDark : styles.moreHintLight]}>
            {t('searchRefinementHint').replace('{count}', results.length - MAX_RESULTS)}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
