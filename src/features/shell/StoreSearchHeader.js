import React, { useState, useMemo } from 'react';
import { View, Animated } from 'react-native';
import { AutocompleteSearch } from '../../components/Search';
import { useHomeScrollHide } from '../../hooks/useHomeScrollHide';
import { useTheme } from '../../context/ThemeContext';
import { useCatalog } from '../catalog/CatalogContext';
import { layout } from '../../theme/tokens';
import styles from '../../theme/appStyles';

const ic = (isDark, dark, light) => (isDark ? dark : light);

export default function StoreSearchHeader({ isDark: isDarkProp, isHome, contentWidth }) {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;
  const { flatList, searchIndex } = useCatalog() || {};
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { translateY } = useHomeScrollHide(isSearchActive || !isHome);
  const searchInnerStyle = useMemo(() => [styles.searchInner, { maxWidth: contentWidth }], [contentWidth]);

  if (!isHome) return null;

  return (
    <Animated.View
      style={[
        styles.stickySearchContainer,
        ic(isDark, styles.stickySearchContainerDark, styles.stickySearchContainerLight),
        isSearchActive && { zIndex: layout.zIndices.tooltip, elevation: layout.elevation.xl },
        { marginTop: translateY }
      ]}
    >
      <View style={searchInnerStyle}>
        <AutocompleteSearch isDark={isDark} onActiveChange={setIsSearchActive} flatList={flatList} searchIndex={searchIndex} />
      </View>
    </Animated.View>
  );
}

