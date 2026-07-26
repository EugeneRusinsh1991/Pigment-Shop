/**
 * OrderStatusChart.js
 *
 * Donut chart for order status distribution using inline SVG.
 * statusData: array of { labelKey, value, color } — raw counts, always 4 items.
 */
import { Platform, View } from 'react-native';
import { Text } from '../../Text';
import { useTheme } from '../../../context/ThemeContext';
import styles from './AnalyticsStyles';

const isWeb = Platform.OS === 'web';

function SvgDonut({ data, size = 120, strokeWidth = 20 }) {
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;

  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  if (!isWeb) {
    return (
      <View style={{ width: size, alignItems: 'center' }}>
        <View
          style={{
            width: size,
            height: size / 3,
            borderRadius: size / 6,
            flexDirection: 'row',
            overflow: 'hidden',
            backgroundColor: '#F5F7FA',
          }}
        >
          {data.map((item, idx) => (
            <View key={idx} style={{ flex: item.value / total, backgroundColor: item.color }} />
          ))}
        </View>
      </View>
    );
  }

  let currentOffset = 0;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      {data.map((item, idx) => {
        const percent = item.value / total;
        const dashLen = circumference * percent;
        const strokeDasharray = `${dashLen} ${circumference}`;
        const strokeDashoffset = -currentOffset;
        currentOffset += dashLen;

        return (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r={radius}
            fill="transparent"
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
        );
      })}
    </svg>
  );
}

const STATUS_CONFIG = {
  pending: { labelKey: 'orderStatusPending', color: '#3B82F6' },
  processing: { labelKey: 'orderStatusProcessing', color: '#D97706' },
  completed: { labelKey: 'orderStatusCompleted', color: '#10B981' },
  cancelled: { labelKey: 'orderStatusCancelled', color: '#EF4444' },
};

export default function OrderStatusChart({ statusData = [] }) {
  const { t } = useTheme();

  const formattedData = statusData.map((item) => {
    const config = STATUS_CONFIG[item.id || item.status] || {
      labelKey: item.labelKey || 'orderStatusPending',
      color: item.color || '#3B82F6',
    };
    return {
      ...item,
      labelKey: config.labelKey,
      color: config.color,
    };
  });

  const hasData = formattedData.some((d) => d.value > 0);
  const displayData = hasData
    ? formattedData
    : [{ labelKey: null, value: 1, color: '#E2E8F0' }];

  return (
    <View style={styles.donutContainer}>
      <SvgDonut data={displayData} />
      <View style={{ marginTop: 20 }}>
        {formattedData.map((s, idx) => (
          <View key={s.id || s.labelKey || idx} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: s.color }]} />
            <Text variant="body2" color="secondary" style={styles.legendText}>{t(s.labelKey)}:</Text>
            <Text variant="subtitle2" style={styles.legendValue}>{s.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
