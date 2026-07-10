/**
 * CategoryTree.js
 *
 * Collapsible category tree table.
 * - Each row with children has a ▶/▼ toggle.
 * - Each row has + (add child) and ✏️ and 🗑️ action buttons.
 * - Header bar has Expand All / Collapse All controls.
 * - Collapsed categories hide their descendants.
 * - Enforces MAX_DEPTH: hides + button on depth-5 rows.
 */
import React, { useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './CategoriesStyles';
import { ChevronRightIcon, ChevronDownIcon } from '../../Icons';
import CategoryRow from './CategoryRow';
import { useTheme } from '../../../context/ThemeContext';

/* ─── flatten tree respecting collapsed state ─────────────────── */

function flattenVisible(nodes, collapsed, depth = 0) {
  const rows = [];
  nodes.forEach((node) => {
    rows.push({ ...node, _depth: depth });
    const isCollapsed = collapsed.has(node.id);
    if (!isCollapsed && node.children?.length > 0) {
      flattenVisible(node.children, collapsed, depth + 1).forEach((r) => rows.push(r));
    }
  });
  return rows;
}

function collectAllIds(nodes, acc = new Set()) {
  nodes.forEach((n) => { acc.add(n.id); if (n.children?.length) collectAllIds(n.children, acc); });
  return acc;
}

function collectParentIds(nodes, acc = new Set()) {
  nodes.forEach((n) => { if (n.children?.length) { acc.add(n.id); collectParentIds(n.children, acc); } });
  return acc;
}

/* ─── main component ──────────────────────────────────────────── */

export default function CategoryTree({ tree, onEdit, onAddChild, onDelete }) {
  const { t } = useTheme();
  const parentIds = useMemo(() => collectParentIds(tree), [tree]);
  const [collapsed, setCollapsed] = useState(new Set());

  const toggle = useCallback((id) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => setCollapsed(new Set()), []);
  const collapseAll = useCallback(() => setCollapsed(new Set(collectAllIds(tree))), [tree]);

  const rows = useMemo(() => flattenVisible(tree, collapsed), [tree, collapsed]);

  if (rows.length === 0 && tree.length === 0) {
    return <Text style={styles.emptyText}>{t('adminCategoriesEmpty')}</Text>;
  }

  return (
    <View>
      {/* Expand / Collapse All */}
      <View style={styles.treeControls}>
        <TouchableOpacity style={[styles.treeControlBtn, { flexDirection: 'row', alignItems: 'center' }]} onPress={expandAll} activeOpacity={0.8}>
          <ChevronDownIcon color="#2563EB" size={12} style={{ marginRight: 6 }} />
          <Text style={styles.treeControlBtnText}>{t('adminCategoriesExpandAll')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.treeControlBtn, { flexDirection: 'row', alignItems: 'center' }]} onPress={collapseAll} activeOpacity={0.8}>
          <ChevronRightIcon color="#2563EB" size={12} style={{ marginRight: 6 }} />
          <Text style={styles.treeControlBtnText}>{t('adminCategoriesCollapseAll')}</Text>
        </TouchableOpacity>
      </View>

      {/* Tree table */}
      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <View style={styles.colName}><Text style={styles.thText}>{t('adminCategoriesColName')}</Text></View>
          <View style={styles.colImage}><Text style={styles.thText}>{t('adminCategoriesColImage')}</Text></View>
          <View style={styles.colActions} />
        </View>
        {rows.map((row, idx) => (
          <CategoryRow
            key={row.id}
            row={row}
            hasChildren={parentIds.has(row.id)}
            isCollapsed={collapsed.has(row.id)}
            onToggle={toggle}
            onEdit={onEdit}
            onAddChild={onAddChild}
            onDelete={onDelete}
            isAlt={idx % 2 === 1}
          />
        ))}
      </View>
    </View>
  );
}
