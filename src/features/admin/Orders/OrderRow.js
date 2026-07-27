/**
 * OrderRow.js
 */
import { Badge } from '@/components/Badge';
import { AnimatedButton } from '@/components/Button';
import { DataTableCell, DataTableRow } from '@/components/DataTable/DataTable';
import { Text } from '@/components/Text';
import { View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { formatDateShortWithTime } from '../../../utils/dateFormatting';
import { resolveStatusDef } from '../../../utils/orderStatus';
import styles from './OrdersStyles';

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
        <Text style={styles.tdText} size={14} weight="bold">#{summary.orderNum}</Text>
        <Text style={[styles.tdText, styles.rowDate]} size={12}>{summary.formattedDate}</Text>
      </View>

      {/* Row 2: customer name */}
      <Text style={[styles.tdText, styles.customerName]} size={14} weight="bold" numberOfLines={1}>{order.customerName}</Text>

      {/* Row 3: contact | status | total */}
      <View style={styles.rowMiddle}>
        <View style={styles.metaBlock}>
          <Text variant="overline" color="desc" style={styles.metaLabel}>{t('adminOrdersCustomer')}</Text>
          <Text style={styles.metaValue} size={13} weight="600" numberOfLines={1}>{summary.contact || '—'}</Text>
        </View>
        <View style={styles.metaBlock}>
          <Text variant="overline" color="desc" style={styles.metaLabel}>{t('adminOrdersStatus')}</Text>
          <StatusBadge statusKey={summary.statusKey} statusDef={summary.statusDef} statusDisplay={summary.statusDisplay} />
        </View>
        <View style={styles.metaBlock}>
          <Text variant="overline" color="desc" style={styles.metaLabel}>{t('adminOrdersTotal')}</Text>
          <Text style={styles.metaValue} size={13} weight="600">${summary.formattedTotal}</Text>
        </View>
      </View>

      {/* Row 4: notes */}
      <View style={styles.rowBottom}>
        <View style={styles.noteBlock}>
          <Text variant="overline" color="desc" style={styles.metaLabel}>{t('adminOrdersCustNote')}</Text>
          <Text style={styles.metaValue} size={13} weight="600" numberOfLines={1}>{order.note || '—'}</Text>
        </View>
        <View style={styles.noteBlock}>
          <Text variant="overline" color="desc" style={styles.metaLabel}>{t('adminOrdersAdminNote')}</Text>
          <Text style={styles.metaValue} size={13} weight="600" numberOfLines={1}>{order.adminNote || '—'}</Text>
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
      <View style={styles.rowMain}>
        <DataTableCell style={[styles.colId, { flexDirection: 'row' }]}>
          <Text style={styles.tdText} size={14} weight="bold">#{summary.orderNum}</Text>
        </DataTableCell>
        <DataTableCell style={[styles.colCustomer, { flexDirection: 'row' }]}>
          <Text style={[styles.tdText, styles.customerName]} size={14} weight="bold" numberOfLines={1}>
            {order.customerName} {summary.contact ? `(${summary.contact})` : ''}
          </Text>
        </DataTableCell>
        <DataTableCell style={[styles.colDate, { flexDirection: 'row' }]}>
          <Text style={styles.tdText} size={14}>{summary.formattedDate}</Text>
        </DataTableCell>
        <DataTableCell style={[styles.colStatus, { flexDirection: 'row', justifyContent: 'center' }]}>
          <StatusBadge statusKey={summary.statusKey} statusDef={summary.statusDef} statusDisplay={summary.statusDisplay} />
        </DataTableCell>
        <DataTableCell style={[styles.colTotal, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
          <Text variant="body2" weight="bold" style={[styles.tdText, { textAlign: 'right' }]}>${summary.formattedTotal}</Text>
        </DataTableCell>
      </View>
      <View style={styles.rowNotes}>
        <View style={styles.noteItem}>
          <Text variant="overline" color="desc" style={styles.metaLabelInline}>{t('adminOrdersCustNote')}: </Text>
          <Text variant="body2" style={styles.metaValue} size={13} weight="600" numberOfLines={1}>{order.note || '—'}</Text>
        </View>
        <View style={styles.noteItem}>
          <Text variant="overline" color="desc" style={styles.metaLabelInline}>{t('adminOrdersAdminNote')}: </Text>
          <Text variant="body2" style={styles.metaValue} size={13} weight="600" numberOfLines={1}>{order.adminNote || '—'}</Text>
        </View>
      </View>
    </DataTableRow>
  );
}

