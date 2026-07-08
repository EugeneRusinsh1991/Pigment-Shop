import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Breadcrumb from './components/Breadcrumb';
import PlaceholderCard from './components/PlaceholderCard';
import { HIERARCHY, LEVEL_NAMES } from './data/hierarchy';

// ─── Language / theme data ──────────────────────────────────────────────────

const TRANSLATIONS = {
  en: { appName: 'Belle Beauté', catalog: 'Catalog', empty: 'No items here yet.' },
  ru: { appName: 'Belle Beauté', catalog: 'Каталог', empty: 'Пока ничего нет.' },
  ua: { appName: 'Belle Beauté', catalog: 'Каталог', empty: 'Поки нічого немає.' },
};

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'ua', label: 'Українська' },
];

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  const [showLangMenu, setShowLangMenu] = useState(false);

  /**
   * navigationStack: Array<{ label: string; items: Array<node> }>
   *
   * Each entry represents one visited level.
   * - stack[0] is always the root (Catalog list).
   * - Pushing a card's children takes the user one level deeper.
   * - Popping returns to the previous level.
   */
  const [navigationStack, setNavigationStack] = useState([
    { label: 'Catalog', items: HIERARCHY },
  ]);

  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];

  // Current visible items = the top of the navigation stack
  const currentLevel = navigationStack[navigationStack.length - 1];
  const items = currentLevel.items;

  // Depth index (0 = Catalog, 6 = Product)
  const depth = navigationStack.length - 1;
  const levelName = LEVEL_NAMES[depth] ?? 'Items';

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleCardPress = (node) => {
    if (!node.children || node.children.length === 0) {
      // Leaf product — show product detail placeholder (no deeper navigation)
      return;
    }
    setNavigationStack((prev) => [
      ...prev,
      { label: node.label, items: node.children },
    ]);
    setShowLangMenu(false);
  };

  /**
   * Navigate back to a specific crumb index.
   * index = -1  → root (Catalog)
   * index =  n  → stack[n+1] (because stack[0] is root, crumbs start at index 1)
   */
  const handleCrumbPress = (index) => {
    // The breadcrumb receives stack[1..] (we exclude the root from visible crumbs
    // because it's represented by the 🏠 home icon). So crumb index 0 = stack[1].
    // Pressing 🏠 (index = -1) → go to stack[0].
    setNavigationStack((prev) => prev.slice(0, index + 2));
    setShowLangMenu(false);
  };

  const handleBackPress = () => {
    if (navigationStack.length > 1) {
      setNavigationStack((prev) => prev.slice(0, -1));
    }
    setShowLangMenu(false);
  };

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const selectLanguage = (code) => {
    setLang(code);
    setShowLangMenu(false);
  };

  // Breadcrumb data: everything in stack except index 0 (root), since 🏠 covers it
  const crumbs = navigationStack.slice(1).map((s) => ({ label: s.label }));

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Pressable
      style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}
      onPress={() => setShowLangMenu(false)}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* ── Header ─────────────────────────────────────────── */}
      <View style={[styles.header, isDark ? styles.headerDark : styles.headerLight]}>
        {/* Back button (hidden on root) */}
        {navigationStack.length > 1 ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.backIcon, isDark ? styles.backIconDark : styles.backIconLight]}>
              ‹
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        {/* App name */}
        <Text style={[styles.logo, isDark ? styles.logoDark : styles.logoLight]}>
          {t.appName}
        </Text>

        {/* Right controls */}
        <View style={styles.headerControls}>
          {/* Theme toggle */}
          <TouchableOpacity
            style={[styles.iconButton, isDark ? styles.iconButtonDark : styles.iconButtonLight]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Text style={styles.iconText}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>

          {/* Language selector */}
          <View style={styles.langSelectorContainer}>
            <TouchableOpacity
              style={[styles.langButton, isDark ? styles.langButtonDark : styles.langButtonLight]}
              onPress={() => setShowLangMenu(!showLangMenu)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.langButtonText,
                  isDark ? styles.langButtonTextDark : styles.langButtonTextLight,
                ]}
              >
                🌐 {lang.toUpperCase()}
              </Text>
            </TouchableOpacity>

            {showLangMenu && (
              <View
                style={[styles.dropdown, isDark ? styles.dropdownDark : styles.dropdownLight]}
              >
                {LANGUAGES.map((item) => (
                  <TouchableOpacity
                    key={item.code}
                    style={[
                      styles.dropdownItem,
                      lang === item.code &&
                        (isDark ? styles.dropdownItemActiveDark : styles.dropdownItemActiveLight),
                    ]}
                    onPress={() => selectLanguage(item.code)}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        isDark ? styles.dropdownTextDark : styles.dropdownTextLight,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>

      {/* ── Breadcrumb ─────────────────────────────────────── */}
      {crumbs.length > 0 && (
        <View style={[styles.breadcrumbBar, isDark ? styles.breadcrumbBarDark : styles.breadcrumbBarLight]}>
          <Breadcrumb stack={crumbs} onPress={handleCrumbPress} isDark={isDark} />
        </View>
      )}

      {/* ── Level title ────────────────────────────────────── */}
      <View style={styles.levelTitleRow}>
        <Text style={[styles.levelLabel, isDark ? styles.levelLabelDark : styles.levelLabelLight]}>
          {navigationStack.length === 1 ? t.catalog : levelName}
        </Text>
        <View style={[styles.levelBadge, isDark ? styles.levelBadgeDark : styles.levelBadgeLight]}>
          <Text style={[styles.levelBadgeText, isDark ? styles.levelBadgeTextDark : styles.levelBadgeTextLight]}>
            {depth + 1} / {LEVEL_NAMES.length}
          </Text>
        </View>
      </View>

      {/* ── Card list ──────────────────────────────────────── */}
      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={[styles.emptyText, isDark ? styles.emptyTextDark : styles.emptyTextLight]}>
            {t.empty}
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PlaceholderCard
              item={item}
              onPress={() => handleCardPress(item)}
              isDark={isDark}
              isLeaf={!item.children || item.children.length === 0}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Pressable>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerDark: { backgroundColor: '#0f172a' },
  containerLight: { backgroundColor: '#f8fafc' },

  // Header
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    zIndex: 1000,
  },
  headerDark: { backgroundColor: '#0f172a', borderBottomColor: '#1e293b' },
  headerLight: { backgroundColor: '#ffffff', borderBottomColor: '#e2e8f0' },

  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPlaceholder: { width: 36 },
  backIcon: { fontSize: 32, lineHeight: 36, fontWeight: '300' },
  backIconDark: { color: '#38bdf8' },
  backIconLight: { color: '#7c3aed' },

  logo: { fontSize: 18, fontWeight: 'bold', letterSpacing: 0.5 },
  logoDark: { color: '#38bdf8' },
  logoLight: { color: '#1e293b' },

  headerControls: { flexDirection: 'row', alignItems: 'center' },

  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconButtonDark: { backgroundColor: '#1e293b' },
  iconButtonLight: { backgroundColor: '#f1f5f9', borderWidth: 1, borderColor: '#e2e8f0' },
  iconText: { fontSize: 17 },

  langSelectorContainer: { position: 'relative' },
  langButton: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8 },
  langButtonDark: { backgroundColor: '#1e293b' },
  langButtonLight: { backgroundColor: '#f1f5f9', borderWidth: 1, borderColor: '#e2e8f0' },
  langButtonText: { fontSize: 12, fontWeight: 'bold' },
  langButtonTextDark: { color: '#f8fafc' },
  langButtonTextLight: { color: '#1e293b' },

  dropdown: {
    position: 'absolute',
    top: 42,
    right: 0,
    width: 140,
    borderRadius: 8,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 9999,
  },
  dropdownDark: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155' },
  dropdownLight: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0' },
  dropdownItem: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  dropdownItemActiveDark: { backgroundColor: '#334155' },
  dropdownItemActiveLight: { backgroundColor: '#f1f5f9' },
  dropdownText: { fontSize: 13 },
  dropdownTextDark: { color: '#f8fafc' },
  dropdownTextLight: { color: '#1e293b' },

  // Breadcrumb bar
  breadcrumbBar: {
    borderBottomWidth: 1,
  },
  breadcrumbBarDark: {
    backgroundColor: '#0f172a',
    borderBottomColor: '#1e293b',
  },
  breadcrumbBarLight: {
    backgroundColor: '#f8fafc',
    borderBottomColor: '#e2e8f0',
  },

  // Level title
  levelTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  levelLabel: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  levelLabelDark: { color: '#f1f5f9' },
  levelLabelLight: { color: '#0f172a' },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  levelBadgeDark: { backgroundColor: '#1e293b' },
  levelBadgeLight: { backgroundColor: '#e2e8f0' },
  levelBadgeText: { fontSize: 11, fontWeight: '600' },
  levelBadgeTextDark: { color: '#64748b' },
  levelBadgeTextLight: { color: '#475569' },

  // Card list
  list: { paddingBottom: 32, paddingTop: 4 },

  // Empty state
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 15 },
  emptyTextDark: { color: '#64748b' },
  emptyTextLight: { color: '#94a3b8' },
});
