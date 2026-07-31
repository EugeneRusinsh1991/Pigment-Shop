import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { View, Modal } from 'react-native';
import SearchDropdown from './SearchDropdown';
import SearchInput from './SearchInput';
import SearchStyles from './SearchStyles';

function matchItem(tokens, queryWords) {
  if (!tokens) return false;
  return queryWords.every((qWord) => tokens.some((pWord) => pWord.startsWith(qWord)));
}

function filterSearchResults(flatList, searchIndex, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const queryWords = q.split(/\s+/).filter(Boolean);
  if (queryWords.length === 0) return [];

  return (flatList || []).filter((item) => matchItem(searchIndex?.get(item.id), queryWords));
}

function SearchResultDropdown({ results, query, isDark, onSelect }) {
  const trimmedQuery = query.trim();
  if (results.length > 0) {
    return <SearchDropdown results={results} isDark={isDark} onSelect={onSelect} />;
  }
  if (trimmedQuery.length > 0) {
    return <SearchDropdown results={[]} isDark={isDark} onSelect={onSelect} isEmpty query={trimmedQuery} />;
  }
  return null;
}

export function AutocompleteSearch({ isDark, onActiveChange, variant = 'default', size = 'sm', flatList = [], searchIndex }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

  const isActive = isFocused || query.trim().length > 0;

  useEffect(() => {
    if (onActiveChange) {
      onActiveChange(isActive);
    }
  }, [isActive, onActiveChange]);

  const results = useMemo(
    () => filterSearchResults(flatList, searchIndex, query),
    [flatList, searchIndex, query]
  );

  const handleSelect = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleSubmit = () => {
    if (results.length === 0) return;
    router.push({ pathname: '/product/[id]', params: { id: results[0].id } });
    handleSelect();
  };

  const dropdownVisible = isActive && (results.length > 0 || query.trim().length > 0);

  return (
    <View style={SearchStyles.autocompleteContainer}>
      <SearchInput
        ref={inputRef}
        isDark={isDark}
        variant={variant}
        size={size}
        value={query}
        onChangeText={setQuery}
        onClear={() => setQuery('')}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSubmit}
      />
      <Modal transparent visible={dropdownVisible} animationType="none">
        <SearchResultDropdown results={results} query={query} isDark={isDark} onSelect={handleSelect} />
      </Modal>
    </View>
  );
}

export default AutocompleteSearch;
