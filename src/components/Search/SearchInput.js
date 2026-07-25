import React, { forwardRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import { SearchIcon, CrossIcon } from '../Icons';
import { IconButton } from '../Button';
import { useSearchTheme } from './useSearchTheme';
import SearchStyles from './SearchStyles';

export const SearchInput = forwardRef(function SearchInput(
  {
    value,
    onChangeText,
    placeholder,
    onClear,
    onFocus,
    onBlur,
    variant = 'default',
    size = 'md',
    isDark: isDarkProp,
    style,
    inputStyle,
    ...props
  },
  ref
) {
  const [isFocused, setIsFocused] = useState(false);
  const { isDark, container, text, icon, placeholderColor } = useSearchTheme({
    isDarkProp,
    variant,
    styleMap: SearchStyles,
  });

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const containerStyles = [
    SearchStyles.containerBase,
    container,
    isFocused && SearchStyles.containerFocused,
    style,
  ];

  const inputStyles = [
    SearchStyles.inputBase,
    text,
    inputStyle,
  ];

  const iconColor = icon?.color;

  return (
    <View style={containerStyles}>
      <View style={SearchStyles.searchIconWrapper}>
        <SearchIcon color={iconColor} size={16} />
      </View>
      <TextInput
        ref={ref}
        style={inputStyles}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        autoCapitalize="none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {Boolean(onClear && value && value.length > 0) && (
        <IconButton
          onPress={onClear}
          size={32}
          style={SearchStyles.clearButton}
          icon={<CrossIcon color={iconColor} size={14} />}
        />
      )}
    </View>
  );
});

export default SearchInput;
