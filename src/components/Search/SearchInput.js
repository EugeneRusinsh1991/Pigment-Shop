import React, { forwardRef } from 'react';
import TextField from '../TextField';
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
  const { icon } = useSearchTheme({
    isDarkProp,
    variant,
    styleMap: SearchStyles,
  });

  const iconColor = icon?.color;

  const leadingIcon = (
    <SearchIcon color={iconColor} size={16} />
  );

  const trailingIcon = Boolean(onClear && value && value.length > 0) ? (
    <IconButton
      onPress={onClear}
      size={32}
      style={SearchStyles.clearButton}
      icon={<CrossIcon color={iconColor} size={14} />}
    />
  ) : null;

  return (
    <TextField
      ref={ref}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      size={size}
      isDark={isDarkProp}
      leadingIcon={leadingIcon}
      trailingIcon={trailingIcon}
      containerStyle={style}
      inputStyle={inputStyle}
      onFocus={onFocus}
      onBlur={onBlur}
      autoCapitalize="none"
      {...props}
    />
  );
});

export default SearchInput;
