import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { View, Pressable, Platform } from 'react-native';
import SearchDropdown from './SearchDropdown';
import SearchInput from './SearchInput';
import SearchStyles from './SearchStyles';

function matchItem(tokens, queryWords) {
  if (!tokens) return false;
  return queryWords.every((qWord) => tokens.some((pWord) => pWord.startsWith(qWord)));
}

function filterSearchResults(flatList, searchIndex, query) {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];

  const queryWords = q.split(/\s+/).filter(Boolean);
  if (queryWords.length === 0) return [];

  return (flatList || []).filter((item) => matchItem(searchIndex?.get(item.id), queryWords));
}

function SearchResultDropdown({ results, query, isDark, onSelect }) {
  const trimmedQuery = query.trim();
  if (results.length > 0) {
    return <SearchDropdown results={results} isDark={isDark} onSelect={onSelect} />;
  }
  if (trimmedQuery.length >= 2) {
    return <SearchDropdown results={[]} isDark={isDark} onSelect={onSelect} isEmpty query={trimmedQuery} />;
  }
  return null;
}

export function AutocompleteSearch({ isDark, onActiveChange, variant = 'default', size = 'sm', flatList = [], searchIndex }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

  const isActive = isFocused;

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
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleSubmit = () => {
    if (results.length === 0) return;
    router.push({ pathname: '/product/[id]', params: { id: results[0].id } });
    handleSelect();
  };

  const dropdownVisible = isFocused && query.trim().length >= 2;

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    if (dropdownVisible) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [dropdownVisible]);

  const backdropStyle = isDark ? SearchStyles.backdropDark : SearchStyles.backdropLight;

  return (
    <View style={SearchStyles.autocompleteContainer}>
      {dropdownVisible && (
        <Pressable
          style={backdropStyle}
          onPress={() => {
            setIsFocused(false);
            if (inputRef.current) {
              inputRef.current.blur();
            }
          }}
        />
      )}
      <SearchInput
        ref={inputRef}
        isDark={isDark}
        variant={variant}
        size={size}
        value={query}
        onChangeText={setQuery}
        onClear={() => {
          setQuery('');
          setIsFocused(false);
          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          // Keep active long enough for item presses to register
          setTimeout(() => setIsFocused(false), 200);
        }}
        onSubmitEditing={handleSubmit}
      />
      {dropdownVisible && (
        <SearchResultDropdown results={results} query={query} isDark={isDark} onSelect={handleSelect} />
      )}
    </View>
  );
}

export default AutocompleteSearch;
