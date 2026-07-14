/**
 * RevenueChart.js
 *
 * Renders a 14-day revenue line chart using inline SVG via dangerouslySetInnerHTML.
 * Works on Expo Web (react-native-web renders View as a div).
 */
import { Platform, Text, View } from 'react-native';
import styles from './AnalyticsStyles';

const CHART_W = 700;
const CHART_H = 130;
const PAD_X = 8;
const PAD_Y = 10;
const isWeb = Platform.OS === 'web';

function buildLinePath(points) {
  if (points.length === 0) return '';
  const [first, ...rest] = points;
  const moveTo = `M ${first.x} ${first.y}`;
  const lines = rest.map((p) => `L ${p.x} ${p.y}`).join(' ');
  return `${moveTo} ${lines}`;
}
function findMinMax(data) {
  let min = Infinity;
  let max = -Infinity;
  for (const d of data) {
    if (d.value < min) min = d.value;
    if (d.value > max) max = d.value;
  }
  return { min: min === Infinity ? 0 : min, max: max === -Infinity ? 1 : max };
}

export default function RevenueChart({ revenueData = [] }) {
  if (revenueData.length === 0) {
    return (
      <View style={{ height: 160, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#94a3b8' }}>No data</Text>
      </View>
    );
  }

  const { max } = findMinMax(revenueData);
  const chartHeight = 140;
  const chartWidth = 600;

  const points = revenueData.map((d, i) => {
    const x = (i / (revenueData.length - 1)) * chartWidth;
    const y = max === 0 ? chartHeight : chartHeight - (d.value / max) * chartHeight;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  const fillPathD = `${pathD} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

  return (
    <View style={styles.svgWrapper}>
      {isWeb ? (
        <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fillPathD} fill="url(#revenueGrad)" />
          <path d={pathD} fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: chartHeight, width: '100%' }}>
            {revenueData.map((d, i) => {
              const barHeight = max === 0 ? 4 : Math.max(4, (d.value / max) * chartHeight);
              return (
                <View key={`${d.label}-${i}`} style={{ flex: 1, marginLeft: i === 0 ? 0 : 4, alignItems: 'center' }}>
                  <View style={{ width: 8, height: barHeight, backgroundColor: '#10B981', borderRadius: 4 }} />
                </View>
              );
            })}
          </View>
        </View>
      )}
      <View style={styles.xLabels}>
        {revenueData.map((d, i) => {
          if (i === 0 || i === revenueData.length - 1 || i % Math.ceil(revenueData.length / 5) === 0) {
            return (
              <Text key={d.label + i} style={styles.xLabel}>
                {d.label}
              </Text>
            );
          }
          return null;
        })}
      </View>
    </View>
  );
}
