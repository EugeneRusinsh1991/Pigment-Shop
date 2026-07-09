import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './AppHeader/AppHeaderStyles';

const LANGUAGES = [
  { code: 'ru', label: 'Русский' },
  { code: 'ua', label: 'Українська' },
  { code: 'en', label: 'English' },
];

export default function AppHeader({
  isDark, appName, canGoBack, onBack, onMenuPress,
  lang, showLangMenu, onToggleLangMenu, onSelectLanguage,
  onToggleTheme, cartCount, onCartPress, onLoginPress, onHome,
  onAdminPress,
}) {
  const ic = (dark, light) => (isDark ? dark : light);

  return (
    <View style={[styles.header, ic(styles.headerDark, styles.headerLight)]}>
      {/* Left: Brand Logo & Optional Back Button */}
      <View style={styles.leftSec}>
        <TouchableOpacity style={styles.menuBtn} onPress={onMenuPress}>
          <Text style={[styles.menuBtnText, ic(styles.textDark, styles.textLight)]}>☰</Text>
        </TouchableOpacity>
        {canGoBack && (
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Text style={[styles.backText, ic(styles.textDark, styles.textLight)]}>‹ Назад</Text>
          </TouchableOpacity>
        )}
        <Text style={[styles.logo, ic(styles.textDark, styles.textLight)]}>{appName}</Text>
      </View>

      {/* Center Links */}
      <View style={styles.centerSec}>
        <TouchableOpacity style={styles.navLink} onPress={onHome}>
          <Text style={[styles.navLinkText, ic(styles.subtextDark, styles.subtextLight)]}>Главная</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navLink}>
          <Text style={[styles.navLinkText, ic(styles.textDark, styles.textLight)]}>Каталог</Text>
        </TouchableOpacity>
      </View>

      {/* Right Controls */}
      <View style={styles.rightSec}>
        {/* Admin Panel Button */}
        <TouchableOpacity style={styles.adminBtn} onPress={onAdminPress}>
          <Text style={[styles.adminBtnText, ic(styles.textDark, styles.textLight)]}>⚙ Admin</Text>
        </TouchableOpacity>

        {/* Theme Toggle (Sun/Moon symbol) */}
        <TouchableOpacity style={styles.iconBtn} onPress={onToggleTheme}>
          <Text style={[styles.iconText, ic(styles.textDark, styles.textLight)]}>
            {isDark ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>

        {/* Language selector (Globe symbol) */}
        <View style={styles.langContainer}>
          <TouchableOpacity style={styles.iconBtn} onPress={onToggleLangMenu}>
            <Text style={[styles.iconText, ic(styles.textDark, styles.textLight)]}>🌐</Text>
          </TouchableOpacity>

          {showLangMenu && (
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
          )}
        </View>

        {/* Shopping bag (with count badge) */}
        <TouchableOpacity style={styles.cartBtn} onPress={onCartPress}>
          <Text style={[styles.iconText, ic(styles.textDark, styles.textLight)]}>👜</Text>
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity style={styles.iconBtn} onPress={onLoginPress}>
          <Text style={[styles.iconText, ic(styles.textDark, styles.textLight)]}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
