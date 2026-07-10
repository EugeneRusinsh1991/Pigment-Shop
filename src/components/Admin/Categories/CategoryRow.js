import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MAX_DEPTH } from '../../../services/adminCategoriesService';
import styles from './CategoriesStyles';
import { PlusIcon, EditIcon, TrashIcon, ChevronRightIcon, ChevronDownIcon, CheckIcon, CrossIcon } from '../../Icons';
import { useTheme } from '../../../context/ThemeContext';

const INDENT_PER_LEVEL = 20;

const getImageBadgeStyle = (has) => [
  styles.imageBadge,
  has ? styles.imageBadgeSet : styles.imageBadgeNone
];

const getImageBadgeTextStyle = (has) => [
  styles.imageBadgeText,
  has ? styles.imageBadgeSetText : styles.imageBadgeNoneText,
  { marginLeft: 4 }
];

function ImageBadge({ image }) {
  const { t } = useTheme();
  const has = !!image;
  return (
    <View style={getImageBadgeStyle(has)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {has ? <CheckIcon color="#16A34A" size={12} /> : <CrossIcon color="#DC2626" size={12} />}
        <Text style={getImageBadgeTextStyle(has)}>
          {has ? t('adminCategoriesImageSet') : t('adminCategoriesImageNone')}
        </Text>
      </View>
    </View>
  );
}

function resolveCategoryName(name, lang) {
  if (!name) return '—';
  const lVal = name[lang];
  if (lVal) return lVal;
  const ruVal = name.ru;
  if (ruVal) return ruVal;
  return '—';
}

function ToggleButton({ hasChildren, isCollapsed, onToggle, rowId }) {
  if (!hasChildren) return <View style={styles.togglePlaceholder} />;
  return (
    <TouchableOpacity style={[styles.toggleBtn, { justifyContent: 'center', alignItems: 'center' }]} onPress={() => onToggle(rowId)} activeOpacity={0.7}>
      {isCollapsed ? <ChevronRightIcon color="#475569" size={12} /> : <ChevronDownIcon color="#475569" size={12} />}
    </TouchableOpacity>
  );
}

function NameCell({ row, indent, hasChildren, isCollapsed, onToggle }) {
  const { lang } = useTheme();
  return (
    <View style={[styles.colName, { paddingLeft: indent }]}>
      <View style={styles.nameCell}>
        <ToggleButton hasChildren={hasChildren} isCollapsed={isCollapsed} onToggle={onToggle} rowId={row.id} />
        <View>
          <Text style={styles.categoryName}>{resolveCategoryName(row.name, lang)}</Text>
          <Text style={styles.categoryId}>{row.id}</Text>
        </View>
      </View>
    </View>
  );
}

function ActionsCell({ row, canAddChild, onAddChild, onEdit, onDelete }) {
  return (
    <View style={styles.colActions}>
      {canAddChild && (
        <TouchableOpacity style={styles.addChildBtn} onPress={() => onAddChild(row)} activeOpacity={0.75}>
          <PlusIcon color="#2563EB" size={14} />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.actionBtn} onPress={() => onEdit(row)} activeOpacity={0.75}>
        <EditIcon color="#475569" size={14} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={() => onDelete(row.id)} activeOpacity={0.75}>
        <TrashIcon color="#EF4444" size={14} />
      </TouchableOpacity>
    </View>
  );
}

const getIsCategoryHolder = (row, hasChildren) => {
  if (row.type === 'category_holder') return true;
  return !row.type && hasChildren;
};

const getCanAddChild = (row, isHolder) => {
  const depth = row.depth || 1;
  return depth < MAX_DEPTH && isHolder;
};

export default function CategoryRow({ row, hasChildren, isCollapsed, onToggle, onEdit, onAddChild, onDelete, isAlt }) {
  const indent = row._depth * INDENT_PER_LEVEL;
  const isCategoryHolder = getIsCategoryHolder(row, hasChildren);
  const canAddChild = getCanAddChild(row, isCategoryHolder);

  return (
    <View style={[styles.treeRow, isAlt && styles.treeRowAlt]}>
      <NameCell row={row} indent={indent} hasChildren={hasChildren} isCollapsed={isCollapsed} onToggle={onToggle} />
      <View style={styles.colImage}>
        <ImageBadge image={row.image} />
      </View>
      <ActionsCell row={row} canAddChild={canAddChild} onAddChild={onAddChild} onEdit={onEdit} onDelete={onDelete} />
    </View>
  );
}
