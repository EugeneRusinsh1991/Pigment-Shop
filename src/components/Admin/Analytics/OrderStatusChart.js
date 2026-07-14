/**
 * OrderStatusChart.js
 *
 * Pie/donut chart for order status distribution using inline SVG.
 */
import { Platform, Text, View } from 'react-native';
import styles from './AnalyticsStyles';

const isWeb = Platform.OS === 'web';

function SvgDonut({ data, size = 120, strokeWidth = 16 }) {
  if (!isWeb) {
    const totalValue = data.reduce((sum, item) => sum + item.value, 0) || 1;
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
            <View key={idx} style={{ flex: item.value / totalValue, backgroundColor: item.color }} />
          ))}
        </View>
      </View>
    );
  }

  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      {data.map((item, idx) => {
        const percent = item.value / 100;
        const strokeDasharray = `${circumference * percent} ${circumference}`;
        const strokeDashoffset = -currentOffset;
        currentOffset += circumference * percent;

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

export default function OrderStatusChart({ statusData }) {
  const total = statusData.reduce((acc, curr) => acc + curr.value, 0);
  const data = total > 0 
    ? statusData.map((d) => ({ ...d, value: (d.value / total) * 100 }))
    : [{ label: 'Empty', value: 100, color: '#e2e8f0' }];

  return (
    <View style={styles.donutContainer}>
      <SvgDonut data={data} />
      <View style={{ marginTop: 20 }}>
        {statusData.map((s) => (
          <View key={s.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: s.color }]} />
            <Text style={styles.legendText}>{s.label}:</Text>
            <Text style={styles.legendValue}>{s.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
