import React, { useState, useMemo } from 'react';
import { View } from 'react-native';
import { useCatalog } from '../context/CatalogContext';
import { useNavigation } from '../context/NavigationContext';
import styles from './SearchBar/SearchBarStyles';
import SearchInput from './SearchBar/SearchInput';
import SearchDropdown from './SearchBar/SearchDropdown';

export default function SearchBar({ isDark }) {
  const [query, setQuery] = useState('');
  const { flatList } = useCatalog();
  const { selectProductFromSearch } = useNavigation();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return flatList.filter((item) => item.label.toLowerCase().includes(q));
  }, [flatList, query]);

  const handleSelect = (item) => {
    selectProductFromSearch(item);
    setQuery('');
  };

  return (
    <View style={[styles.wrapper, isDark ? styles.wrapperDark : styles.wrapperLight]}>
      <SearchInput isDark={isDark} query={query} onChangeText={setQuery} onClear={() => setQuery('')} />
      {results.length > 0 && (
        <SearchDropdown results={results} isDark={isDark} onSelect={handleSelect} />
      )}
    </View>
  );
}
