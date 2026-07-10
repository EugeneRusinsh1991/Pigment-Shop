import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './SearchBarStyles';
import { useTheme } from '../../context/ThemeContext';

export default function SearchInput({ isDark, query, onChangeText, onClear }) {
  const { t } = useTheme();
  return (
    <View style={[styles.inputRow, isDark ? styles.inputRowDark : styles.inputRowLight]}>
      <Text style={styles.searchIcon}>🔍</Text>
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
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearBtn} activeOpacity={0.7}>
          <Text style={[styles.clearIcon, isDark ? styles.clearIconDark : styles.clearIconLight]}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
