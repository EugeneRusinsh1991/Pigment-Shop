import { useState } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/Text';
import { AnimatedButton, ChipButton } from '@/components/Button';
import { ThemeIcon } from '@/components/Icons';
import { colors, layout } from '../../../theme/tokens';
import styles from './NavMenuStyles';
import { LANGUAGES, CURRENCIES } from './constants';

function getThemeToggleLabel(isDark) {
  return isDark ? 'Switch to light theme' : 'Switch to dark theme';
}





export default function LanguageSelector({ isDark, lang, onSelectLanguage, onToggleTheme }) {
  const [selectedCurrency, setSelectedCurrency] = useState('UAH');

  if (!onSelectLanguage && !onToggleTheme) return null;
  const themeToggleLabel = getThemeToggleLabel(isDark);
  const iconColor = isDark ? colors.white : colors.dark;

  return (
    <View style={[styles.menuFooter, isDark ? styles.menuFooterDark : styles.menuFooterLight]}>
      {onToggleTheme && (
        <AnimatedButton
          style={[styles.themeToggleBtn, isDark ? styles.themeToggleBtnDark : styles.themeToggleBtnLight]}
          onPress={onToggleTheme}
        >
          <View style={styles.themeIconContainer}>
            <ThemeIcon isDark={isDark} color={iconColor} size={16} />
          </View>
          <Text variant="body2" weight="600" size={13}>
            {themeToggleLabel}
          </Text>
        </AnimatedButton>
      )}

      {onSelectLanguage && (
        <View style={styles.langRow}>
          {/* Column 1: Language buttons (RU, UKR, ENG) */}
          <View style={styles.langColumn}>
            {LANGUAGES.map((item) => (
              <ChipButton
                key={item.code}
                label={item.label}
                active={lang === item.code}
                isDark={isDark}
                onPress={() => onSelectLanguage(item.code)}
                variant="rect"
                style={styles.chipWidth}
              />
            ))}
          </View>

          {/* Column 2: Currency buttons (UAH, USD) */}
          <View style={styles.langColumn}>
            {CURRENCIES.map((item) => (
              <ChipButton
                key={item.code}
                label={item.label}
                active={selectedCurrency === item.code}
                isDark={isDark}
                onPress={() => setSelectedCurrency(item.code)}
                variant="rect"
                style={styles.chipWidth}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
