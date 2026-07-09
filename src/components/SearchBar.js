import React, { useState } from 'react';
import { View } from 'react-native';
import { useCatalog } from '../context/CatalogContext';
import useSearch from '../hooks/useSearch';
import styles from './SearchBar/SearchBarStyles';
import SearchInput from './SearchBar/SearchInput';
import SearchDropdown from './SearchBar/SearchDropdown';

export default function SearchBar({ isDark, onSelectResult }) {
  const [query, setQuery] = useState('');
  const { flatList } = useCatalog();
  const results = useSearch(flatList, query);

  const handleSelect = (item) => {
    onSelectResult(item);
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
