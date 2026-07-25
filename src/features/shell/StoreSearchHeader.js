import React, { useState } from 'react';
import { View, Animated } from 'react-native';
import SearchBar from '../../components/SearchBar';
import { useHomeScrollHide } from '../../hooks/useHomeScrollHide';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../AppStyles';

const ic = (isDark, dark, light) => (isDark ? dark : light);

export default function StoreSearchHeader({ isDark: isDarkProp, isHome, contentWidth }) {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { translateY } = useHomeScrollHide(isSearchActive || !isHome);

  if (!isHome) return null;

  return (
    <Animated.View
      style={[
        styles.stickySearchContainer,
        ic(isDark, styles.stickySearchContainerDark, styles.stickySearchContainerLight),
        isSearchActive && { zIndex: 10000, elevation: 10000 },
        { marginTop: translateY }
      ]}
    >
      <View style={{ width: '100%', maxWidth: contentWidth, minWidth: 0, overflow: 'visible', paddingHorizontal: 8 }}>
        <SearchBar isDark={isDark} onActiveChange={setIsSearchActive} />
      </View>
    </Animated.View>
  );
}
