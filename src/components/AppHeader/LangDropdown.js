import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './AppHeaderStyles';

const LANGUAGES = [
  { code: 'ru', label: 'Русский' },
  { code: 'uk', label: 'Українська' },
  { code: 'en', label: 'English' },
];

export default function LangDropdown({ showLangMenu, isDark, lang, onSelectLanguage }) {
  if (!showLangMenu) return null;
  const ic = (dark, light) => (isDark ? dark : light);
  return (
    <View style={[styles.dropdown, ic(styles.dropdownDark, styles.dropdownLight)]}>
      {LANGUAGES.map((item) => (
        <TouchableOpacity
          key={item.code}
          style={[
            styles.dropdownItem,
            lang === item.code && ic(styles.dropdownItemActiveDark, styles.dropdownItemActiveLight),
          ]}
          onPress={() => onSelectLanguage(item.code)}
        >
          <Text style={[styles.dropdownText, ic(styles.textDark, styles.textLight)]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
