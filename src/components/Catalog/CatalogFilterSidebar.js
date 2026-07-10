import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import PriceRangeSlider from './PriceRangeSlider';
import styles from './CatalogFilterSidebarStyles';
import { CheckIcon } from '../Icons';

function SectionTitle({ label, isDark }) {
  return (
    <Text style={[styles.sectionTitle, isDark ? styles.textDark : styles.textLight]}>
      {label}
    </Text>
  );
}

function Checkbox({ checked, label, onToggle, isDark }) {
  return (
    <TouchableOpacity style={styles.checkRow} onPress={onToggle} activeOpacity={0.7}>
      <View style={[styles.checkbox, checked && styles.checkboxActive, { justifyContent: 'center', alignItems: 'center' }]}>
        {checked && <CheckIcon color="#FFFFFF" size={10} />}
      </View>
      <Text style={[styles.checkLabel, isDark ? styles.textDark : styles.textLight]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function PriceInputs({ priceMin, priceMax, onMinChange, onMaxChange, isDark }) {
  const inputStyle = [styles.priceInput, isDark ? styles.inputDark : styles.inputLight];
  return (
    <View style={styles.priceColumn}>
      <View style={styles.priceFieldRow}>
        <Text style={[styles.priceFieldLabel, isDark ? styles.textDark : styles.textLight]}>Min</Text>
        <TextInput
          style={inputStyle}
          placeholder="0"
          placeholderTextColor={isDark ? '#666' : '#aaa'}
          keyboardType="numeric"
          value={priceMin}
          onChangeText={onMinChange}
        />
      </View>
      <View style={styles.priceFieldRow}>
        <Text style={[styles.priceFieldLabel, isDark ? styles.textDark : styles.textLight]}>Max</Text>
        <TextInput
          style={inputStyle}
          placeholder="5000"
          placeholderTextColor={isDark ? '#666' : '#aaa'}
          keyboardType="numeric"
          value={priceMax}
          onChangeText={onMaxChange}
        />
      </View>
    </View>
  );
}

function Divider({ isDark }) {
  return <View style={[styles.divider, isDark ? styles.dividerDark : styles.dividerLight]} />;
}

function ResetButton({ onReset, isDark }) {
  return (
    <TouchableOpacity style={styles.resetBtn} onPress={onReset} activeOpacity={0.7}>
      <Text style={[styles.resetText, isDark ? styles.accentDark : styles.accentLight]}>
        Reset filters
      </Text>
    </TouchableOpacity>
  );
}

function SubcategoryFilters({ catNode, filters, toggleSubcategory, isDark }) {
  if (!catNode.children) return null;
  return catNode.children.map((subcat) => (
    <View key={subcat.id} style={{ marginLeft: 16 }}>
      <Checkbox
        checked={filters.subcategories.includes(subcat.label)}
        label={subcat.label}
        onToggle={() => toggleSubcategory(subcat.label)}
        isDark={isDark}
      />
    </View>
  ));
}

function CategoryFilterNode({ catNode, filters, toggleCategory, toggleSubcategory, isDark }) {
  const isChecked = filters.categories.includes(catNode.label);
  return (
    <View key={catNode.id}>
      <Checkbox
        checked={isChecked}
        label={catNode.label}
        onToggle={() => toggleCategory(catNode.label)}
        isDark={isDark}
      />
      {isChecked && (
        <SubcategoryFilters catNode={catNode} filters={filters} toggleSubcategory={toggleSubcategory} isDark={isDark} />
      )}
    </View>
  );
}

function CategoryFilterList({ categoryTree, filters, toggleCategory, toggleSubcategory, isDark }) {
  if (!categoryTree) return null;
  const roots = categoryTree.filter((node) => node.id.startsWith('cat-'));
  
  return roots.map((catNode) => (
    <CategoryFilterNode
      key={catNode.id}
      catNode={catNode}
      filters={filters}
      toggleCategory={toggleCategory}
      toggleSubcategory={toggleSubcategory}
      isDark={isDark}
    />
  ));
}

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

export default function CatalogFilterSidebar({ categoryTree, filters, setFilter, toggleCategory, toggleSubcategory, resetFilters, isDark }) {
  const sliderMin = getSliderMin(filters);
  const sliderMax = getSliderMax(filters);

  const handleSliderChange = (minVal, maxVal) => handlePriceRangeChange(minVal, maxVal, setFilter);
  const handleMinChange = (v) => setFilter('priceMin', getCleanPriceString(v));
  const handleMaxChange = (v) => setFilter('priceMax', getCleanPriceString(v));

  return (
    <ScrollView
      style={[styles.sidebar, isDark ? styles.sidebarDark : styles.sidebarLight]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.heading, isDark ? styles.textDark : styles.textLight]}>Filters</Text>

      <SectionTitle label="Price range" isDark={isDark} />
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
      />

      <Divider isDark={isDark} />

      <SectionTitle label="Availability" isDark={isDark} />
      <Checkbox checked={filters.inStock} label="In Stock" onToggle={() => setFilter('inStock', !filters.inStock)} isDark={isDark} />
      <Checkbox checked={filters.outOfStock} label="Out of Stock" onToggle={() => setFilter('outOfStock', !filters.outOfStock)} isDark={isDark} />

      <Divider isDark={isDark} />

      <Checkbox checked={filters.onSale} label="On Sale" onToggle={() => setFilter('onSale', !filters.onSale)} isDark={isDark} />
      <Checkbox checked={filters.isNew} label="New" onToggle={() => setFilter('isNew', !filters.isNew)} isDark={isDark} />

      <Divider isDark={isDark} />

      <SectionTitle label="Category" isDark={isDark} />
      <CategoryFilterList
        categoryTree={categoryTree}
        filters={filters}
        toggleCategory={toggleCategory}
        toggleSubcategory={toggleSubcategory}
        isDark={isDark}
      />

      <Divider isDark={isDark} />

      <ResetButton onReset={resetFilters} isDark={isDark} />
    </ScrollView>
  );
}
