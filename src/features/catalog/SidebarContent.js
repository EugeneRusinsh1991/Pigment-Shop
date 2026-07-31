import React from 'react';
import { View, ScrollView } from 'react-native';
import { Heading } from '../../components/ui/Text';
import PriceRangeSlider from './PriceRangeSlider';
import styles from './CatalogFilterSidebarStyles';
import { SectionTitle, Checkbox, PriceInputs, ResetButton, ApplyButton } from './SidebarUIComponents';
import CategoryFilterList from './CategoryFilterList';

import { useCatalog } from './CatalogContext';
import useFilterCounts from '../../hooks/useFilterCounts';

function getSliderMin(filters) {
  if (filters.priceMin === '') return 0;
  return Number(filters.priceMin);
}

function getSliderMax(filters) {
  if (filters.priceMax === '') return 5000;
  return Number(filters.priceMax);
}

function getCleanPriceString(v) {
  return v.replace(/[^0-9]/g, '');
}

function handlePriceRangeChange(minVal, maxVal, setFilter) {
  setFilter('priceMin', minVal === 0 ? '' : minVal.toString());
  setFilter('priceMax', maxVal === 5000 ? '' : maxVal.toString());
}

function AvailabilityFilterSections({ filters, setFilter, isDark, t, counts }) {
  const inStockLabel = counts ? `${t('catalogInStock')} (${counts.inStock})` : t('catalogInStock');
  const outOfStockLabel = counts ? `${t('catalogOutOfStock')} (${counts.outOfStock})` : t('catalogOutOfStock');
  const onSaleLabel = counts ? `${t('catalogOnSale')} (${counts.onSale})` : t('catalogOnSale');
  const isNewLabel = counts ? `${t('catalogIsNew')} (${counts.isNew})` : t('catalogIsNew');

  return (
    <View style={styles.filterSection}>
      <SectionTitle label={t('catalogAvailability')} isDark={isDark} />
      <View style={styles.optionsGroup}>
        <Checkbox testID="filter-instock" checked={filters.inStock} label={inStockLabel} onToggle={() => setFilter('inStock', !filters.inStock)} isDark={isDark} />
        <Checkbox testID="filter-outofstock" checked={filters.outOfStock} label={outOfStockLabel} onToggle={() => setFilter('outOfStock', !filters.outOfStock)} isDark={isDark} />
        <Checkbox testID="filter-onsale" checked={filters.onSale} label={onSaleLabel} onToggle={() => setFilter('onSale', !filters.onSale)} isDark={isDark} />
        <Checkbox testID="filter-isnew" checked={filters.isNew} label={isNewLabel} onToggle={() => setFilter('isNew', !filters.isNew)} isDark={isDark} />
      </View>
    </View>
  );
}

function PriceFilterSection({ filters, setFilter, isDark, t }) {
  const sliderMin = getSliderMin(filters);
  const sliderMax = getSliderMax(filters);
  const handleSliderChange = (minVal, maxVal) => handlePriceRangeChange(minVal, maxVal, setFilter);
  const handleMinChange = (v) => setFilter('priceMin', getCleanPriceString(v));
  const handleMaxChange = (v) => setFilter('priceMax', getCleanPriceString(v));

  return (
    <View style={styles.priceSection}>
      <SectionTitle label={t('catalogPriceRange')} isDark={isDark} isPrice />
      <PriceRangeSlider
        minValue={sliderMin}
        maxValue={sliderMax}
        minLimit={0}
        maxLimit={5000}
        onChange={handleSliderChange}
        isDark={isDark}
      />
      <PriceInputs
        priceMin={filters.priceMin}
        priceMax={filters.priceMax}
        onMinChange={handleMinChange}
        onMaxChange={handleMaxChange}
        isDark={isDark}
        t={t}
      />
    </View>
  );
}

function CategoryFilterSection({ categoryTree, filters, toggleCategory, isDark, t, categoryCounts }) {
  return (
    <View style={styles.filterSection}>
      <SectionTitle label={t('catalogCategory')} isDark={isDark} />
      <View style={styles.optionsGroup}>
        <CategoryFilterList
          categoryTree={categoryTree}
          filters={filters}
          toggleCategory={toggleCategory}
          isDark={isDark}
          categoryCounts={categoryCounts}
        />
      </View>
    </View>
  );
}

function SidebarHeader({ isNarrow, isDark, label }) {
  if (isNarrow) return null;
  return (
    <Heading level={4} style={styles.heading} isDark={isDark}>
      {label}
    </Heading>
  );
}

function SidebarActions({ isNarrow, onClose, resetFilters, isDark, t }) {
  const showApply = isNarrow && onClose;
  return (
    <>
      {showApply && (
        <ApplyButton onApply={onClose} label={t('catalogApplyFilters')} />
      )}
      <ResetButton onReset={resetFilters} isDark={isDark} label={t('catalogResetFilters')} />
    </>
  );
}

export default function SidebarContent({ categoryTree, filters, setFilter, toggleCategory, resetFilters, isDark, t, isNarrow, onClose }) {
  const sidebarStyle = isNarrow ? styles.sidebarMobile : styles.sidebar;
  const themeStyle = isDark ? styles.sidebarDark : styles.sidebarLight;
  const { flatList = [], categorySubtreeMap } = useCatalog() || {};
  const counts = useFilterCounts(flatList, filters, categorySubtreeMap);

  return (
    <ScrollView
      style={[sidebarStyle, themeStyle]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <SidebarHeader isNarrow={isNarrow} isDark={isDark} label={t('catalogFilters')} />

      <PriceFilterSection filters={filters} setFilter={setFilter} isDark={isDark} t={t} />

      <AvailabilityFilterSections filters={filters} setFilter={setFilter} isDark={isDark} t={t} counts={counts} />

      <CategoryFilterSection categoryTree={categoryTree} filters={filters} toggleCategory={toggleCategory} isDark={isDark} t={t} categoryCounts={counts?.categories} />

      <SidebarActions
        isNarrow={isNarrow}
        onClose={onClose}
        resetFilters={resetFilters}
        isDark={isDark}
        t={t}
      />
    </ScrollView>
  );
}
