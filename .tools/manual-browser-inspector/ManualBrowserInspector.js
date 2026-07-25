import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { useCartContext } from '@/context/CartContext';
import { useFavoritesContext } from '@/context/FavoritesContext';
import { useTheme } from '@/context/ThemeContext';
import { getTimestamp, getOverlayText, getAppStateDump } from '@/utils/appStateDump';

import InspectorMenu from './components/InspectorMenu';

function useSafeContexts() {
  let cart, auth, favorites, theme;
  try { cart = useCartContext(); } catch (e) {}
  try { auth = useAuth(); } catch (e) {}
  try { favorites = useFavoritesContext(); } catch (e) {}
  try { theme = useTheme(); } catch (e) {}
  return { cart, auth, favorites, theme };
}

export default function ManualBrowserInspector() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaywright, setIsPlaywright] = useState(false);
  const contexts = useSafeContexts();

  useEffect(() => {
    if (Platform.OS === 'web' && (window.__isPlaywright || window.__playwright_takeScreenshotAndDumpState)) {
      setIsPlaywright(true);
    }
  }, []);

  const handleCapture = async () => {
    const stateDump = getAppStateDump(contexts);
    const timestamp = getTimestamp(stateDump);
    const overlayText = getOverlayText(stateDump);
    if (window.__playwright_takeScreenshotAndDumpState) {
      await window.__playwright_takeScreenshotAndDumpState(timestamp, stateDump, overlayText);
    }
  };

  useEffect(() => {
    if (!isPlaywright) return;

    const handleKeyDown = (e) => {
      if (e.altKey && e.code === 'Digit1') {
        e.preventDefault();
        handleCapture();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaywright, contexts]);

  if (!isPlaywright) return null;

  const actions = [
    { id: 'alt1', label: 'Capture Screenshot & State', hotkeyLabel: 'Alt+1', handler: handleCapture },
  ];

  return (
    <View id="manual-browser-inspector" style={styles.container}>
      {isOpen && <InspectorMenu actions={actions} onClose={() => setIsOpen(false)} />}
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
