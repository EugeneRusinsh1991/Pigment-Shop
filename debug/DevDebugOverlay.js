import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';

import { useAuth } from '../src/context/AuthContext';
import { useCartContext } from '../src/context/CartContext';
import { useFavoritesContext } from '../src/context/FavoritesContext';
import { useTheme } from '../src/context/ThemeContext';
import { getTimestamp, getAppStateDump } from '../src/utils/appStateDump';

import { useRouter } from 'expo-router';

import DebugMenu from './components/DebugMenu';
import { runCatalogCrawler } from './automations/catalogCrawler';
import { runProductPageTest } from './automations/productPageTest';
import { runAllProductsTest } from './automations/allProductsTest';

function useSafeContexts() {
  let cart, auth, favorites, theme;
  try { cart = useCartContext(); } catch (e) {}
  try { auth = useAuth(); } catch (e) {}
  try { favorites = useFavoritesContext(); } catch (e) {}
  try { theme = useTheme(); } catch (e) {}
  return { cart, auth, favorites, theme };
}

export default function DevDebugOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaywright, setIsPlaywright] = useState(false);
  const contexts = useSafeContexts();
  const activeTaskRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === 'web' && (window.__isPlaywright || window.__playwright_takeScreenshotAndDumpState)) {
      setIsPlaywright(true);
    }
  }, []);

  const handleCapture = async () => {
    const timestamp = getTimestamp();
    const stateDump = getAppStateDump(contexts);
    if (window.__playwright_takeScreenshotAndDumpState) {
      await window.__playwright_takeScreenshotAndDumpState(timestamp, stateDump);
    }
  };

  const handleCatalogCrawler = () => runCatalogCrawler(activeTaskRef, router);
  const handleProductPageTest = () => runProductPageTest(activeTaskRef, router);
  const handleAllProductsTest = () => runAllProductsTest(activeTaskRef, router);

  useEffect(() => {
    if (!isPlaywright) return;

    const hotkeyHandlers = {
      Digit1: handleCapture,
      Digit3: handleCatalogCrawler,
      Digit4: handleProductPageTest,
      Digit5: handleAllProductsTest,
    };

    const handleKeyDown = (e) => {
      if (e.altKey && hotkeyHandlers[e.code]) {
        e.preventDefault();
        hotkeyHandlers[e.code]();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaywright, contexts]);

  if (!isPlaywright) return null;

  const actions = [
    { id: 'alt1', label: 'Capture Screenshot & State', hotkeyLabel: 'Alt+1', handler: handleCapture },
    { id: 'alt3', label: 'Crawl Main Catalog & Breadcrumbs', hotkeyLabel: 'Alt+3', handler: handleCatalogCrawler },
    { id: 'alt4', label: 'Test Product Page Actions', hotkeyLabel: 'Alt+4', handler: handleProductPageTest },
    { id: 'alt5', label: 'Test All Products Page', hotkeyLabel: 'Alt+5', handler: handleAllProductsTest },
  ];

  return (
    <View id="dev-debug-overlay" style={styles.container}>
      {isOpen && <DebugMenu actions={actions} onClose={() => setIsOpen(false)} />}
      <TouchableOpacity style={styles.gearButton} onPress={() => setIsOpen(!isOpen)} activeOpacity={0.8}>
        <Text style={styles.gearText}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 999999,
    alignItems: 'flex-end',
  },
  gearButton: {
    backgroundColor: '#1E293B',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  gearText: {
    fontSize: 24,
    color: '#F8FAFC',
    lineHeight: 28,
  },
});
