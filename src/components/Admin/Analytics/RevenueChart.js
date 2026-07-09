/**
 * RevenueChart.js
 *
 * Renders a 14-day revenue line chart using inline SVG via dangerouslySetInnerHTML.
 * Works on Expo Web (react-native-web renders View as a div).
 */
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { getRevenueChartData } from '../../../data/adminAnalytics';
import styles from './AnalyticsStyles';

const CHART_W = 700;
const CHART_H = 130;
const PAD_X = 8;
const PAD_Y = 10;

function buildLinePath(points) {
  if (points.length === 0) return '';
  const [first, ...rest] = points;
  const moveTo = `M ${first.x} ${first.y}`;
  const lines = rest.map((p) => `L ${p.x} ${p.y}`).join(' ');
  return `${moveTo} ${lines}`;
}

function buildAreaPath(points, chartH, padY) {
  if (points.length === 0) return '';
  const linePath = buildLinePath(points);
  const last = points[points.length - 1];
  const first = points[0];
  return `${linePath} L ${last.x} ${chartH - padY} L ${first.x} ${chartH - padY} Z`;
}

function computePoints(data) {
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const usableW = CHART_W - PAD_X * 2;
  const usableH = CHART_H - PAD_Y * 2;
  return data.map((d, i) => ({
    x: PAD_X + (i / (data.length - 1)) * usableW,
    y: PAD_Y + usableH - (d.value / maxVal) * usableH,
    label: d.label,
  }));
}

export default function RevenueChart() {
  const data = useMemo(() => getRevenueChartData(), []);
  const points = useMemo(() => computePoints(data), [data]);

  const linePath = buildLinePath(points);
  const areaPath = buildAreaPath(points, CHART_H, PAD_Y);

  const svgHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="${CHART_H}" viewBox="0 0 ${CHART_W} ${CHART_H}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E87A8E" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#E87A8E" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      <path d="${areaPath}" fill="url(#areaGrad)" />
      <path d="${linePath}" fill="none" stroke="#E87A8E" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
      ${points.map((p) => `<circle cx="${p.x}" cy="${p.y}" r="3" fill="#E87A8E"/>`).join('')}
    </svg>
  `;

  const xLabels = data.filter((_, i) => i % 2 === 0);

  return (
    <View>
      <View
        style={styles.svgWrapper}
        // eslint-disable-next-line react-native/no-inline-styles
        dangerouslySetInnerHTML={{ __html: svgHtml }}
      />
      <View style={styles.xLabels}>
        {xLabels.map((d) => (
          <Text key={d.label} style={styles.xLabel}>{d.label}</Text>
        ))}
      </View>
    </View>
  );
}
