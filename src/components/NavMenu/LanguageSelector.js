import { Text, TouchableOpacity, View } from 'react-native';
import { ThemeIcon } from '../Icons';
import styles from './NavMenuStyles';
import { ACCENT_COLOR, LANGUAGES } from './constants';

const BORDER_COLORS = {
  'selected-dark':  ACCENT_COLOR,
  'selected-light': ACCENT_COLOR,
  'normal-dark':    '#334155',
  'normal-light':   '#e2e8f0',
};

const BG_COLORS = {
  'selected-dark':  'rgba(227, 27, 35, 0.15)',
  'selected-light': 'rgba(227, 27, 35, 0.08)',
  'normal-dark':    'transparent',
  'normal-light':   'transparent',
};

const TEXT_COLORS = {
  'selected-dark':  ACCENT_COLOR,
  'selected-light': ACCENT_COLOR,
  'normal-dark':    '#94a3b8',
  'normal-light':   '#475569',
};

function getLangButtonStyles(isSelected, isDark) {
  const key = `${isSelected ? 'selected' : 'normal'}-${isDark ? 'dark' : 'light'}`;
  return {
    btn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: BORDER_COLORS[key], backgroundColor: BG_COLORS[key] },
    text: { fontSize: 12, fontWeight: isSelected ? '700' : '500', color: TEXT_COLORS[key] },
  };
}


function LanguageButton({ item, isSelected, isDark, onSelect }) {
  const s = getLangButtonStyles(isSelected, isDark);
  return (
    <TouchableOpacity style={s.btn} onPress={onSelect}>
      <Text style={s.text}>{item.label}</Text>
    </TouchableOpacity>
  );
}

export default function LanguageSelector({ isDark, lang, onSelectLanguage, onToggleTheme }) {
  if (!onSelectLanguage && !onToggleTheme) return null;
  const title = lang === 'uk' ? 'Мова' : lang === 'ru' ? 'Язык' : 'Language';

  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
      {onToggleTheme && (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            paddingHorizontal: 8,
            borderRadius: 8,
            marginBottom: 10,
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.04)',
          }}
          onPress={onToggleTheme}
          activeOpacity={0.8}
        >
          <View style={{ marginRight: 10 }}>
            <ThemeIcon isDark={isDark} color={isDark ? '#FFFFFF' : '#1C1C1C'} size={16} />
          </View>
          <Text style={[styles.itemLabel, isDark ? styles.textDark : styles.textLight, { marginLeft: 0, fontSize: 13, fontWeight: '600' }]}>
            {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          </Text>
        </TouchableOpacity>
      )}

      {onSelectLanguage && (
        <>
          <Text style={[styles.itemLabel, isDark ? styles.textDark : styles.textLight, { marginLeft: 0, marginBottom: 8, fontSize: 13, fontWeight: '700' }]}>
            {title}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {LANGUAGES.map((item) => (
              <LanguageButton
                key={item.code}
                item={item}
                isSelected={lang === item.code}
                isDark={isDark}
                onSelect={() => onSelectLanguage(item.code)}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
}
