import React, { forwardRef } from 'react';
import SearchToolbar from '../SearchToolbar';
import { useTheme } from '../../context/ThemeContext';

const SearchInput = forwardRef(function SearchInput({
  isDark,
  query,
  onChangeText,
  onClear,
  onFocus,
  onBlur,
  onSubmitEditing
}, ref) {
  const { t } = useTheme();

  return (
    <SearchToolbar
      ref={ref}
      value={query}
      onChangeText={onChangeText}
      onClear={onClear}
      onFocus={onFocus}
      onBlur={onBlur}
      onSubmitEditing={onSubmitEditing}
      placeholder={t('searchPlaceholder')}
      returnKeyType="search"
      clearButtonMode="never"
      autoCorrect={false}
      style={{ flex: 1 }}
    />
  );
});

export default SearchInput;
