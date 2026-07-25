import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import styles from './SearchBarStyles';
import { useTheme } from '../../context/ThemeContext';
import { getLocalizedValue } from '../../utils/localization';
import { AnimatedButton } from '../Button';

const MAX_RESULTS = 20;

const getItemLabel = (item, lang) => {
  return getLocalizedValue(item?.label, lang);
};

const getResultRowStyles = (isDark) => ({
  row: [styles.resultRow, isDark ? styles.resultRowDark : styles.resultRowLight, { minHeight: 44, justifyContent: 'center' }],
  label: [styles.resultLabel, isDark ? styles.resultLabelDark : styles.resultLabelLight],
  chevron: [styles.resultChevron, isDark ? styles.mutedDark : styles.mutedLight]
});

const ResultRow = React.forwardRef(({ item, isDark, onPress, ...rest }, ref) => {
  const { lang } = useTheme();
  const label = getItemLabel(item, lang);
  const rowStyles = getResultRowStyles(isDark);

  return (
    <AnimatedButton
      ref={ref}
      style={rowStyles.row}
      onPress={onPress}
      {...rest}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={{ width: 24, height: 24, borderRadius: 4 }} />
      ) : (
        <Text style={styles.resultIcon}>{item.icon || '📦'}</Text>
      )}
      <Text style={rowStyles.label} numberOfLines={1}>
        {label}
      </Text>
      <Text style={rowStyles.chevron}>›</Text>
    </AnimatedButton>
  );
});

function EmptySearchState({ query, isDark, t }) {
  const template = t('searchNoResults') || 'No results found for "{query}"';
  const message = template.replace('{query}', query);
  const textStyle = [styles.moreHint, isDark ? styles.moreHintDark : styles.moreHintLight, { paddingVertical: 14 }];

  return (
    <View style={[styles.dropdown, isDark ? styles.dropdownDark : styles.dropdownLight]}>
      <Text style={textStyle}>{message}</Text>
    </View>
  );
}

function MoreResultsHint({ count, isDark, t }) {
  if (count <= 0) return null;
  const message = t('searchRefinementHint').replace('{count}', count);
  return (
    <Text style={[styles.moreHint, isDark ? styles.moreHintDark : styles.moreHintLight]}>
      {message}
    </Text>
  );
}

export default function SearchDropdown({ results, isDark, onSelect, isEmpty, query }) {
  const { t } = useTheme();

  if (isEmpty) {
    return <EmptySearchState query={query} isDark={isDark} t={t} />;
  }

  const visibleResults = results.slice(0, MAX_RESULTS);
  const hiddenCount = results.length - MAX_RESULTS;

  return (
    <View style={[styles.dropdown, isDark ? styles.dropdownDark : styles.dropdownLight]}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} style={styles.resultScroll}>
        {visibleResults.map((item) => (
          <Link key={item.id} href={{ pathname: '/product/[id]', params: { id: item.id } }} asChild>
            <ResultRow item={item} isDark={isDark} onPress={onSelect} />
          </Link>
        ))}
        <MoreResultsHint count={hiddenCount} isDark={isDark} t={t} />
      </ScrollView>
    </View>
  );
}

