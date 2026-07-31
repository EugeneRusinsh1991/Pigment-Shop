import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useCartContext } from '@/features/cart/CartContext';
import { useFavoritesContext } from '@/features/favorites/FavoritesContext';
import { getAppStateDump, getOverlayText, getTimestamp } from '@/utils/appStateDump';

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
  const [isLiveHighlight, setIsLiveHighlight] = useState(false);
  const contexts = useSafeContexts();

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const checkPlaywright = () => {
      if (typeof window !== 'undefined' && (window.__isPlaywright || window.__playwright_takeScreenshotAndDumpState)) {
        setIsPlaywright(true);
        return true;
      }
      return false;
    };

    if (checkPlaywright()) return;

    const interval = setInterval(() => {
      if (checkPlaywright()) {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isPlaywright) return;

    const handleMouseMove = (e) => {
      window.__lastMousePos = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isPlaywright]);

  useEffect(() => {
    if (!isPlaywright || Platform.OS !== 'web') return;

    let overlayBox = document.getElementById('__mbi_live_box');
    let overlayBadge = document.getElementById('__mbi_live_badge');

    if (!isLiveHighlight) {
      if (overlayBox) overlayBox.style.display = 'none';
      if (overlayBadge) overlayBadge.style.display = 'none';
      return;
    }

    if (!overlayBox) {
      overlayBox = document.createElement('div');
      overlayBox.id = '__mbi_live_box';
      overlayBox.style.position = 'fixed';
      overlayBox.style.pointerEvents = 'none';
      overlayBox.style.zIndex = '999998';
      overlayBox.style.border = '2px solid rgba(34, 197, 94, 0.85)';
      overlayBox.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
      overlayBox.style.borderRadius = '3px';
      overlayBox.style.transition = 'all 0.05s ease-out';
      overlayBox.style.display = 'none';
      document.body.appendChild(overlayBox);
    }

    if (!overlayBadge) {
      overlayBadge = document.createElement('div');
      overlayBadge.id = '__mbi_live_badge';
      overlayBadge.style.position = 'fixed';
      overlayBadge.style.pointerEvents = 'none';
      overlayBadge.style.zIndex = '999998';
      overlayBadge.style.backgroundColor = 'rgba(22, 101, 52, 0.95)';
      overlayBadge.style.color = '#FFFFFF';
      overlayBadge.style.fontFamily = 'sans-serif';
      overlayBadge.style.fontSize = '11px';
      overlayBadge.style.fontWeight = '600';
      overlayBadge.style.padding = '3px 8px';
      overlayBadge.style.borderRadius = '4px';
      overlayBadge.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
      overlayBadge.style.display = 'none';
      overlayBadge.style.whiteSpace = 'nowrap';
      document.body.appendChild(overlayBadge);
    }

    const handleLiveHighlightMove = (e) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el || el.closest('#manual-browser-inspector') || el.id === '__mbi_live_box' || el.id === '__mbi_live_badge') {
        overlayBox.style.display = 'none';
        overlayBadge.style.display = 'none';
        return;
      }

      const rect = el.getBoundingClientRect();
      overlayBox.style.left = `${rect.left}px`;
      overlayBox.style.top = `${rect.top}px`;
      overlayBox.style.width = `${rect.width}px`;
      overlayBox.style.height = `${rect.height}px`;
      overlayBox.style.display = 'block';

      const info = buildTargetInfo(el);
      const labelText = `[${info.tag}] ${info.selector}${info.text ? ` "${info.text}"` : ''}`;
      overlayBadge.textContent = labelText;

      const badgeY = rect.top > 28 ? rect.top - 26 : rect.bottom + 4;
      const badgeX = Math.max(5, Math.min(rect.left, window.innerWidth - 300));

      overlayBadge.style.left = `${badgeX}px`;
      overlayBadge.style.top = `${badgeY}px`;
      overlayBadge.style.display = 'block';
    };

    window.addEventListener('mousemove', handleLiveHighlightMove);

    return () => {
      window.removeEventListener('mousemove', handleLiveHighlightMove);
      if (overlayBox) overlayBox.style.display = 'none';
      if (overlayBadge) overlayBadge.style.display = 'none';
    };
  }, [isPlaywright, isLiveHighlight]);

  const resolveClassName = (el) => {
    if (typeof el.className !== 'string' || !el.className.trim()) return '';
    return `.${el.className.trim().split(/\s+/).join('.')}`;
  };

  const resolveText = (el) =>
    (el.innerText || el.getAttribute('placeholder') || el.getAttribute('aria-label') || '').slice(0, 40).trim();

  const buildTargetInfo = (el) => {
    const rect = el.getBoundingClientRect();
    const tag = el.tagName ? el.tagName.toUpperCase() : '';
    const id = el.id ? `#${el.id}` : '';
    const className = resolveClassName(el);
    const text = resolveText(el);
    const testId = el.getAttribute('data-testid');
    return {
      tag, id, className, text, testId,
      selector: `${tag.toLowerCase()}${id}${className ? className.slice(0, 30) : ''}`,
      rect: { x: Math.round(rect.left), y: Math.round(rect.top), width: Math.round(rect.width), height: Math.round(rect.height) }
    };
  };

  const getHoverInfo = () => {
    if (typeof window === 'undefined' || !window.__lastMousePos) return null;
    const { x, y } = window.__lastMousePos;
    const hasFocus = typeof document !== 'undefined' ? document.hasFocus() : true;
    if (!hasFocus) return { mouse: { x, y, active: false } };
    const el = document.elementFromPoint(x, y);
    if (!el) return { mouse: { x, y, active: true }, target: null };
    return { mouse: { x, y, active: true }, target: buildTargetInfo(el) };
  };

  const handleCapture = async (options = { cropToTarget: false }) => {
    const stateDump = getAppStateDump(contexts);
    const timestamp = getTimestamp(stateDump);
    const overlayText = getOverlayText(stateDump);
    const hoverInfo = getHoverInfo();
    if (window.__playwright_takeScreenshotAndDumpState) {
      await window.__playwright_takeScreenshotAndDumpState(timestamp, stateDump, overlayText, hoverInfo, options);
    }
  };

  const toggleLiveHighlight = () => {
    setIsLiveHighlight((prev) => !prev);
  };

function isAltKeyMatch(e, codes, keys, keyCode) {
  if (!e || !e.altKey) return false;
  if (codes.includes(e.code)) return true;
  if (keys.includes(e.key)) return true;
  return e.keyCode === keyCode;
}

  useEffect(() => {
    if (!isPlaywright) return;

    const handleKeyDown = (e) => {
      const isAlt1 = isAltKeyMatch(e, ['Digit1', 'Numpad1'], ['1', '!'], 49);
      const isAlt2 = isAltKeyMatch(e, ['Digit2', 'Numpad2'], ['2', '@'], 50);
      const isAlt9 = isAltKeyMatch(e, ['Digit9', 'Numpad9'], ['9', '('], 57);

      if (isAlt1) {
        e.preventDefault();
        handleCapture({ cropToTarget: false });
      } else if (isAlt2) {
        e.preventDefault();
        handleCapture({ cropToTarget: true });
      } else if (isAlt9) {
        e.preventDefault();
        toggleLiveHighlight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaywright, contexts]);

  if (!isPlaywright) return null;

  const actions = [
    { id: 'alt1', label: 'Capture Full Screenshot & State', hotkeyLabel: 'Alt+1', handler: () => handleCapture({ cropToTarget: false }) },
    { id: 'alt2', label: 'Capture Target Cropped Screenshot', hotkeyLabel: 'Alt+2', handler: () => handleCapture({ cropToTarget: true }) },
    { id: 'alt9', label: `Live Highlight (${isLiveHighlight ? 'ON' : 'OFF'})`, hotkeyLabel: 'Alt+9', handler: toggleLiveHighlight },
  ];

  return (
    <View id="manual-browser-inspector" style={styles.container}>
      {isOpen && <InspectorMenu actions={actions} onClose={() => setIsOpen(false)} />}
      <TouchableOpacity style={[styles.gearButton, isLiveHighlight && styles.gearActive]} onPress={() => setIsOpen(!isOpen)} activeOpacity={0.8}>
        <Text style={styles.gearText}>{isLiveHighlight ? '🎯' : '⚙️'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
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
  gearActive: {
    borderColor: '#22C55E',
    backgroundColor: '#15803D',
  },
  gearText: {
    fontSize: 24,
    color: '#F8FAFC',
    lineHeight: 28,
  },
});
