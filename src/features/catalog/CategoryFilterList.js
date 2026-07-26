import { View } from 'react-native';
import { Checkbox } from './SidebarUIComponents';
import styles from './CatalogFilterSidebarStyles';

function CategoryTreeNode({ node, filters, toggleCategory, depth, isDark }) {
  if (!node.isCategory) return null;

  const categoryChildren = node.children ? node.children.filter((c) => c.isCategory) : [];
  const isChecked = filters.categoryIds.includes(node.id);
  const indent = depth * 14;

  return (
    <View>
      <View style={[styles.categoryRow, { paddingLeft: indent }]}>
        <View style={styles.categoryCheckboxWrapper}>
          <Checkbox
            testID={`category-checkbox-${node.id}`}
            checked={isChecked}
            label={node.label}
            onToggle={() => toggleCategory(node.id)}
            isDark={isDark}
          />
        </View>
      </View>

      {isChecked && categoryChildren.map((child) => (
        <CategoryTreeNode
          key={child.id}
          node={child}
          filters={filters}
          toggleCategory={toggleCategory}
          depth={depth + 1}
          isDark={isDark}
        />
      ))}
    </View>
  );
}

export default function CategoryFilterList({ categoryTree, filters, toggleCategory, isDark }) {
  if (!categoryTree) return null;
  const roots = categoryTree.filter((node) => node.isCategory);
  return roots.map((node) => (
    <CategoryTreeNode
      key={node.id}
      node={node}
      filters={filters}
      toggleCategory={toggleCategory}
      depth={0}
      isDark={isDark}
    />
  ));
}
