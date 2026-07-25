import React, { forwardRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { SearchIcon, CrossIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';
import { colors, layout } from '../theme/tokens';
import IconButton from './IconButton';

function ClearButton({ onClear, value, iconColor }) {
  if (!onClear || !value || value.length === 0) return null;
  return (
    <IconButton
      onPress={onClear}
      size={44}
      style={styles.clearBtn}
      icon={<CrossIcon color={iconColor} size={14} />}
    />
  );
}

function getToolbarStyles(isDark, style, inputStyle) {
  const textColor = isDark ? colors.textMutedDark : colors.slateStrong;
  return {
    wrapStyle: [styles.searchInputWrap, isDark ? styles.searchInputWrapDark : null, style],
    textInputStyle: [styles.searchInput, isDark ? styles.searchInputDark : null, inputStyle],
    iconColor: textColor,
    placeholderColor: textColor,
  };
}

export const GlobalSearchInput = forwardRef(function GlobalSearchInput({
  value,
  onChangeText,
  placeholder,
  onClear,
  onFocus,
  onBlur,
  style,
  inputStyle,
  ...props
}, ref) {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);
  const { wrapStyle, textInputStyle, iconColor, placeholderColor } = getToolbarStyles(isDark, style, inputStyle);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const activeWrapStyle = [
    ...wrapStyle,
    isFocused && { borderColor: colors.accentBlue, borderWidth: 1.5 },
  ];

  return (
    <View style={activeWrapStyle}>
      <SearchIcon color={iconColor} size={16} style={styles.searchIcon} />
      <TextInput
        ref={ref}
        style={textInputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        autoCapitalize="none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      <ClearButton onClear={onClear} value={value} iconColor={iconColor} />
    </View>
  );
});

const SearchToolbar = GlobalSearchInput;
const styles = StyleSheet.create({
  searchInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.md,
    paddingHorizontal: 14,
    height: 50,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
  },
  searchInputWrapDark: {
    backgroundColor: colors.surfaceDark,
    borderColor: colors.borderDark,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textLight,
    outlineStyle: 'none',
  },
  searchInputDark: {
    color: colors.textDark,
  },
  clearBtn: {
    padding: 4,
    marginLeft: 8,
  },
});

export default GlobalSearchInput;
