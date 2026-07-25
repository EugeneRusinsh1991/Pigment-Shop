import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { getLocalizedValue } from '../../utils/localization';
import { AnimatedButton } from '../Button';
import SearchStyles from './SearchStyles';

const MAX_RESULTS = 20;

const getItemLabel = (item, lang) => {
  return getLocalizedValue(item?.label, lang);
};

const ResultRow = React.forwardRef(({ item, isDark, onPress, ...rest }, ref) => {
  const { lang } = useTheme();
  const label = getItemLabel(item, lang);

  return (
    <AnimatedButton
      ref={ref}
      style={[SearchStyles.resultRow, { minHeight: 44, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 10 }]}
      onPress={onPress}
      {...rest}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={{ width: 24, height: 24, borderRadius: 4 }} />
      ) : (
        <Text style={{ fontSize: 16 }}>{item.icon || '📦'}</Text>
      )}
      <Text style={[{ flex: 1, fontSize: 14 }, SearchStyles[`text_${isDark ? 'defaultDark' : 'defaultLight'}`]]} numberOfLines={1}>
        {label}
      </Text>
      <Text style={{ fontSize: 16, opacity: 0.5 }}>›</Text>
    </AnimatedButton>
  );
});

function EmptySearchState({ query, isDark, t }) {
  const template = t('searchNoResults') || 'No results found for "{query}"';
  const message = template.replace('{query}', query);

  return (
    <View style={SearchStyles.dropdownOverlay}>
      <Text style={[{ padding: 14, textAlign: 'center', fontSize: 14 }, SearchStyles[`text_${isDark ? 'defaultDark' : 'defaultLight'}`]]}>
        {message}
      </Text>
    </View>
  );
}

function MoreResultsHint({ count, isDark, t }) {
  if (count <= 0) return null;
  const message = t('searchRefinementHint')?.replace('{count}', count) || `+${count} more results`;
  return (
    <Text style={[{ padding: 10, textAlign: 'center', fontSize: 12, opacity: 0.7 }, SearchStyles[`text_${isDark ? 'defaultDark' : 'defaultLight'}`]]}>
      {message}
    </Text>
  );
}

export default function SearchDropdown({ results, isDark, onSelect, isEmpty, query }) {
  const { t } = useTheme();

  if (isEmpty) {
    return <EmptySearchState query={query} isDark={isDark} t={t} />;
  }

  const visibleResults = (results || []).slice(0, MAX_RESULTS);
  const hiddenCount = (results || []).length - MAX_RESULTS;

  return (
    <View style={SearchStyles.dropdownOverlay}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} style={{ maxHeight: 300 }}>
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
