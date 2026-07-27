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

function getThemeToggleStyle(isDark) {
  return {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.sm,
    minHeight: 44,
    borderRadius: layout.radii.sm,
    borderWidth: 1,
    borderColor: isDark ? colors.borderDarkAlt : colors.navItemHoverDark,
    backgroundColor: isDark ? colors.surfaceFaintDark : colors.surfaceFaintLight,
    marginBottom: layout.spacing.md,
  };
}

function getThemeIconStyles(isDark) {
  return {
    container: { marginRight: layout.spacing.sm },
    icon: { isDark, color: isDark ? colors.white : colors.dark, size: 16 },
  };
}



export default function LanguageSelector({ isDark, lang, onSelectLanguage, onToggleTheme }) {
  const [selectedCurrency, setSelectedCurrency] = useState('UAH');

  if (!onSelectLanguage && !onToggleTheme) return null;
  const themeToggleLabel = getThemeToggleLabel(isDark);
  const themeIconStyles = getThemeIconStyles(isDark);

  return (
    <View style={[styles.menuFooter, isDark ? styles.menuFooterDark : styles.menuFooterLight]}>
      {onToggleTheme && (
        <AnimatedButton
          style={getThemeToggleStyle(isDark)}
          onPress={onToggleTheme}
        >
          <View style={themeIconStyles.container}>
            <ThemeIcon {...themeIconStyles.icon} />
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
