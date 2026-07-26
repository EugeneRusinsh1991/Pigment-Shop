import React from 'react';
import { View } from 'react-native';
import { CategoryLabelButton, CategoryExpandButton } from './CategoryTreeNodeButtons';
import { colors, layout } from '../../../theme/tokens';
import styles from './NavMenuStyles';
export { useExpandedIds } from './useExpandedIds';

function getCategoryChildren(node) {
  if (!node.children) return [];
  return node.children.filter((c) => c.isCategory);
}

function getDescendantIds(node) {
  let ids = [];
  if (node.children) {
    node.children.forEach((child) => {
      if (child.isCategory) {
        ids.push(child.id);
        ids = ids.concat(getDescendantIds(child));
      }
    });
  }
  return ids;
}

function CategoryTreeChildrenList({
  children,
  depth,
  isDark,
  expandedIds,
  toggleExpand,
  onClose,
  selectedCategoryId,
  lastExpandedId,
}) {
  return (
    <>
      {children.map((child) => (
        <CategoryTreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          isDark={isDark}
          expandedIds={expandedIds}
          toggleExpand={toggleExpand}
          onClose={onClose}
          selectedCategoryId={selectedCategoryId}
          lastExpandedId={lastExpandedId}
        />
      ))}
    </>
  );
}

function getTreeNodeTheme(isDark) {
  return {
    iconColor: isDark ? colors.slateMid : colors.navTextDark,
    arrowColor: isDark ? colors.textDescLight : colors.textDescDark,
  };
}

function TreeNodeRow({ isDark, hasChildren, node, onClose, isHighlighted, indent, isExpanded, toggleExpand }) {
  const { iconColor, arrowColor } = getTreeNodeTheme(isDark);

  return (
    <View style={styles.treeNodeRow}>
      <CategoryLabelButton
        isDark={isDark}
        hasChildren={hasChildren}
        node={node}
        iconColor={iconColor}
        onClose={onClose}
        isSelected={isHighlighted}
        indent={indent}
      />

      {hasChildren && (
        <CategoryExpandButton
          isDark={isDark}
          arrowColor={arrowColor}
          isExpanded={isExpanded}
          onPress={() => toggleExpand(node.id, getDescendantIds(node))}
          isSelected={isHighlighted}
        />
      )}
    </View>
  );
}

export default function CategoryTreeNode({
  node,
  depth,
  isDark,
  expandedIds,
  toggleExpand,
  onClose,
  selectedCategoryId,
  lastExpandedId,
}) {
  if (!node.isCategory) return null;

  const categoryChildren = getCategoryChildren(node);
  const hasChildren = categoryChildren.length > 0;
  const isExpanded = expandedIds.includes(node.id);
  const isHighlighted = lastExpandedId === node.id || selectedCategoryId === node.id;

  return (
    <View style={styles.treeNodeWrapper}>
      <TreeNodeRow
        isDark={isDark}
        hasChildren={hasChildren}
        node={node}
        onClose={onClose}
        isHighlighted={isHighlighted}
        indent={depth * layout.spacing.sm}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
      />

      {isExpanded && (
        <CategoryTreeChildrenList
          children={categoryChildren}
          depth={depth}
          isDark={isDark}
          expandedIds={expandedIds}
          toggleExpand={toggleExpand}
          onClose={onClose}
          selectedCategoryId={selectedCategoryId}
          lastExpandedId={lastExpandedId}
        />
      )}
    </View>
  );
}
