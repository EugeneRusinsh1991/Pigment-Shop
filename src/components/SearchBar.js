import React, { useState, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { useCatalog } from '../context/CatalogContext';
import { useRouter } from 'expo-router';
import styles from './SearchBar/SearchBarStyles';
import SearchInput from './SearchBar/SearchInput';
import SearchDropdown from './SearchBar/SearchDropdown';

function matchItem(tokens, queryWords) {
  if (!tokens) return false;
  return queryWords.every((qWord) => tokens.some((pWord) => pWord.startsWith(qWord)));
}

function filterSearchResults(flatList, searchIndex, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const queryWords = q.split(/\s+/).filter(Boolean);
  if (queryWords.length === 0) return [];

  return flatList.filter((item) => matchItem(searchIndex.get(item.id), queryWords));
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

export default function SearchBar({ isDark, onActiveChange }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { flatList, searchIndex } = useCatalog();
  const router = useRouter();
  const inputRef = useRef(null);

  const isActive = isFocused || query.trim().length > 0;

  React.useEffect(() => {
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

  const wrapperStyle = [
    styles.wrapper,
    isDark ? styles.wrapperDark : styles.wrapperLight,
    isActive && styles.wrapperActive,
  ];

  return (
    <View style={wrapperStyle}>
      <SearchInput
        ref={inputRef}
        isDark={isDark}
        query={query}
        onChangeText={setQuery}
        onClear={() => setQuery('')}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSubmit}
      />
      <SearchResultDropdown results={results} query={query} isDark={isDark} onSelect={handleSelect} />
    </View>
  );
}
