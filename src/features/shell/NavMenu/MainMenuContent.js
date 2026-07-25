import { useState, useCallback } from 'react';
import { Platform, UIManager, LayoutAnimation, Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import Button, { IconButton } from '../../../components/Button';
import { ChevronDownIcon, ChevronRightIcon } from '../../../components/Icons';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useCatalog } from '../../../context/CatalogContext';
import { getNavItemIcon } from './NavItemList';
import styles from './NavMenuStyles';
import CategoryTreeNode, { useExpandedIds } from './CategoryTreeNode';
import { useAutoExpandSelectedCategory } from './useExpandedIds';

function MenuRowItem({ isDark, item, iconColor, onPress, style, href, onClose }) {
  const router = useRouter();

  const handlePress = () => {
    if (onClose) onClose();
    if (href) {
      router.push(href);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <Button
      variant="ghost"
      isDark={isDark}
      style={StyleSheet.flatten([styles.itemRow, isDark ? styles.itemRowDark : styles.itemRowLight, { paddingVertical: 12, minHeight: 44 }, style])}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrapper}>
        {getNavItemIcon(item, iconColor)}
      </View>
      <Text style={[styles.itemLabel, isDark ? styles.textDark : styles.textLight, styles.mainNavLabel, { fontWeight: '700' }]} numberOfLines={1}>
        {item.label}
      </Text>
    </Button>
  );
}

function CatalogMenuRow({
  isDark,
  item,
  iconColor,
  arrowColor,
  onCatalogPress,
  toggleCatalogExpand,
  catalogExpanded
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <MenuRowItem
        isDark={isDark}
        item={item}
        iconColor={iconColor}
        href="/catalog"
        onClose={onCatalogPress}
        style={{ flex: 1 }}
      />

      <IconButton
        icon={catalogExpanded ? <ChevronDownIcon color={arrowColor} size={14} /> : <ChevronRightIcon color={arrowColor} size={14} />}
        onPress={toggleCatalogExpand}
        size={44}
        variant="transparent"
        isDark={isDark}
        animated={true}
      />
    </View>
  );
}

export default function MainMenuContent({
  isDark,
  onClose,
  selectedCategoryId,
}) {
  const [catalogExpanded, setCatalogExpanded] = useState(false);
  const [expandedIds, toggleExpand, clearAllExpanded, setExpandedIds, lastExpandedId] = useExpandedIds();
  const { categoryTree } = useCatalog();
  const { t } = useLanguage();

  const handleExpandCatalog = useCallback(() => {
    setCatalogExpanded(true);
  }, []);

  useAutoExpandSelectedCategory(selectedCategoryId, categoryTree, setExpandedIds, handleExpandCatalog);

  const toggleCatalogExpand = () => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental &&
      !global.nativeFabricUIManager
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCatalogExpanded((prev) => {
      const next = !prev;
      if (!next) {
        clearAllExpanded();
      }
      return next;
    });
  };

  const iconColor = isDark ? '#f1f5f9' : '#0f172a';
  const arrowColor = isDark ? '#475569' : '#94a3b8';

  const catalogItem = { id: 'nav-catalog', label: t('navCatalog'), icon: '▣' };
  const allProductsItem = { id: 'nav-all-products', label: t('navAllProducts'), icon: '⬢' };
  const contactItem = { id: 'nav-contact', label: t('navContactUs'), icon: '✉' };

  const roots = categoryTree ? categoryTree.filter((node) => node.isCategory) : [];

  return (
    <View style={{ paddingVertical: 8 }}>
      {/* 1. Catalog Item */}
      <View>
        <CatalogMenuRow
          isDark={isDark}
          item={catalogItem}
          iconColor={iconColor}
          arrowColor={arrowColor}
          onCatalogPress={onClose}
          toggleCatalogExpand={toggleCatalogExpand}
          catalogExpanded={catalogExpanded}
        />

        {/* Catalog Subtree */}
        {catalogExpanded && roots.map((node) => (
          <CategoryTreeNode
            key={node.id}
            node={node}
            depth={1}
            isDark={isDark}
            expandedIds={expandedIds}
            toggleExpand={toggleExpand}
            onClose={onClose}
            selectedCategoryId={selectedCategoryId}
            lastExpandedId={lastExpandedId}
          />
        ))}
      </View>

      {/* 2. All Products Item */}
      <MenuRowItem
        isDark={isDark}
        item={allProductsItem}
        iconColor={iconColor}
        href="/products"
        onClose={onClose}
      />

      {/* 3. Contact Us Item */}
      <MenuRowItem
        isDark={isDark}
        item={contactItem}
        iconColor={iconColor}
        href="/contact"
        onClose={onClose}
      />
    </View>
  );
}
// Force reload

