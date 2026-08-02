import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { layout, primitives, semantic, shadows } from '../../../theme/tokens';
import { useTheme } from '../../../context/ThemeContext';
import { usePullToRefreshContext } from '../../../features/shell/PullToRefreshContext';

const PULL_THRESHOLD = 80;
const MAX_PULL = 140;

export default function PullToRefreshIndicator({
  pullDistance: pullDistanceProp,
  refreshing: refreshingProp,
  isDark: isDarkProp,
  threshold = PULL_THRESHOLD,
  maxPull = MAX_PULL,
  style,
}) {
  const themeCtx = useTheme();
  const context = usePullToRefreshContext();
  
  const pullDistance = pullDistanceProp ?? context?.pullDistance ?? 0;
  const refreshing = refreshingProp ?? context?.refreshing ?? false;

  const isDark = isDarkProp ?? themeCtx?.isDark ?? false;

  const progress = Math.min(Math.max(0, pullDistance) / threshold, 1);
  const yOffset = Math.min(Math.max(0, pullDistance) * 0.5, maxPull * 0.5);
  const rotation = refreshing ? 360 : progress * 360;
  const opacity = refreshing ? 1 : (progress > 0 ? Math.min(progress, 1) : 0);

  if (opacity === 0 && !refreshing) {
    return null;
  }

  const bgColor = (progress >= 1 || refreshing)
    ? (semantic?.color?.status?.success?.solidBg || primitives?.green?.[500] || '#10B981')
    : (isDark ? (primitives?.slate?.[700] || '#334155') : (primitives?.slate?.[600] || '#475569'));

  if (Platform.OS === 'web') {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: `translateX(-50%) translateY(${yOffset - 40}px) rotate(${rotation}deg)`,
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          opacity,
          transition: refreshing
            ? 'transform 0.3s ease-in-out, background-color 0.2s ease'
            : 'transform 0.15s ease-out, opacity 0.15s ease-out, background-color 0.2s ease',
          pointerEvents: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          ...(style || {}),
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
      </div>
    );
  }

  return (
    <View
      style={[
        styles.nativeContainer,
        {
          backgroundColor: bgColor,
          opacity,
          transform: [
            { translateY: yOffset - 40 },
            { rotate: `${rotation}deg` },
          ],
        },
        shadows?.sm,
        style,
      ]}
      pointerEvents="none"
    >
      {/* Fallback indicator representation for native if rendered directly */}
    </View>
  );
}

const styles = StyleSheet.create({
  nativeContainer: {
    position: 'absolute',
    top: layout.spacing.none,
    alignSelf: 'center',
    width: 36,
    height: 36,
    borderRadius: layout.radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
});
