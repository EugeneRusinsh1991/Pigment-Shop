import React, { useState } from 'react';
import { View, Animated } from 'react-native';
import { AutocompleteSearch } from '../../components/Search';
import { useHomeScrollHide } from '../../hooks/useHomeScrollHide';
import { useTheme } from '../../context/ThemeContext';
import { layout } from '../../theme/tokens';
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
        isSearchActive && { zIndex: layout.zIndices.tooltip, elevation: layout.elevation.xl },
        { marginTop: translateY }
      ]}
    >
      <View style={{ width: '100%', maxWidth: contentWidth, minWidth: 0, overflow: 'visible', paddingHorizontal: layout.spacing.sm }}>
        <AutocompleteSearch isDark={isDark} onActiveChange={setIsSearchActive} />
      </View>
    </Animated.View>
  );
}

