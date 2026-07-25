import React from 'react';
import { View } from 'react-native';
import { CategoryLabelButton, CategoryExpandButton } from './CategoryTreeNodeButtons';
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
    iconColor: isDark ? '#f1f5f9' : '#0f172a',
    arrowColor: isDark ? '#475569' : '#94a3b8',
  };
}

function TreeNodeRow({ isDark, hasChildren, node, onClose, isHighlighted, indent, isExpanded, toggleExpand }) {
  const { iconColor, arrowColor } = getTreeNodeTheme(isDark);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
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
    <View style={{ width: '100%' }}>
      <TreeNodeRow
        isDark={isDark}
        hasChildren={hasChildren}
        node={node}
        onClose={onClose}
        isHighlighted={isHighlighted}
        indent={depth * 8}
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
