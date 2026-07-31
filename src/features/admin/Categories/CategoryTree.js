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
import { View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { ChipButton } from '@/components/ui/Button';
import styles from './CategoriesStyles';
import { ChevronRightIcon, ChevronDownIcon } from '@/components/Icons';
import { DesktopCategoryRow, MobileCategoryCard } from './CategoryRow';
import { useLanguage } from '../../../context/LanguageContext';
import DataTable from '@/components/domain/DataTable/DataTable';

/* ─── flatten tree respecting collapsed state ─────────────────── */

function flattenVisible(nodes, collapsed, depth = 0) {
  const rows = [];
  if (!Array.isArray(nodes)) return rows;
  nodes.forEach((node) => {
    if (!node) return;
    rows.push({ ...node, _depth: depth });
    const isCollapsed = collapsed.has(node.id);
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;
    if (!isCollapsed && hasChildren) {
      flattenVisible(node.children, collapsed, depth + 1).forEach((r) => rows.push(r));
    }
  });
  return rows;
}

function collectAllIds(nodes, acc = new Set()) {
  if (!Array.isArray(nodes)) return acc;
  nodes.forEach((n) => { if (n && n.id) acc.add(n.id); if (n?.children?.length) collectAllIds(n.children, acc); });
  return acc;
}

function collectParentIds(nodes, acc = new Set()) {
  if (!Array.isArray(nodes)) return acc;
  nodes.forEach((n) => { if (n?.children?.length) { if (n.id) acc.add(n.id); collectParentIds(n.children, acc); } });
  return acc;
}

/* ─── main component ──────────────────────────────────────────── */

export default function CategoryTree({ tree, onEdit, onAdd, products }) {
  const { t } = useLanguage();
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

  const rows = useMemo(() => flattenVisible(tree || [], collapsed), [tree, collapsed]);

  return (
    <View>
      {/* Single horizontal toolbar controls */}
      <View style={styles.toolbar}>
        <Button
          title={t('adminCategoriesAddBtn')}
          onPress={onAdd}
          variant="primary"
          size="md"
        />
        <ChipButton
          label={t('adminCategoriesExpandAll')}
          onPress={expandAll}
          leftIcon={<ChevronDownIcon size={14} />}
        />
        <ChipButton
          label={t('adminCategoriesCollapseAll')}
          onPress={collapseAll}
          leftIcon={<ChevronRightIcon size={14} />}
        />
      </View>

      <DataTable
        data={rows}
        columns={[
          { key: 'name', label: t('adminCategoriesColName'), style: styles.colName, sortable: false },
          { key: 'image', label: t('adminCategoriesColImage'), style: styles.colImage, sortable: false },
        ]}
        emptyText={t('adminCategoriesEmpty')}
        renderRow={(row, idx) => (
          <DesktopCategoryRow
            key={row.id}
            row={row}
            hasChildren={parentIds.has(row.id)}
            isCollapsed={collapsed.has(row.id)}
            onToggle={toggle}
            onEdit={onEdit}
            isAlt={idx % 2 === 1}
            products={products}
          />
        )}
        renderMobileRow={(row) => (
          <MobileCategoryCard
            key={row.id}
            row={row}
            hasChildren={parentIds.has(row.id)}
            isCollapsed={collapsed.has(row.id)}
            onToggle={toggle}
            onEdit={onEdit}
            products={products}
          />
        )}
        keyExtractor={(row) => row.id}
      />
    </View>
  );
}

