import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './SearchBarStyles';

const MAX_RESULTS = 20;

function ResultRow({ item, isDark, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.resultRow, isDark ? styles.resultRowDark : styles.resultRowLight]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.resultIcon}>{item.icon}</Text>
      <Text
        style={[styles.resultLabel, isDark ? styles.resultLabelDark : styles.resultLabelLight]}
        numberOfLines={1}
      >
        {item.label}
      </Text>
      <Text style={[styles.resultChevron, isDark ? styles.mutedDark : styles.mutedLight]}>›</Text>
    </TouchableOpacity>
  );
}

export default function SearchDropdown({ results, isDark, onSelect }) {
  return (
    <View style={[styles.dropdown, isDark ? styles.dropdownDark : styles.dropdownLight]}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} style={styles.resultScroll}>
        {results.slice(0, MAX_RESULTS).map((item) => (
          <ResultRow key={item.id} item={item} isDark={isDark} onPress={() => onSelect(item)} />
        ))}
        {results.length > MAX_RESULTS && (
          <Text style={[styles.moreHint, isDark ? styles.moreHintDark : styles.moreHintLight]}>
            + {results.length - MAX_RESULTS} more — refine your search
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
