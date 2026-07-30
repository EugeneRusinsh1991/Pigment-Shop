import { StyleSheet, View } from 'react-native';
import { AnimatedButton } from '../../components/ui/Button';
import { Text } from '../../components/ui/Text/Text';
import { SORT_OPTIONS } from '../../hooks/useCatalogFilters';
import { layout } from '../../theme/tokens';
import sidebarStyles from './CatalogFilterSidebarStyles';
import CatalogPagination from './CatalogPagination';
import Footer from '../shell/components/Footer';

const getSortItemStyles = (isSelected, isDark) => {
  const itemStyle = [
    sidebarStyles.sortDropdownItem,
    isSelected && (isDark ? sidebarStyles.sortDropdownItemActiveDark : sidebarStyles.sortDropdownItemActiveLight),
  ];
  const textStyle = [
    sidebarStyles.sortDropdownText,
    isDark ? sidebarStyles.textDark : sidebarStyles.textLight,
  ];
  return { itemStyle, textStyle };
};

const getSortDropdownStyles = (isDark) => [
  sidebarStyles.sortDropdown,
  isDark ? sidebarStyles.sortDropdownDark : sidebarStyles.sortDropdownLight,
  styles.sortDropdownPosition,
];

const getGridHeaderStyles = (isDark) => {
  const buttonStyle = [
    sidebarStyles.mobileButton,
    isDark ? sidebarStyles.mobileButtonDark : sidebarStyles.mobileButtonLight,
  ];
  const textStyle = [
    sidebarStyles.mobileButtonText,
    isDark ? sidebarStyles.accentDark : sidebarStyles.accentLight,
  ];
  return { buttonStyle, textStyle };
};

function SortDropdownItem({ opt, isSelected, isDark, onSortChange, setSortDropdownVisible, t }) {
  const { itemStyle, textStyle } = getSortItemStyles(isSelected, isDark);

  return (
    <AnimatedButton
      style={itemStyle}
      onPress={() => {
        onSortChange(opt.key);
        setSortDropdownVisible(false);
      }}
    >
      <Text style={textStyle}>
        {t(opt.labelKey)}
      </Text>
    </AnimatedButton>
  );
}

function SortDropdown({ isDark, sortKey, onSortChange, setSortDropdownVisible, t }) {
  return (
    <View style={getSortDropdownStyles(isDark)}>
      {SORT_OPTIONS.map((opt) => (
        <SortDropdownItem
          key={opt.key}
          opt={opt}
          isSelected={sortKey === opt.key}
          isDark={isDark}
          onSortChange={onSortChange}
          setSortDropdownVisible={setSortDropdownVisible}
          t={t}
        />
      ))}
    </View>
  );
}

export function GridHeader({ isNarrow, isDark, onMobileToggle, sortDropdownVisible, setSortDropdownVisible, sortKey, onSortChange, t }) {
  if (!isNarrow) return null;

  const { buttonStyle, textStyle } = getGridHeaderStyles(isDark);

  return (
    <View style={styles.gridHeaderWrapper}>
      <View style={[sidebarStyles.mobileButtonsRow, { marginHorizontal: layout.spacing.xxs, gap: layout.spacing.sm }]}>
        <AnimatedButton
          style={buttonStyle}
          onPress={onMobileToggle}
        >
          <Text style={textStyle}>
            {t('catalogFilters')}
          </Text>
        </AnimatedButton>

        <AnimatedButton
          style={buttonStyle}
          onPress={() => setSortDropdownVisible((v) => !v)}
        >
          <Text style={textStyle}>
            {t('catalogSort')}
          </Text>
        </AnimatedButton>
      </View>

      {sortDropdownVisible && (
        <SortDropdown
          isDark={isDark}
          sortKey={sortKey}
          onSortChange={onSortChange}
          setSortDropdownVisible={setSortDropdownVisible}
          t={t}
        />
      )}
    </View>
  );
}

export function GridFooter({ currentPage, totalPages, onPrev, onNext, loading, isDark, isNarrow }) {
  return (
    <View style={styles.gridFooterContainer}>
      <CatalogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={onPrev}
        onNext={onNext}
        loading={loading}
        isDark={isDark}
        isNarrow={isNarrow}
      />
      <View style={styles.footerSpacer} />
      <Footer isDark={isDark} />
    </View>
  );
}

const styles = StyleSheet.create({
  gridHeaderWrapper: {
    zIndex: layout.zIndices.drawer,
    position: 'relative',
  },
  sortDropdownPosition: {
    top: layout.spacing.lg * 2 + 6,
    right: layout.spacing.xxs,
    width: 165,
  },
  gridFooterContainer: {
    width: '100%',
  },
  footerSpacer: {
    height: layout.spacing.xxl,
  },
});
