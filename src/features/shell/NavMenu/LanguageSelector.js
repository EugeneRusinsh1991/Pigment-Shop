import { useState } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { AnimatedButton, ChipButton } from '@/components/ui/Button';
import { ThemeIcon } from '@/components/Icons';
import { useLanguage } from '@/context/LanguageContext';
import { colors, layout } from '../../../theme/tokens';
import styles from './NavMenuStyles';
import { LANGUAGES, CURRENCIES } from './constants';

function ThemeToggleButton({ isDark, onToggleTheme }) {
  const { t } = useLanguage();
  const themeToggleLabel = isDark ? t('switchToLightTheme') : t('switchToDarkTheme');
  const iconColor = isDark ? colors.white : colors.dark;

  return (
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
  );
}

function LanguageCurrencyRow({ isDark, lang, selectedCurrency, onSelectLanguage, setSelectedCurrency }) {
  return (
    <View style={styles.langRow}>
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
  );
}

export default function LanguageSelector({ isDark, lang, onSelectLanguage, onToggleTheme }) {
  const [selectedCurrency, setSelectedCurrency] = useState('UAH');

  if (!onSelectLanguage && !onToggleTheme) return null;
  const footerStyle = [styles.menuFooter, isDark ? styles.menuFooterDark : styles.menuFooterLight];

  return (
    <View style={footerStyle}>
      {onToggleTheme && <ThemeToggleButton isDark={isDark} onToggleTheme={onToggleTheme} />}
      {onSelectLanguage && (
        <LanguageCurrencyRow
          isDark={isDark}
          lang={lang}
          selectedCurrency={selectedCurrency}
          onSelectLanguage={onSelectLanguage}
          setSelectedCurrency={setSelectedCurrency}
        />
      )}
    </View>
  );
}
