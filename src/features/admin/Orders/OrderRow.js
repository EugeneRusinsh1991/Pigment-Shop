/**
 * OrderRow.js
 */
import { Badge } from '@/components/ui/Badge';
import { AnimatedButton } from '@/components/ui/Button';
import { DataTableCell, DataTableRow } from '@/components/domain/DataTable/DataTable';
import { Text } from '@/components/ui/Text';
import { View, Platform, Text as RNText } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { formatDateShortWithTime } from '../../../utils/dateFormatting';
import { resolveStatusDef } from '../../../utils/orderStatus';
import { colors, layout } from '../../../theme/tokens';
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

function CommentIcon({ filled, color, size = 12 }) {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  return <RNText style={{ color, fontSize: size }}>💬</RNText>;
}

function NoteIcon({ filled, color, size = 12 }) {
  if (Platform.OS === 'web') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    );
  }
  return <RNText style={{ color, fontSize: size }}>📝</RNText>;
}

function NoteIndicator({ hasNote, label, type }) {
  const isCust = type === 'customer';
  const activeBg = isCust ? colors.infoBgMid : colors.warningBgMid;
  const activeColor = isCust ? colors.infoStrong : colors.warningDark;
  const activeBorder = isCust ? colors.infoLight : colors.warningMid;

  const inactiveBg = 'transparent';
  const inactiveColor = colors.secondaryDarkText || '#94a3b8';
  const inactiveBorder = colors.secondaryLightBorder || '#cbd5e1';

  const IconComp = isCust ? CommentIcon : NoteIcon;

  return (
    <View
      style={[
        styles.noteIndicatorPill,
        hasNote
          ? { backgroundColor: activeBg, borderColor: activeBorder }
          : { backgroundColor: inactiveBg, borderColor: inactiveBorder, opacity: 0.55 }
      ]}
    >
      <IconComp filled={hasNote} color={hasNote ? activeColor : inactiveColor} size={12} />
      <Text
        size={11}
        weight={hasNote ? '600' : '400'}
        style={{ color: hasNote ? activeColor : inactiveColor, marginLeft: 4 }}
      >
        {label}
      </Text>
    </View>
  );
}

export function MobileOrderRow({ order, onPress }) {
  const { t, lang } = useLanguage();
  const summary = getOrderSummary(order, t, lang);

  const hasCustNote = Boolean(order.note && order.note.trim());
  const hasAdminNote = Boolean((order.adminNote || order.adminNotes) && (order.adminNote || order.adminNotes).trim());

  return (
    <AnimatedButton style={[styles.row, styles.rowMobile, summary.rowBg]} onPress={onPress}>
      {/* Row 1: Order ID + Date + Status */}
      <View style={styles.rowTop}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: layout.spacing.xs }}>
          <Text style={styles.tdText} size={14} weight="bold">#{summary.orderNum}</Text>
          <Text style={[styles.tdText, styles.rowDate]} size={12}>{summary.formattedDate}</Text>
        </View>
        <StatusBadge statusKey={summary.statusKey} statusDisplay={summary.statusDisplay} />
      </View>

      {/* Row 2: Customer Name + Total Price */}
      <View style={styles.rowMiddleCompact}>
        <Text style={[styles.tdText, styles.customerName]} size={14} weight="bold" numberOfLines={1}>
          {order.customerName || t('adminUsersUnnamed')}
        </Text>
        <Text style={styles.priceValue} size={15} weight="700">
          ${summary.formattedTotal}
        </Text>
      </View>

      {/* Row 3: Indicators for Customer Note & Admin Note */}
      <View style={styles.noteIndicatorsRow}>
        <NoteIndicator
          hasNote={hasCustNote}
          label={t('adminOrdersCustNote') || 'Note'}
          type="customer"
        />
        <NoteIndicator
          hasNote={hasAdminNote}
          label={t('adminOrdersAdminNote') || 'Admin'}
          type="admin"
        />
      </View>
    </AnimatedButton>
  );
}

export function DesktopOrderRow({ order, onPress }) {
  const { t, lang } = useLanguage();
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

