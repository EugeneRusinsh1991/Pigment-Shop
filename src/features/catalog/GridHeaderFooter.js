import { View, StyleSheet } from 'react-native';
import { Text } from '../../components/Text/Text';
import sidebarStyles from './CatalogFilterSidebarStyles';
import { SORT_OPTIONS } from './useCatalogFilters';
import CatalogPagination from './CatalogPagination';
import { AnimatedButton } from '../../components/Button';
import { layout } from '../../theme/tokens';

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
    <CatalogPagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPrev={onPrev}
      onNext={onNext}
      loading={loading}
      isDark={isDark}
      isNarrow={isNarrow}
    />
  );
}

const styles = StyleSheet.create({
  gridHeaderWrapper: {
    zIndex: layout.zIndices.drawer,
    position: 'relative',
  },
  sortDropdownPosition: {
    top: 54,
    right: layout.spacing.xxs,
    width: 165,
  },
});
