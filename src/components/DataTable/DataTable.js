import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import EmptyState from './EmptyState';
import { colors, layout, shadows } from '../../theme/tokens';
import { useTheme } from '../../context/ThemeContext';
import AnimatedButton from '../AnimatedButton';

function SortIndicator({ isActive, direction, style }) {
  return (
    <Text style={[style, !isActive && { color: colors.slateStrong }]}>
      {isActive ? (direction === 'asc' ? ' ▲' : ' ▼') : ' ↕'}
    </Text>
  );
}

function getHeaderAlignStyle(align) {
  if (align === 'right') return { justifyContent: 'flex-end' };
  if (align === 'center') return { justifyContent: 'center' };
  if (align === 'left') return { justifyContent: 'flex-start' };
  return null;
}

function getHeaderColStyle(col) {
  return [
    styles.colHeader,
    col.flex ? { flex: col.flex } : null,
    col.width ? { width: col.width } : null,
    getHeaderAlignStyle(col.align),
    col.style
  ];
}

function HeaderCellContent({ col, sortField, sortDirection, isDark, isSortable }) {
  return (
    <>
      <Text style={[styles.thText, isDark ? styles.thTextDark : null]}>{col.label}</Text>
      {isSortable ? (
        <SortIndicator 
          isActive={sortField === col.key} 
          direction={sortDirection} 
          style={styles.sortArrow} 
        />
      ) : null}
    </>
  );
}

function HeaderCell({ col, sortField, sortDirection, onSort, isDark }) {
  const isSortable = col.sortable !== false && Boolean(col.key);
  const colStyle = getHeaderColStyle(col);

  if (isSortable) {
    return (
      <AnimatedButton 
        style={colStyle}
        onPress={() => onSort ? onSort(col.key) : null}
      >
        <HeaderCellContent col={col} sortField={sortField} sortDirection={sortDirection} isDark={isDark} isSortable={true} />
      </AnimatedButton>
    );
  }

  return (
    <View style={colStyle}>
      <HeaderCellContent col={col} sortField={sortField} sortDirection={sortDirection} isDark={isDark} isSortable={false} />
    </View>
  );
}

function renderDataTableHeader(columns, sortField, sortDirection, onSort, isDark, headerStyle) {
  return (
    <View style={[styles.header, isDark && styles.headerDark, headerStyle]}>
      {columns.map((col, idx) => (
        <HeaderCell
          key={col.key || idx}
          col={col}
          idx={idx}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
          isDark={isDark}
        />
      ))}
    </View>
  );
}

function renderDataTableRow(item, index, isMobile, renderMobileRow, renderRow, keyExtractor) {
  const rowRenderer = (isMobile && renderMobileRow) ? renderMobileRow : renderRow;
  return <React.Fragment key={keyExtractor(item, index)}>{rowRenderer(item, index)}</React.Fragment>;
}

function TableBody({ data, columns, sortField, sortDirection, onSort, isDark, headerStyle, isMobile, renderMobileRow, renderRow, keyExtractor }) {
  const showHeader = Boolean((!isMobile || !renderMobileRow) && columns);
  return (
    <>
      {showHeader && renderDataTableHeader(columns, sortField, sortDirection, onSort, isDark, headerStyle)}
      {data.map((item, index) => renderDataTableRow(item, index, isMobile, renderMobileRow, renderRow, keyExtractor))}
    </>
  );
}

/**
 * Generic configuration-driven DataTable component.
 */
export default function DataTable(props) {
  const {
    data,
    columns,
    sortField,
    sortDirection,
    onSort,
    emptyText,
    renderRow,
    renderMobileRow,
    keyExtractor = (item, index) => item.id || index,
    style,
    headerStyle,
  } = props;
  const { width } = useWindowDimensions();
  const isMobile = width < layout.breakpoints.mobile;
  const { isDark } = useTheme();

  const cardStyle = [styles.tableCard, isDark && styles.tableCardDark, style];

  if (!data || data.length === 0) {
    return (
      <View style={cardStyle}>
        <EmptyState>{emptyText}</EmptyState>
      </View>
    );
  }

  return (
    <View style={cardStyle}>
      <TableBody
        data={data}
        columns={columns}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={onSort}
        isDark={isDark}
        headerStyle={headerStyle}
        isMobile={isMobile}
        renderMobileRow={renderMobileRow}
        renderRow={renderRow}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

export function DataTableRow({ children, onPress, style, index = 0, isDark = false, ...props }) {
  const rowStyle = [
    styles.rowBase,
    index % 2 === 1 && (isDark ? styles.rowAltDark : styles.rowAltLight),
    style,
  ];

  if (onPress) {
    return (
      <AnimatedButton style={rowStyle} onPress={onPress} {...props}>
        {children}
      </AnimatedButton>
    );
  }

  return <View style={rowStyle} {...props}>{children}</View>;
}

export function DataTableCell({ children, style, flex, width, align, ...props }) {
  const cellStyle = [
    styles.cellBase,
    flex ? { flex } : null,
    width ? { width } : null,
    align === 'right' ? { alignItems: 'flex-end' } : null,
    align === 'center' ? { alignItems: 'center' } : null,
    style,
  ];

  return <View style={cellStyle} {...props}>{children}</View>;
}

const styles = StyleSheet.create({
  tableCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.md,
    ...shadows.cardLight.web,
    marginBottom: 20,
    overflow: 'hidden',
  },
  tableCardDark: {
    backgroundColor: colors.surfaceDark,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSlateLight,
    backgroundColor: colors.slateLight,
  },
  headerDark: {
    borderBottomColor: colors.borderSlateDark,
    backgroundColor: colors.surfaceNeutralDark,
  },
  thText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.slateText,
    textTransform: 'uppercase',
  },
  thTextDark: {
    color: colors.textMutedDark,
  },
  colHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortArrow: {
    fontSize: 10,
  },
  rowBase: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    minHeight: 44,
  },
  rowAltLight: {
    backgroundColor: colors.surfaceSubtleLight,
  },
  rowAltDark: {
    backgroundColor: colors.surfaceSubtleDark,
  },
  cellBase: {
    justifyContent: 'center',
  },
});
