import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '../../ui/Text';
import EmptyState from './EmptyState';
import { colors } from '../../../theme/tokens';
import { AnimatedButton } from '../../ui/Button';
import { styles, getHeaderColStyle, getRowStyle, getCellStyle } from './DataTableStyles';
import useDataTableTheme from './useDataTableTheme';
import useDataTable from './useDataTable';

function SortIndicator({ isActive, direction, style }) {
  return (
    <Text variant="overline" style={[style, !isActive && styles.sortIndicatorInactive]}>
      {isActive ? (direction === 'asc' ? ' ▲' : ' ▼') : ' ↕'}
    </Text>
  );
}

function HeaderCellContent({ col, sortField, sortDirection, isDark, isSortable }) {
  return (
    <>
      <Text variant="overline" style={[styles.thText, isDark ? styles.thTextDark : null]}>{col.label}</Text>
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
        style={[colStyle]}
        onPress={() => onSort ? onSort(col.key) : null}
      >
        <HeaderCellContent col={col} sortField={sortField} sortDirection={sortDirection} isDark={isDark} isSortable={true} />
      </AnimatedButton>
    );
  }

  return (
    <View style={[colStyle]}>
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
    sortField: propSortField,
    sortDirection: propSortDirection,
    onSort: propOnSort,
    emptyText,
    renderRow,
    renderMobileRow,
    keyExtractor = (item, index) => item?.id ?? index,
    style,
    headerStyle,
    isDark: isDarkProp,
  } = props;

  const { isDark } = useDataTableTheme({ isDarkProp });
  const { isMobile, sortField, sortDirection, handleSort, getItemKey } = useDataTable({
    sortField: propSortField,
    sortDirection: propSortDirection,
    onSort: propOnSort,
    keyExtractor,
  });

  const cardStyle = [styles.tableCard, isDark && styles.tableCardDark, style];

  if (!data || data.length === 0) {
    return (
      <View style={[cardStyle]}>
        <EmptyState>{emptyText}</EmptyState>
      </View>
    );
  }

  return (
    <View style={[cardStyle]}>
      <ScrollView horizontal contentContainerStyle={{ minWidth: '100%' }}>
        <View style={{ minWidth: '100%' }}>
          <TableBody
            data={data}
            columns={columns}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            isDark={isDark}
            headerStyle={headerStyle}
            isMobile={isMobile}
            renderMobileRow={renderMobileRow}
            renderRow={renderRow}
            keyExtractor={getItemKey}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export function DataTableRow({ children, onPress, style, index = 0, isDark: isDarkProp, ...props }) {
  const { isDark } = useDataTableTheme({ isDarkProp });
  const rowStyle = getRowStyle(index, isDark, style);

  if (onPress) {
    return (
      <AnimatedButton style={[rowStyle]} onPress={onPress} {...props}>
        {children}
      </AnimatedButton>
    );
  }

  return <View style={[rowStyle]} {...props}>{children}</View>;
}

export function DataTableCell({ children, style, flex, width, align, ...props }) {
  const cellStyle = getCellStyle({ flex, width, align, style });

  return <View style={[cellStyle]} {...props}>{children}</View>;
}

