import React, { useState, useMemo } from 'react';
import { View, Animated } from 'react-native';
import { AutocompleteSearch } from '../../components/domain/Search';
import { useHomeScrollHide } from '../../hooks/useHomeScrollHide';
import { useTheme } from '../../context/ThemeContext';
import { useCatalog } from '../catalog/CatalogContext';
import { layout } from '../../theme/tokens';
import styles from '../../theme/appStyles';

const ic = (isDark, dark, light) => (isDark ? dark : light);

// Toggle flag: false = static in-flow page element above banner; true = dynamic sticky scroll hide header
const ENABLE_STICKY_SCROLL_HIDE = false;

export default function StoreSearchHeader({ isDark: isDarkProp, isHome, contentWidth }) {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;
  const { flatList, searchIndex } = useCatalog() || {};
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { translateY, hideHeight } = useHomeScrollHide(
    !ENABLE_STICKY_SCROLL_HIDE || isSearchActive || !isHome
  );
  const searchInnerStyle = useMemo(() => [styles.searchInner, { maxWidth: contentWidth }], [contentWidth]);

  if (!isHome) return null;

  // New static in-flow layout (above banner in document flow)
  if (!ENABLE_STICKY_SCROLL_HIDE) {
    return (
      <View
        style={[
          styles.stickySearchContainer,
          { position: 'relative', top: 0 },
          ic(isDark, styles.stickySearchContainerDark, styles.stickySearchContainerLight),
          isSearchActive && { zIndex: layout.zIndices.tooltip },
        ]}
      >
        <View style={searchInnerStyle}>
          <AutocompleteSearch isDark={isDark} onActiveChange={setIsSearchActive} flatList={flatList} searchIndex={searchIndex} />
        </View>
      </View>
    );
  }

  // Legacy dynamic sticky layout (preserved for rollback)
  return (
    <Animated.View
      style={[
        styles.stickySearchContainer,
        ic(isDark, styles.stickySearchContainerDark, styles.stickySearchContainerLight),
        isSearchActive && { zIndex: layout.zIndices.tooltip },
        { transform: [{ translateY }], marginTop: translateY.interpolate({
          inputRange: [-hideHeight, 0],
          outputRange: [-hideHeight, 0],
        }) },
      ]}
    >
      <View style={searchInnerStyle}>
        <AutocompleteSearch isDark={isDark} onActiveChange={setIsSearchActive} flatList={flatList} searchIndex={searchIndex} />
      </View>
    </Animated.View>
  );
}
