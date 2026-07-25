import { Text, View } from 'react-native';
import sidebarStyles from './CatalogFilterSidebarStyles';
import { SORT_OPTIONS } from './useCatalogFilters';
import CatalogPagination from './CatalogPagination';
import AnimatedButton from '../AnimatedButton';

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
  { top: 54, right: 4, width: 165 },
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
    <View style={{ zIndex: 1000, position: 'relative' }}>
      <View style={[sidebarStyles.mobileButtonsRow, { marginHorizontal: 4, gap: 8 }]}>
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
