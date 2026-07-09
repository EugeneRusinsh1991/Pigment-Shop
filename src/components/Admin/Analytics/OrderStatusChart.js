/**
 * OrderStatusChart.js
 *
 * Pie/donut chart for order status distribution using inline SVG.
 */
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { getOrderStatuses } from '../../../data/adminAnalytics';
import styles from './AnalyticsStyles';

const SIZE = 140;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 52;
const INNER_R = 30;

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function slicePath(cx, cy, r, innerR, startAngle, endAngle) {
  const outerStart = polarToCartesian(cx, cy, r, startAngle);
  const outerEnd = polarToCartesian(cx, cy, r, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}

function buildSlices(statuses) {
  const total = statuses.reduce((s, item) => s + item.value, 0);
  let angle = 0;
  return statuses.map((item) => {
    const sweep = (item.value / total) * 360;
    const path = slicePath(CX, CY, R, INNER_R, angle, angle + sweep);
    angle += sweep;
    return { ...item, path };
  });
}

export default function OrderStatusChart() {
  const statuses = useMemo(() => getOrderStatuses(), []);
  const slices = useMemo(() => buildSlices(statuses), [statuses]);

  const svgHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
      ${slices.map((s) => `<path d="${s.path}" fill="${s.color}" />`).join('')}
    </svg>
  `;

  return (
    <View>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ width: SIZE, height: SIZE, alignSelf: 'center', marginBottom: 16 }}
        dangerouslySetInnerHTML={{ __html: svgHtml }}
      />
      {statuses.map((s) => (
        <View key={s.label} style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: s.color }]} />
          <Text style={styles.legendText}>{s.label}</Text>
          <Text style={styles.legendValue}>{s.value}%</Text>
        </View>
      ))}
    </View>
  );
}
