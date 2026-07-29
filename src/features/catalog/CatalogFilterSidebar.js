import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Heading } from '../../components/ui/Text';
import styles from './CatalogFilterSidebarStyles';
import { CrossIcon } from '../../components/Icons';
import { useTheme } from '../../context/ThemeContext';
import { useSlideAnimation } from '../../hooks/useSlideAnimation';
import Drawer from '../../components/ui/Drawer';
import SidebarContent from './SidebarContent';
import { AnimatedButton } from '../../components/ui/Button';
import { colors } from '../../theme/tokens';

function MobileFilterDrawer({ showModal, handleClose, scrimOpacity, panelWidth, slideAnim, isDark, t, children }) {
  return (
    <Drawer
      visible={showModal}
      onClose={handleClose}
      scrimOpacity={scrimOpacity}
      panelWidth={panelWidth}
      slideAnim={slideAnim}
      isDark={isDark}
    >
      <View style={[styles.panelHeader, isDark ? styles.panelHeaderDark : styles.panelHeaderLight]}>
        <Heading level={4} style={styles.panelTitle} isDark={isDark}>
          {t('catalogFilters')}
        </Heading>
        <AnimatedButton onPress={handleClose} style={styles.closeBtn}>
          <CrossIcon color={colors.accent} size={16} />
        </AnimatedButton>
      </View>
      {children}
    </Drawer>
  );
}

export default function CatalogFilterSidebar({
  categoryTree, filters, setFilter, toggleCategory, resetFilters, isDark,
  mobileVisible, onMobileToggle, isNarrow,
  sortKey, onSortChange,
}) {
  const { t } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const panelWidth = windowWidth * 0.85;

  const { showModal, slideAnim, scrimOpacity, handleClose } = useSlideAnimation(
    mobileVisible,
    panelWidth,
    onMobileToggle
  );

  const contentProps = {
    categoryTree,
    filters,
    setFilter,
    toggleCategory,
    resetFilters,
    isDark,
    t,
    isNarrow,
  };

  if (isNarrow) {
    return (
      <MobileFilterDrawer
        showModal={showModal}
        handleClose={handleClose}
        scrimOpacity={scrimOpacity}
        panelWidth={panelWidth}
        slideAnim={slideAnim}
        isDark={isDark}
        t={t}
      >
        <SidebarContent {...contentProps} onClose={handleClose} />
      </MobileFilterDrawer>
    );
  }

  return <SidebarContent {...contentProps} />;
}

