import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import styles from './SearchBarStyles';
import { useTheme } from '../../context/ThemeContext';
import { SearchIcon, CrossIcon } from '../Icons';

export default function SearchInput({ isDark, query, onChangeText, onClear, onFocus, onBlur }) {
  const { t } = useTheme();
  const iconColor = isDark ? '#64748b' : '#94a3b8';

  return (
    <View style={[styles.inputRow, isDark ? styles.inputRowDark : styles.inputRowLight]}>
      <SearchIcon color={iconColor} size={16} style={{ marginRight: 8 }} />
      <TextInput
        style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
        value={query}
        onChangeText={onChangeText}
        placeholder={t('searchPlaceholder')}
        placeholderTextColor={isDark ? '#475569' : '#94a3b8'}
        returnKeyType="search"
        clearButtonMode="never"
        autoCorrect={false}
        autoCapitalize="none"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearBtn} activeOpacity={0.7}>
          <CrossIcon color={iconColor} size={12} />
        </TouchableOpacity>
      )}
    </View>
  );
}

