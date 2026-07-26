/**
 * OrderRow.js
 */
import React from 'react';
import { View } from 'react-native';
import { Text } from '../../Text';
import { AnimatedButton } from '../../Button';
import { useTheme } from '../../../context/ThemeContext';
import { DataTableRow, DataTableCell } from '../../DataTable/DataTable';
import { Badge } from '../../Badge';
import styles from './OrdersStyles';
import { formatDateShortWithTime } from '../../../utils/dateFormatting';
import { resolveStatusDef } from '../../../utils/orderStatus';

function formatRowDate(createdAt, lang) {
  return formatDateShortWithTime(createdAt, lang);
}

function getOrderSummary(order, t, lang) {
  const def = resolveStatusDef(order.status);
  const contact = order.customerPhone || order.customerEmail || '';

  return {
    formattedDate: formatRowDate(order.createdAt, lang),
    orderNum: order.id.slice(-5).toUpperCase(),
    statusKey: def.key,
    rowBg: { backgroundColor: def.rowBg },
    statusDisplay: t(def.localeKey) || order.status,
    contact,
    formattedTotal: (order.totalPrice || 0).toLocaleString(),
  };
}

function StatusBadge({ statusKey, statusDisplay }) {
  return (
    <Badge variant="status" status={statusKey} label={statusDisplay} size="sm" />
  );
}

export function MobileOrderRow({ order, onPress }) {
  const { t, lang } = useTheme();
  const summary = getOrderSummary(order, t, lang);

  return (
    <AnimatedButton style={[styles.row, styles.rowMobile, summary.rowBg]} onPress={onPress}>
      {/* Row 1: order number + date */}
      <View style={styles.rowTop}>
        <Text style={[styles.tdText, { fontWeight: '700' }]}>#{summary.orderNum}</Text>
        <Text style={[styles.tdText, styles.rowDate]}>{summary.formattedDate}</Text>
      </View>

      {/* Row 2: customer name */}
      <Text style={[styles.tdText, styles.customerName]} numberOfLines={1}>{order.customerName}</Text>

      {/* Row 3: contact | status | total */}
      <View style={styles.rowMiddle}>
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>{t('adminOrdersCustomer')}</Text>
          <Text style={styles.metaValue} numberOfLines={1}>{summary.contact || '—'}</Text>
        </View>
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>{t('adminOrdersStatus')}</Text>
          <StatusBadge statusKey={summary.statusKey} statusDef={summary.statusDef} statusDisplay={summary.statusDisplay} />
        </View>
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>{t('adminOrdersTotal')}</Text>
          <Text style={styles.metaValue}>${summary.formattedTotal}</Text>
        </View>
      </View>

      {/* Row 4: notes */}
      <View style={styles.rowBottom}>
        <View style={styles.noteBlock}>
          <Text style={styles.metaLabel}>{t('adminOrdersCustNote')}</Text>
          <Text style={styles.metaValue} numberOfLines={1}>{order.note || '—'}</Text>
        </View>
        <View style={styles.noteBlock}>
          <Text style={styles.metaLabel}>{t('adminOrdersAdminNote')}</Text>
          <Text style={styles.metaValue} numberOfLines={1}>{order.adminNote || '—'}</Text>
        </View>
      </View>
    </AnimatedButton>
  );
}

export function DesktopOrderRow({ order, onPress }) {
  const { t, lang } = useTheme();
  const summary = getOrderSummary(order, t, lang);

  return (
    <DataTableRow style={[styles.row, summary.rowBg, { flexDirection: 'column', alignItems: 'stretch' }]} onPress={onPress}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <DataTableCell style={[styles.colId, { flexDirection: 'row' }]}>
          <Text style={[styles.tdText, { fontWeight: '700' }]}>#{summary.orderNum}</Text>
        </DataTableCell>
        <DataTableCell style={[styles.colCustomer, { flexDirection: 'row' }]}>
          <Text style={[styles.tdText, styles.customerName]} numberOfLines={1}>
            {order.customerName} {summary.contact ? `(${summary.contact})` : ''}
          </Text>
        </DataTableCell>
        <DataTableCell style={[styles.colDate, { flexDirection: 'row' }]}>
          <Text style={styles.tdText}>{summary.formattedDate}</Text>
        </DataTableCell>
        <DataTableCell style={[styles.colStatus, { flexDirection: 'row', justifyContent: 'center' }]}>
          <StatusBadge statusKey={summary.statusKey} statusDef={summary.statusDef} statusDisplay={summary.statusDisplay} />
        </DataTableCell>
        <DataTableCell style={[styles.colTotal, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
          <Text style={[styles.tdText, { fontWeight: '700', textAlign: 'right' }]}>${summary.formattedTotal}</Text>
        </DataTableCell>
      </View>
      <View style={{ flexDirection: 'row', gap: 24, marginTop: 4 }}>
        <View style={{ flexDirection: 'row', flex: 1, gap: 4 }}>
          <Text style={[styles.metaLabel, { marginBottom: 0 }]}>{t('adminOrdersCustNote')}: </Text>
          <Text style={[styles.metaValue, { fontWeight: 'normal', fontSize: 13 }]} numberOfLines={1}>{order.note || '—'}</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 1, gap: 4 }}>
          <Text style={[styles.metaLabel, { marginBottom: 0 }]}>{t('adminOrdersAdminNote')}: </Text>
          <Text style={[styles.metaValue, { fontWeight: 'normal', fontSize: 13 }]} numberOfLines={1}>{order.adminNote || '—'}</Text>
        </View>
      </View>
    </DataTableRow>
  );
}

