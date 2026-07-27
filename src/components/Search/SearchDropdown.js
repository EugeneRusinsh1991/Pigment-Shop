import React from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Text } from '../../components/Text';
import { Link } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { getLocalizedValue } from '../../utils/localization';
import { AnimatedButton } from '../Button';
import SearchStyles from './SearchStyles';
import { layout } from '../../theme/tokens';

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
      style={[SearchStyles.resultRow, SearchStyles.resultRowContent]}
      onPress={onPress}
      {...rest}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={SearchStyles.resultImage} />
      ) : (
        <Text variant="body1" size={16}>{item.icon || '📦'}</Text>
      )}
      <Text variant="body1" size={14} style={[SearchStyles.resultText, SearchStyles[`text_${isDark ? 'defaultDark' : 'defaultLight'}`]]} numberOfLines={1}>
        {label}
      </Text>
      <Text variant="caption" color="muted" size={16}>›</Text>
    </AnimatedButton>
  );
});

function EmptySearchState({ query, isDark, t }) {
  const template = t('searchNoResults') || 'No results found for "{query}"';
  const message = template.replace('{query}', query);

  return (
    <View style={[SearchStyles.dropdownOverlay, SearchStyles[isDark ? 'defaultDark' : 'defaultLight']]}>
      <Text variant="body1" size={14} style={[SearchStyles.emptyText, SearchStyles[`text_${isDark ? 'defaultDark' : 'defaultLight'}`]]}>
        {message}
      </Text>
    </View>
  );
}

function MoreResultsHint({ count, isDark, t }) {
  if (count <= 0) return null;
  const message = t('searchRefinementHint')?.replace('{count}', count) || `+${count} more results`;
  return (
    <Text variant="caption" color="muted" size={12} style={[SearchStyles.moreText, SearchStyles[`text_${isDark ? 'defaultDark' : 'defaultLight'}`]]}>
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
    <View style={[SearchStyles.dropdownOverlay, SearchStyles[isDark ? 'defaultDark' : 'defaultLight']]}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} style={SearchStyles.scrollView}>
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
